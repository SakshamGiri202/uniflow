import React from 'react';
import '../../styles/cards.css';

interface Session {
  id: number;
  title: string;
  mentor: string;
  role: string;
  company: string;
  date: string;
  time: string;
  image: string;
}

const MentorshipSessions: React.FC = () => {
  const sessions: Session[] = [
    {
      id: 1,
      title: 'Product Management Mastery',
      mentor: 'Sarah Sen',
      role: 'Senior PM',
      company: 'Google',
      date: 'TODAY',
      time: '16:00 IST',
      image: '👩',
    },
    {
      id: 2,
      title: 'Advanced UI Patterns',
      mentor: 'Rohan Mahore',
      role: 'Design Lead',
      company: 'Google',
      date: 'OCT 24',
      time: '10:30 IST',
      image: '👨',
    },
  ];

  return (
    <div className="card mentorship-card">
      <div className="card-header">
        <div>
          <h2>My Mentorship Sessions</h2>
          <p className="card-subtitle">Accelerate your career with elite guides.</p>
        </div>
        <span className="upcoming-badge">3 UPCOMING</span>
      </div>
      <div className="sessions-container">
        {sessions.map((session) => (
          <div key={session.id} className="session-item">
            <div className="session-avatar">{session.image}</div>
            <div className="session-details">
              <h4>{session.title}</h4>
              <p className="session-mentor">
                with {session.mentor}, {session.role} at {session.company}
              </p>
              <div className="session-timing">
                <span className="session-date">{session.date}</span>
                <span className="session-time">{session.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="explore-btn">📚 Explore All Mentors</button>
    </div>
  );
};

export default MentorshipSessions;
