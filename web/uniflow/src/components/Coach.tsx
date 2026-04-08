import React, { useState } from 'react';
import Sidebar from './Sidebar';

interface SessionCardProps {
  id: string;
  mentorName: string;
  mentorTitle: string;
  topic: string;
  date: string;
  time: string;
  imageUrl: string;
  status: 'upcoming' | 'completed' | 'canceled';
}

const SessionCard = ({ mentorName, mentorTitle, topic, date, time, imageUrl, status }: SessionCardProps) => {
  return (
    <div className="bg-[#1A1E36]/50 p-5 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-5 items-start md:items-center hover:bg-white/5 transition-all">
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
        <img src={imageUrl} alt={mentorName} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">{topic}</h3>
        <p className="text-sm text-white/50">{mentorName}, {mentorTitle}</p>
        <div className="flex items-center gap-3 mt-3 text-xs text-white/40">
          <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> {date}</span>
          <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> {time}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end">
        {status === 'upcoming' && <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-semibold uppercase tracking-wider">Upcoming</span>}
        {status === 'completed' && <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold uppercase tracking-wider">Completed</span>}
        {status === 'upcoming' && (
          <button className="mt-2 px-6 py-2 bg-white text-black font-semibold rounded-xl text-sm hover:bg-gray-200 transition-colors">
            Join Call
          </button>
        )}
      </div>
    </div>
  );
};

interface CoachProps {
  onNavigate: (page: string) => void;
}

const Coach = ({ onNavigate }: CoachProps) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const sessions: SessionCardProps[] = [
    {
      id: '1',
      mentorName: 'Sarah Sen',
      mentorTitle: 'Senior PM at Google',
      topic: 'Product Management Mastery',
      date: 'Today',
      time: '18:00 IST',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      status: 'upcoming'
    },
    {
      id: '2',
      mentorName: 'Rohan Malhotra',
      mentorTitle: 'Design Lead',
      topic: 'Advanced UI Patterns',
      date: 'Oct 24',
      time: '10:30 IST',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      status: 'upcoming'
    },
    {
      id: '3',
      mentorName: 'Priya Patel',
      mentorTitle: 'Software Engineer',
      topic: 'React Performance Tuning',
      date: 'Oct 15',
      time: '14:00 IST',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      status: 'completed'
    }
  ];

  return (
    <div className="flex h-screen bg-[#0B0E17] text-white font-sans overflow-hidden">
      <Sidebar activePage="coach" onNavigate={onNavigate} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          <header className="mb-12 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-bold italic tracking-tight mb-2">Peer Coaching</h1>
              <p className="text-white/50">Manage your mentorship sessions and accelerate your growth.</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Book a Mentor
            </button>
          </header>

          <div className="flex gap-4 mb-8 border-b border-white/10 pb-1">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 font-medium text-sm transition-colors relative ${activeTab === 'upcoming' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
            >
              Upcoming
              {activeTab === 'upcoming' && <div className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-orange-400 rounded-t-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 font-medium text-sm transition-colors relative ${activeTab === 'past' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
            >
              Past Sessions
              {activeTab === 'past' && <div className="absolute bottom-[-5px] left-0 right-0 h-0.5 bg-orange-400 rounded-t-full"></div>}
            </button>
          </div>

          <div className="space-y-4">
            {sessions
              .filter(s => activeTab === 'upcoming' ? s.status === 'upcoming' : s.status !== 'upcoming')
              .map(session => (
                <SessionCard key={session.id} {...session} />
              ))}
            {sessions.filter(s => activeTab === 'upcoming' ? s.status === 'upcoming' : s.status !== 'upcoming').length === 0 && (
              <div className="text-center py-12 text-white/40">
                No sessions found.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Coach;
