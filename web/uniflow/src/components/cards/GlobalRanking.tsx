import React from 'react';

const GlobalRanking: React.FC = () => {
  return (
    <div className="bg-[#12162B] border border-white/5 rounded-2xl p-6 backdrop-blur h-full relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-[50px] rounded-full -translate-y-10 translate-x-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full translate-y-10 -translate-x-10 pointer-events-none" />

      <div className="flex flex-col gap-3 relative z-10">
        <div className="text-2xl">🌍</div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Global Ranking</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-extrabold text-white">#42</span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-gradient-to-br from-sky-400 to-purple-500 text-slate-950 uppercase tracking-tight">
            TOP 1%
          </span>
        </div>
        <p className="text-xs text-white/60 leading-relaxed">
          You've outperformed 2,400 students in the Bangalore Tech Hub this month. Keep it up!
        </p>
      </div>
    </div>
  );
};

export default GlobalRanking;
