import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import NotificationsPanel from './NotificationsPanel';
import SettingsPanel from './SettingsPanel';
import ProfilePanel from './ProfilePanel';

export default function TopNavActions() {
  const [activePanel, setActivePanel] = useState<'notifications' | 'settings' | 'profile' | null>(null);
  const [hasUnread, setHasUnread] = useState(true);

  const closePanel = () => setActivePanel(null);

  const panels = (
    <>
      {activePanel === 'notifications' && <NotificationsPanel onClose={closePanel} />}
      {activePanel === 'settings' && <SettingsPanel onClose={closePanel} />}
      {activePanel === 'profile' && <ProfilePanel onClose={closePanel} />}
    </>
  );

  return (
    <div className="flex items-center gap-3">
      {/* Notifications */}
      <button
        id="nav-notifications-btn"
        onClick={() => {
          if (activePanel !== 'notifications') setHasUnread(false);
          setActivePanel(activePanel === 'notifications' ? null : 'notifications');
        }}
        className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/75 hover:bg-white/15 hover:text-white transition-colors group"
      >
        {/* Unread dot */}
        {hasUnread && (
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
        )}
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </button>

      {/* Settings */}
      <button
        id="nav-settings-btn"
        onClick={() => setActivePanel(activePanel === 'settings' ? null : 'settings')}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/75 hover:bg-white/15 hover:text-white transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Profile avatar */}
      <button
        id="nav-profile-btn"
        onClick={() => setActivePanel(activePanel === 'profile' ? null : 'profile')}
        className="h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-white/10 hover:border-sky-400 transition-colors ml-1"
      >
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
          alt="Avatar"
          className="h-full w-full object-cover"
        />
      </button>

      {/* Portals — rendered directly into document.body, escaping header stacking context */}
      {createPortal(panels, document.body)}
    </div>
  );
}
