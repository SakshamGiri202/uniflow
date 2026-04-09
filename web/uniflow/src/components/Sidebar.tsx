import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-[260px] shrink-0 flex flex-col border-r border-white/5 bg-[#070A10] px-6 py-8 hidden lg:flex h-full">
      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-5 pl-3">
        The Electric Pulse
      </div>
      
      <nav className="flex flex-col gap-2 flex-1">
        <Link to="/dashboard" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors ${location.pathname === '/dashboard' ? 'bg-sky-950/40 text-sky-400' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
          <div className={location.pathname === '/dashboard' ? 'bg-sky-400/20 p-1 rounded' : 'p-1'}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </div>
          DASHBOARD
        </Link>
        <Link to="/marketplace" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors ${location.pathname === '/marketplace' ? 'bg-sky-950/40 text-sky-400' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
          <div className={location.pathname === '/marketplace' ? 'bg-sky-400/20 p-1 rounded' : 'p-1'}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          MARKETPLACE
        </Link>
        <Link to="/events" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors ${location.pathname === '/events' ? 'bg-sky-950/40 text-sky-400' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
          <div className={location.pathname === '/events' ? 'bg-sky-400/20 p-1 rounded' : 'p-1'}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          EVENTS
        </Link>
        <Link to="/coach" className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors ${location.pathname === '/coach' ? 'bg-sky-950/40 text-sky-400' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
          <div className={location.pathname === '/coach' ? 'bg-sky-400/20 p-1 rounded' : 'p-1'}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          COACH
        </Link>

        <div className="mt-8 border-t border-white/10 pt-8 mb-4">
          <button className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-sky-300 py-3 text-sm font-semibold text-slate-900 shadow-[0_0_15px_-3px_rgba(56,189,248,0.4)] hover:shadow-[0_0_20px_-3px_rgba(56,189,248,0.6)] transition-all">
            New Post
          </button>
        </div>
      </nav>

      <div className="flex flex-col gap-2 mt-auto border-t border-white/5 pt-4">
        <a href="#" className="flex items-center gap-3 rounded-lg text-white/50 hover:text-white hover:bg-white/5 px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors">
          <div className="p-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          SUPPORT
        </a>
        <a href="#" className="flex items-center gap-3 rounded-lg text-white/50 hover:text-white hover:bg-white/5 px-3 py-2.5 text-xs font-semibold tracking-wide transition-colors">
          <div className="p-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          LOGOUT
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
