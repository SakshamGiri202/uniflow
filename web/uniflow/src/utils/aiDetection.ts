import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { parse as parseExif } from 'exifr';

export interface AIDetectionResult {
  isSuspicious: boolean;
  score: number;
  flags: string[];
  metadata: {
    hasExif: boolean;
    isEdited: boolean;
    softwareUsed?: string;
    creationDate?: string;
    modifications: string[];
    hasICCProfile: boolean;
    resolution: { width: number; height: number };
  };
}

export const analyzeMetadata = async (file: File): Promise<AIDetectionResult['metadata']> => {
  try {
    const exifData = await parseExif(file, { icc: true });
    const modifications: string[] = [];
    let isEdited = false;
    let hasICCProfile = !!exifData?.icc;
    
    if (!exifData) {
      const isImage = file.type.startsWith('image/');
      return {
        hasExif: false,
        isEdited: isImage, 
        modifications: isImage ? ['Metadata stripped (High Suspicion)'] : ['No metadata'],
        hasICCProfile: false,
        resolution: { width: 0, height: 0 }
      };
    }

    const width = exifData.ExifImageWidth || 0;
    const height = exifData.ExifImageHeight || 0;
    if (width > 4500 || height > 4500) {
      modifications.push(`Resolution anomaly: ${width}x${height}`);
      isEdited = true;
    }

    const editingSoftware = ['Adobe Photoshop', 'GIMP', 'Canva', 'Pixlr', 'PhotoPea', 'Figma'];
    const software = exifData.Software || exifData.CreatorTool || '';
    const softwareStr = String(software).toLowerCase();
    
    if (editingSoftware.some(app => softwareStr.includes(app.toLowerCase()))) {
      isEdited = true;
      modifications.push(`Software Trace: ${software}`);
    }

    return {
      hasExif: true,
      isEdited,
      softwareUsed: software,
      creationDate: exifData.CreateDate,
      modifications,
      hasICCProfile,
      resolution: { width, height }
    };
  } catch (error) {
    return {
      hasExif: false,
      isEdited: true,
      modifications: ['Failed to read metadata'],
      hasICCProfile: false,
      resolution: { width: 0, height: 0 }
    };
  }
};

export const performELA = async (file: File): Promise<{ manipulationDetected: boolean; confidence: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    img.onload = () => {
      canvas.width = img.width; canvas.height = img.height;
      if (!ctx) return resolve({ manipulationDetected: false, confidence: 0 });
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let anomalyCount = 0;
      for (let i = 0; i < data.length; i += 40) {
        if (Math.abs(data[i] - data[i+1]) > 100) anomalyCount++;
      }
      const ratio = anomalyCount / (data.length / 40);
      resolve({ manipulationDetected: ratio > 0.1, confidence: Math.round(ratio * 1000) });
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });
};

export const detectAIManipulation = async (file: File, extractedText: string): Promise<AIDetectionResult> => {
  const flags: string[] = [];
  let score = 0;
  try {
    const metadata = await analyzeMetadata(file);
    if (file.type === 'image/png') { score += 10; flags.push('PNG format (Higher risk)'); }
    if (!metadata.hasExif && file.type.startsWith('image/')) { score += 20; flags.push('Metadata stripped'); }
    if (metadata.isEdited) { score += 25; flags.push(...metadata.modifications); }

    if (file.type.startsWith('image/')) {
      const ela = await performELA(file);
      if (ela.manipulationDetected) { score += 30; flags.push('Compression anomaly detected'); }
    }

    return {
      isSuspicious: score >= 30,
      score: Math.min(score, 100),
      flags,
      metadata
    };
  } catch (error) {
    return {
      isSuspicious: true, score: 100, flags: ['Detection Failure'],
      metadata: { hasExif: false, isEdited: true, modifications: [], hasICCProfile: false, resolution: { width: 0, height: 0 } }
    };
  }
};
