import React, { useState } from 'react';

const ICONS: Record<string, string> = {
  event: '📅',
  session: '🎓',
  market: '🛍️',
  system: '⚙️',
};

const initialNotifications = [
  { id: 1, title: "Hackathon 2.0 Tomorrow!", description: "Your registered event starts in 24 hours. Don't miss it!", time: "2m ago", type: "event", unread: true },
  { id: 2, title: "Session Booking Confirmed", description: "Your 1-on-1 mentorship with Priya S. is set for 4 PM.", time: "1h ago", type: "session", unread: true },
  { id: 3, title: "Registration Closing Soon", description: "Cyber Security Workshop closes in less than 24 hours.", time: "2h ago", type: "event", unread: false },
  { id: 4, title: "New Item in Wishlist", description: "iPad Air M1 matching your search was just posted.", time: "3h ago", type: "market", unread: false },
  { id: 5, title: "Document Reminder", description: "Submit your verification documents to unlock full access.", time: "1d ago", type: "system", unread: false },
];

export default function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        style={{ zIndex: 9998 }}
        onClick={onClose}
      />
      <div
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0A0D14] shadow-2xl border-l border-white/10 flex flex-col"
        style={{ zIndex: 9999 }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0D1119] px-6 py-5">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-black text-white">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-white/60 hover:bg-white/15 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`relative rounded-xl border p-4 cursor-pointer transition-colors group ${
                n.unread ? 'border-sky-500/20 bg-sky-500/5 hover:bg-sky-500/10' : 'border-white/5 bg-[#12161E] hover:border-white/15'
              }`}
            >
              {n.unread && (
                <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
              )}
              <div className="flex gap-3">
                <span className="text-xl shrink-0 mt-0.5">{ICONS[n.type]}</span>
                <div>
                  <h4 className={`text-sm font-bold ${n.unread ? 'text-white' : 'text-white/80'}`}>{n.title}</h4>
                  <p className="mt-1 text-xs text-white/55 leading-relaxed">{n.description}</p>
                  <p className="mt-2 text-[10px] text-white/35">{n.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="w-full rounded-xl bg-white/5 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </>
  );
}
