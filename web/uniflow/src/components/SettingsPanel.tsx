import React, { useState } from 'react';

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${checked ? 'bg-sky-400' : 'bg-white/20'}`}
    >
      <span className={`block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

export default function SettingsPanel({ onClose }: { onClose: () => void }) {
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [eventReminders, setEventReminders] = useState(true);
  const [marketAlerts, setMarketAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);

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
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-white/60 hover:bg-white/15 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          {/* Notifications */}
          <section>
            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-sky-400">Notifications</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Push Notifications</p>
                  <p className="text-xs text-white/45 mt-0.5">In-app alerts</p>
                </div>
                <Toggle checked={pushNotifs} onChange={() => setPushNotifs(!pushNotifs)} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Email Digests</p>
                  <p className="text-xs text-white/45 mt-0.5">Weekly summary to inbox</p>
                </div>
                <Toggle checked={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Event Reminders</p>
                  <p className="text-xs text-white/45 mt-0.5">24h before registered events</p>
                </div>
                <Toggle checked={eventReminders} onChange={() => setEventReminders(!eventReminders)} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Marketplace Alerts</p>
                  <p className="text-xs text-white/45 mt-0.5">New listings matching wishlist</p>
                </div>
                <Toggle checked={marketAlerts} onChange={() => setMarketAlerts(!marketAlerts)} />
              </div>
            </div>
          </section>

          {/* Appearance */}
          <section>
            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-400">Appearance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Dark Mode</p>
                <p className="text-xs text-white/45 mt-0.5">Always on dark theme</p>
              </div>
              <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </div>
          </section>

          {/* Privacy */}
          <section>
            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">Privacy</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Public Profile</p>
                  <p className="text-xs text-white/45 mt-0.5">Visible to other students</p>
                </div>
                <Toggle checked={publicProfile} onChange={() => setPublicProfile(!publicProfile)} />
              </div>
            </div>
          </section>

          {/* Account */}
          <section>
            <h3 className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Account</h3>
            <div className="space-y-2">
              <button className="w-full rounded-xl bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors">
                Change Password
              </button>
              <button className="w-full rounded-xl bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors">
                Manage Connected Accounts
              </button>
              <button className="w-full rounded-xl bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors">
                Download My Data
              </button>
              <button
                onClick={() => onClose()}
                className="w-full rounded-xl bg-rose-500/10 px-4 py-3 text-left text-sm font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors border border-rose-500/10"
              >
                Log Out
              </button>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
