import React from 'react';
import '../styles/dashboard.css';
import Sidebar from './Sidebar';
import GlobalRanking from './cards/GlobalRanking';
import LiveEvents from './cards/LiveEvents';
import MentorshipSessions from './cards/MentorshipSessions';
import TrendingMarketplace from './cards/TrendingMarketplace';
import ActivityFeed from './cards/ActivityFeed';

const Dashboard: React.FC = () => {
  const userName = 'Arnav';

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Welcome back, {userName}.</h1>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-grid">
            {/* Left Column */}
            <div className="dashboard-left">
              <GlobalRanking />
              <MentorshipSessions />
            </div>

            {/* Right Column */}
            <div className="dashboard-right">
              <LiveEvents />
              <TrendingMarketplace />
            </div>
          </div>

          {/* Full Width Activity Feed */}
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
