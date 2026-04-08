import React from 'react';

const LiveEvents: React.FC = () => {
  return (
    <div className="bg-[#12162B] border border-white/5 rounded-2xl p-6 relative overflow-hidden backdrop-blur h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold italic text-white tracking-tight">Live Events in Bangalore</h2>
        <a href="#" className="text-sm font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors">
          View All
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Event 1 */}
        <div className="bg-[#1A1E36] rounded-xl overflow-hidden border border-white/5 group cursor-pointer hover:border-white/10 transition-colors">
          <div className="h-32 w-full relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80" 
              alt="Web3 Connect" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute top-2 left-2 bg-[#FF5F58] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Live Now
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-white font-semibold mb-1">Web3 Connect: Bengaluru</h3>
            <div className="flex items-center gap-1 text-white/40 text-xs">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              MG Road, Hub
            </div>
          </div>
        </div>

        {/* Event 2 */}
        <div className="bg-[#1A1E36] rounded-xl overflow-hidden border border-white/5 group cursor-pointer hover:border-white/10 transition-colors">
          <div className="h-32 w-full relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&q=80" 
              alt="Electric Night Festival" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
            <div className="absolute top-2 left-2 bg-fuchsia-400 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
              Social
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-white font-semibold mb-1">Electric Night Festival</h3>
            <div className="flex items-center gap-1 text-white/40 text-xs">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Indiranagar Grounds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveEvents;
