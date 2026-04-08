import { useState } from 'react';

interface Props {
  onClose: () => void;
}

export default function CreateEventModal({ onClose }: Props) {
  const [eventType, setEventType] = useState<'Offline' | 'Online'>('Offline');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-[#0F131A] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col max-h-[90vh]">
        
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0A0D14] px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Post an Event</h2>
            <p className="text-[11px] text-white/50 mt-1 uppercase tracking-widest font-bold">Organizer Details & Registration</p>
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
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert("Event posted successfully!"); onClose(); }}>
            
            {/* Organizer Info */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-sky-400 uppercase tracking-widest border-b border-white/5 pb-2">Location & Organizer</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">College / Institution Name</label>
                  <input required placeholder="e.g. MIT, Stanford, IIT Delhi..." className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 hover:bg-[#1A2029] transition-colors" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">City & State</label>
                  <input required placeholder="e.g. Boston, MA" className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 hover:bg-[#1A2029] transition-colors" />
                </div>
              </div>
            </section>

            {/* Event Details */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest border-b border-white/5 pb-2">Event Details</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-white/80">Event Name</label>
                  <input required placeholder="e.g. Annual Tech Symposium 2024" className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50 hover:bg-[#1A2029] transition-colors" />
                </div>
                
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Platform / Mode</label>
                  <div className="flex rounded-xl bg-[#161B22] p-1 border border-white/10">
                    <button type="button" onClick={() => setEventType('Offline')} className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${eventType === 'Offline' ? 'bg-fuchsia-500/20 text-fuchsia-300 shadow-[0_2px_10px_rgba(217,70,239,0.1)]' : 'text-white/50 hover:text-white/80'}`}>Offline</button>
                    <button type="button" onClick={() => setEventType('Online')} className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all ${eventType === 'Online' ? 'bg-fuchsia-500/20 text-fuchsia-300 shadow-[0_2px_10px_rgba(217,70,239,0.1)]' : 'text-white/50 hover:text-white/80'}`}>Online</button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Date of Event</label>
                  <input required type="date" className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50 hover:bg-[#1A2029] transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Last Day for Registration</label>
                  <input required type="date" className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-fuchsia-400 focus:outline-none focus:ring-1 focus:ring-fuchsia-400/50 hover:bg-[#1A2029] transition-colors appearance-none [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 [&::-webkit-calendar-picker-indicator]:hover:opacity-100" />
                </div>
              </div>
            </section>

            {/* Event Head & Contact */}
            <section className="space-y-4">
              <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest border-b border-white/5 pb-2">Contact & Media</h3>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Event Head Name</label>
                  <input required placeholder="First & Last Name" className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/50 hover:bg-[#1A2029] transition-colors" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">Contact Number</label>
                  <input required type="tel" placeholder="+91 98765 43210" className="w-full rounded-xl border border-white/10 bg-[#161B22] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-orange-400 focus:outline-none focus:ring-1 focus:ring-orange-400/50 hover:bg-[#1A2029] transition-colors" />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-white/80">Event Poster / Picture</label>
                  <div className="mt-1 flex justify-center rounded-xl border-2 border-dashed border-white/20 bg-[#161B22] px-6 py-8 hover:border-orange-400/50 hover:bg-[#1A2029] transition-all group">
                    <div className="text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform">
                        <svg className="h-7 w-7 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                      </div>
                      <div className="flex text-sm text-white/60 justify-center font-medium">
                        <label className="relative cursor-pointer rounded-md text-orange-400 focus-within:outline-none hover:text-orange-300 transition-colors">
                          <span>Upload a file</span>
                          <input type="file" className="sr-only" accept="image/*" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-white/40 mt-2">PNG, JPG, GIF up to 5MB</p>
                    </div>
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
                className="rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-2.5 text-sm font-bold text-white shadow-[0_5px_20px_rgba(217,70,239,0.3)] hover:shadow-[0_5px_25px_rgba(217,70,239,0.5)] hover:scale-105 transition-all"
              >
                Post Event
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
