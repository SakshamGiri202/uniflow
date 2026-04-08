import { useState } from 'react';

interface Props {
  onClose: () => void;
}

const CATEGORIES = [
  'Study Materials',
  'Gadgets',
  'Electric Appliances',
  'Furnitures',
  'Essentials',
  'Culinary',
  'Others'
];

export default function CreateListingModal({ onClose }: Props) {
  const [condition, setCondition] = useState<'New' | 'Used - Good' | 'Used - Fair'>('Used - Good');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-[#0F131A] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col max-h-[90vh]">
        
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0A0D14] px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Sell an Item</h2>
            <p className="text-[11px] text-white/50 mt-1 uppercase tracking-widest font-bold">Marketplace Listing Details</p>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-white/60 hover:bg-white/20 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Listing posted successfully!"); onClose(); }}>
            
            {/* Seller Info */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-widest border-b border-white/5 pb-2">Seller Information</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Name of Seller</label>
                  <input required placeholder="Full Name" className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 hover:bg-[#1A2029] transition-colors" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">City / Campus</label>
                  <input required placeholder="e.g. Bangalore" className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 hover:bg-[#1A2029] transition-colors" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Contact Info (Phone/Email)</label>
                  <input required placeholder="Mobile Number or Email" className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 hover:bg-[#1A2029] transition-colors" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Date of Posting</label>
                  <input required type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 appearance-none [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 hover:bg-[#1A2029] transition-colors" />
                </div>
              </div>
            </section>

            {/* Product Details */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest border-b border-white/5 pb-2">Product Details</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-white/80">Product Name</label>
                  <input required placeholder="e.g. iPad Air M1, Engineering Graphics Kit..." className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50 hover:bg-[#1A2029] transition-colors" />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Product Category</label>
                  <select required defaultValue="" className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50 hover:bg-[#1A2029] transition-colors appearance-none cursor-pointer">
                    <option value="" disabled>Select Category</option>
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Price (₹)</label>
                  <input required type="number" min="0" placeholder="e.g. 500" className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50 hover:bg-[#1A2029] transition-colors" />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-white/80">Product Condition</label>
                  <div className="flex rounded-xl bg-[#161B22] p-1 border border-white/10">
                    <button type="button" onClick={() => setCondition('New')} className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${condition === 'New' ? 'bg-fuchsia-500/20 text-fuchsia-300 shadow-[0_2px_10px_rgba(217,70,239,0.1)]' : 'text-white/50 hover:text-white/80'}`}>Brand New</button>
                    <button type="button" onClick={() => setCondition('Used - Good')} className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${condition === 'Used - Good' ? 'bg-fuchsia-500/20 text-fuchsia-300 shadow-[0_2px_10px_rgba(217,70,239,0.1)]' : 'text-white/50 hover:text-white/80'}`}>Used (Good)</button>
                    <button type="button" onClick={() => setCondition('Used - Fair')} className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${condition === 'Used - Fair' ? 'bg-fuchsia-500/20 text-fuchsia-300 shadow-[0_2px_10px_rgba(217,70,239,0.1)]' : 'text-white/50 hover:text-white/80'}`}>Used (Fair)</button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-white/80">Description</label>
                  <textarea required rows={3} placeholder="Briefly describe the item, its age, and why you're selling..." className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50 hover:bg-[#1A2029] transition-colors resize-none"></textarea>
                </div>

              </div>
            </section>

            {/* Product Image */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest border-b border-white/5 pb-2">Media</h3>
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/80">Product Photos</label>
                <div className="mt-1 flex justify-center rounded-xl border-2 border-dashed border-white/20 bg-[#161B22] px-6 py-8 hover:border-orange-400/50 hover:bg-[#1A2029] transition-all group cursor-pointer">
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform">
                      <svg className="h-7 w-7 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2-2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex text-sm text-white/60 justify-center font-medium">
                      <label className="relative cursor-pointer rounded-md text-orange-400 focus-within:outline-none hover:text-orange-300 transition-colors">
                        <span>Upload photos</span>
                        <input type="file" multiple className="sr-only" accept="image/*" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-white/40 mt-2">Clear pictures help items sell 3x faster!</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="border-t border-white/10 pt-6 flex justify-end gap-3 sticky bottom-0 bg-[#0F131A] py-2">
              <button 
                type="button" 
                onClick={onClose} 
                className="rounded-xl px-5 py-2.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 px-8 py-2.5 text-sm font-bold text-white shadow-[0_5px_20px_rgba(56,189,248,0.3)] hover:shadow-[0_5px_25px_rgba(56,189,248,0.5)] hover:scale-105 transition-all"
              >
                Post Listing
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
