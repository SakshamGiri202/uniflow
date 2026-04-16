import React from 'react';

type ProductDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    description: string;
    price: string;
    seller: string;
    imageSrc?: string;
    badge?: string;
  } | null;
  onChat: (sellerName: string) => void;
};

export default function ProductDetailsModal({ isOpen, onClose, product, onChat }: ProductDetailsProps) {
  if (!isOpen || !product) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-[#04060A]/80 backdrop-blur-sm z-[9998] animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-2xl px-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0A0D14]/90 backdrop-blur-2xl shadow-[0_30px_80px_-15px_rgba(56,189,248,0.25)] ring-1 ring-white/5 flex flex-col md:flex-row">
          
          {/* Image Section */}
          <div className="relative h-64 md:h-auto md:w-2/5 bg-gradient-to-br from-white/5 to-white/10 shrink-0">
            {product.imageSrc ? (
              <img src={product.imageSrc} alt={product.title} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/20">
                <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            {product.badge && (
              <div className="absolute top-4 left-4 rounded-full bg-violet-500/90 backdrop-blur-md px-3 py-1 shadow-lg border border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-white">{product.badge}</span>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="relative p-6 md:p-8 flex-1 flex flex-col justify-between">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-2.5 text-white/40 hover:bg-white/10 hover:text-white transition-all duration-300 z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div>
              <div className="inline-block rounded-lg bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 mb-4">
                <h4 className="text-xl font-black text-sky-400 font-mono tracking-tight">{product.price}</h4>
              </div>
              <h2 className="text-2xl font-bold text-white leading-tight mb-3">{product.title}</h2>
              <p className="text-sm text-white/60 leading-relaxed mb-6">{product.description}</p>
              
              <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4 mb-8">
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">Seller Info</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center font-bold text-white text-sm shadow-inner">
                    {product.seller.split('·')[0].trim().slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-white/90">{product.seller.split('·')[0].trim()}</h5>
                    <p className="text-xs text-white/50">{product.seller.includes('·') ? product.seller.split('·').slice(1).join('·').trim() : 'Verified User'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-auto">
              <button
                onClick={() => {
                  onClose();
                  onChat(product.seller.split('·')[0].trim());
                }}
                className="flex-[2] rounded-xl bg-white/[0.05] border border-white/10 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-white/[0.08] hover:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with Seller
              </button>
              <button
                onClick={() => alert('Purchase flow would start here.')}
                className="flex-[3] rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] hover:scale-[1.02] transition-all"
              >
                Buy Now
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
