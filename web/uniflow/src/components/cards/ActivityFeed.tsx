import React from 'react';
import '../../styles/cards.css';

interface Activity {
  id: number;
  user: string;
  handle: string;
  action: string;
  description: string;
  avatar: string;
}

const ActivityFeed: React.FC = () => {
  const activities: Activity[] = [
    {
      id: 1,
      user: 'Ananya',
      handle: '@ananya_dev',
      action: 'tagged you in "Hackathon Recap"',
      description: '"Amazing work on the frontend architecture, Arnav!"',
      avatar: '🧑',
    },
  ];

  return (
    <div className="card activity-feed-card">
      <div className="activity-items">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <div className="activity-avatar">{activity.avatar}</div>
            <div className="activity-content">
              <p className="activity-text">
                <strong>{activity.user}</strong> {activity.action}
              </p>
              <p className="activity-quote">{activity.description}</p>
            </div>
            <div className="activity-actions">
              <button className="activity-btn reply">REPLY</button>
              <button className="activity-btn view-post">VIEW POST</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
