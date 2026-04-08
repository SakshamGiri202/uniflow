import React from 'react';

const MentorshipSessions: React.FC = () => {
  return (
    <div className="bg-[#12162B] border border-white/5 rounded-2xl p-6 relative overflow-hidden backdrop-blur h-full flex flex-col justify-between">
      {/* Decorative vertical gradient bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-300 via-orange-400 to-transparent"></div>

      <div className="pl-2">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold italic text-white tracking-tight leading-tight">My Mentorship Sessions</h2>
            <p className="text-xs text-white/50 mt-1">Accelerate your career with elite guides.</p>
          </div>
          <div className="bg-white/5 rounded-full px-3 py-1 text-[10px] font-bold text-orange-400 tracking-wider uppercase border border-white/5 border-b-0">
            3 Upcoming
          </div>
        </div>

        <div className="space-y-4">
          {/* Session 1 */}
          <div className="flex items-center gap-4 bg-[#1A1E36]/50 p-3 rounded-xl border border-white/5">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Sarah Sen" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">Product Management Mastery</h3>
              <p className="text-xs text-white/40 mt-0.5">with Sarah Sen, Senior PM at Google</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-orange-400 uppercase">Today</div>
              <div className="text-xs text-white/50 mt-0.5">18:00 IST</div>
            </div>
          </div>

          {/* Session 2 */}
          <div className="flex items-center gap-4 p-3 rounded-xl border border-transparent hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Rohan Malhotra" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">Advanced UI Patterns</h3>
              <p className="text-xs text-white/40 mt-0.5">with Rohan Malhotra, Design Lead</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-white uppercase">Oct 24</div>
              <div className="text-xs text-white/50 mt-0.5">10:30 IST</div>
            </div>
          </div>
        </div>
      </div>

      <button className="w-full mt-6 py-3 bg-[#1A1E36] hover:bg-white/10 border border-white/5 hover:border-white/10 text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all">
        <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Explore All Mentors
      </button>
    </div>
  );
};

export default MentorshipSessions;
