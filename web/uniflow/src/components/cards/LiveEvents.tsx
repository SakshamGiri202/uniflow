import React from 'react';
import '../../styles/cards.css';

interface Event {
  id: number;
  title: string;
  location: string;
  address: string;
  tag: string;
  image: string;
}

const LiveEvents: React.FC = () => {
  const events: Event[] = [
    {
      id: 1,
      title: 'Web3 Connect: Bangalore',
      location: 'MG Road, Hub',
      address: 'MG Road, Hub',
      tag: 'HAPPENING',
      image: '🎵',
    },
    {
      id: 2,
      title: 'Electric Night Festival',
      location: 'Indiranagar Grounds',
      address: 'Indiranagar Grounds',
      tag: 'UPCOMING',
      image: '🎪',
    },
  ];

  return (
    <div className="card live-events-card">
      <div className="card-header">
        <h2>Live Events in Bangalore</h2>
        <a href="#" className="view-all">View All →</a>
      </div>
      <div className="events-container">
        {events.map((event) => (
          <div key={event.id} className="event-item">
            <div className="event-image">{event.image}</div>
            <div className="event-details">
              <h4>{event.title}</h4>
              <p className="event-location">📍 {event.location}</p>
              <span className={`event-tag tag-${event.tag.toLowerCase()}`}>{event.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveEvents;
