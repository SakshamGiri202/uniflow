export interface CertificateRecord {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export const mockCertificates: CertificateRecord[] = [
  {
    id: "CERT001",
    name: "cow D",
    issuer: "HackerRank",
    date: "06 Apr, 2026"
  },
  {
    id: "CERT002",
    name: "Harshita Baskar",
    issuer: "Coursera",
    date: "12 Mar, 2026"
  },
  {
    id: "UNIFLOW-99",
    name: "Saksham Giri",
    issuer: "UniFlow Academy",
    date: "20 Jan, 2026"
  }
];

export const findCertificateById = (id: string) => {
  return mockCertificates.find(c => c.id.toLowerCase() === id.toLowerCase());
};

export const findCertificateByText = (text: string) => {
  const lowercaseText = text.toLowerCase();
  return mockCertificates.find(c => 
    lowercaseText.includes(c.id.toLowerCase()) || 
    lowercaseText.includes(c.name.toLowerCase())
  );
};
