import React from 'react';
import Sidebar from './Sidebar';
import GlobalRanking from './cards/GlobalRanking';
import LiveEvents from './cards/LiveEvents';
import MentorshipSessions from './cards/MentorshipSessions';
import TrendingMarketplace from './cards/TrendingMarketplace';
import ActivityFeed from './cards/ActivityFeed';

interface Props {
  onNavigate?: (page: string) => void;
}

const Dashboard: React.FC<Props> = ({ onNavigate }) => {
  const userName = 'Arnav';

  return (
    <div className="min-h-screen bg-[#070A10] text-white flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="flex h-16 items-center justify-between border-b border-white/5 bg-[#070A10] px-6">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-wide italic text-white/90">UniFlow</span>
          </div>
        </div>

        <div className="flex items-center gap-5 text-white/50">
          <button className="hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <div className="h-8 w-8 rounded-full overflow-hidden border border-white/10 ml-2">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Profile" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar onNavigate={onNavigate} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="mb-8">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400 mb-2">
                VERIFIED STUDENT ACCOUNT
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white m-0">Welcome back, {userName}.</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
              {/* Left Column */}
              <div className="flex flex-col gap-6">
                <GlobalRanking />
                <MentorshipSessions />
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6">
                <LiveEvents />
                <TrendingMarketplace />
              </div>
            </div>

            {/* Full Width Activity Feed */}
            <div className="mt-2">
              <ActivityFeed />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
