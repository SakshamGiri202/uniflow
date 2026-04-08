import React from 'react';

const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-sky-950/40 via-[#1A1E36]/80 to-fuchsia-950/20 border border-white/5 rounded-2xl p-4 sm:p-6 backdrop-blur flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden border-2 border-white/10 shrink-0 bg-gradient-to-br from-sky-400 to-indigo-500 p-[2px]">
          <div className="w-full h-full rounded-full overflow-hidden">
             <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="Ananya" className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white/90">Ananya tagged you in "Hackathon Recap"</h3>
          <p className="text-xs text-white/50 mt-0.5 italic">"Amazing work on the frontend architecture, Arnav!"</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
        <button className="px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-bold text-white/70 hover:text-white uppercase tracking-wider bg-white/5 hover:bg-white/10 border border-white/5 transition-colors">
          Reply
        </button>
        <button className="px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider bg-sky-300 hover:bg-sky-200 transition-colors shadow-[0_0_15px_-3px_rgba(125,211,252,0.4)]">
          View Post
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;
