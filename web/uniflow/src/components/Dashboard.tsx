import React from 'react';
import Sidebar from './Sidebar';
import GlobalRanking from './cards/GlobalRanking';
import LiveEvents from './cards/LiveEvents';
import MentorshipSessions from './cards/MentorshipSessions';
import TrendingMarketplace from './cards/TrendingMarketplace';
import ActivityFeed from './cards/ActivityFeed';
import TopNavActions from './TopNavActions';

const Dashboard: React.FC = () => {
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

        <TopNavActions />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

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
