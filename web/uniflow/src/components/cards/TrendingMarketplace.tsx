import React from 'react';

const TrendingMarketplace: React.FC = () => {
  return (
    <div className="bg-[#12162B] border border-white/5 rounded-2xl p-6 relative overflow-hidden backdrop-blur h-full flex flex-col justify-between">
      <div className="mb-6">
        <h2 className="text-2xl font-bold italic text-white tracking-tight leading-tight">Trending in Marketplace</h2>
        <p className="text-xs text-white/50 mt-1">Curated tools for the modern builder.</p>
      </div>

      <div className="grid grid-cols-2 grid-rows-[auto_auto] gap-3">
        {/* Item 1 */}
        <div className="bg-[#1A1E36] rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
          <div className="bg-white/5 rounded-lg h-24 mb-3 flex items-center justify-center p-2">
            <img src="https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80" alt="Keyboard" className="max-h-full object-contain group-hover:scale-105 transition-transform" />
          </div>
          <h3 className="text-xs font-semibold text-white/90 truncate">Custom...</h3>
          <div className="text-[15px] font-bold text-fuchsia-400 mt-1">₹14,999</div>
        </div>

        {/* Item 2 */}
        <div className="bg-[#1A1E36] rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
          <div className="bg-white/5 rounded-lg h-24 mb-3 flex items-center justify-center p-2">
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80" alt="Laptop" className="max-h-full object-contain group-hover:scale-105 transition-transform" />
          </div>
          <h3 className="text-xs font-semibold text-white/90 truncate">Pro Designer...</h3>
          <div className="text-[15px] font-bold text-sky-400 mt-1">₹42,500</div>
        </div>

        {/* Item 3 (Full width) */}
        <div className="col-span-2 bg-[#1A1E36] rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group flex items-center gap-4 relative">
          <div className="bg-white/5 rounded-lg w-20 h-20 shrink-0 flex items-center justify-center p-1">
            <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80" alt="Lens Kit" className="max-h-full object-contain group-hover:scale-105 transition-transform" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-white/90">Vintage Cinema Lens Kit</h3>
            <div className="text-[10px] text-white/40 mt-0.5">Limited Edition • 4 items</div>
            <div className="text-lg font-bold text-orange-400 mt-1">₹85,000</div>
          </div>
          <button className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-colors absolute right-4 bottom-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating purple button */}
      <button className="absolute -right-2 top-1/2 -translate-y-1/2 md:translate-y-0 md:top-auto md:bottom-20 md:-right-4 bg-gradient-to-br from-indigo-400 to-fuchsia-400 w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_0_20px_-5px_rgba(192,132,252,0.6)] hover:scale-105 transition-transform z-10 border border-white/20">
        <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 3L4 14h7v7l9-11h-7V3z" />
        </svg>
      </button>
    </div>
  );
};

export default TrendingMarketplace;
