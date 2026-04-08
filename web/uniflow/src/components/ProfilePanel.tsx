import React, { useState } from 'react';

type Tab = 'profile' | 'history' | 'activity';

function Badge({ color, label }: { color: string; label: string }) {
  return (
    <span className={`rounded px-2.5 py-1 text-[10px] font-bold ${color}`}>{label}</span>
  );
}

export default function ProfilePanel({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const TABS: { key: Tab; label: string }[] = [
    { key: 'profile', label: 'Profile' },
    { key: 'history', label: 'History' },
    { key: 'activity', label: 'Activity' },
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        style={{ zIndex: 9998 }}
        onClick={onClose}
      />
      <div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0A0D14] shadow-2xl border-l border-white/10 flex flex-col"
        style={{ zIndex: 9999 }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0D1119] px-6 py-5">
          <h2 className="text-xl font-bold text-white">My Account</h2>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-white/60 hover:bg-white/15 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 border-b border-white/10 bg-[#0D1119]">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3.5 text-sm font-bold transition-colors border-b-2 ${
                activeTab === tab.key
                  ? 'border-sky-400 text-sky-400'
                  : 'border-transparent text-white/45 hover:text-white/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">

          {/* ── PROFILE TAB ── */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Avatar Row */}
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
                    alt="Avatar"
                    className="h-full w-full rounded-full object-cover border-2 border-white/10"
                  />
                  <label className="absolute -bottom-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-sky-400 text-slate-900 text-xs hover:bg-sky-300 transition-colors">
                    ✏
                    <input type="file" className="sr-only" accept="image/*" />
                  </label>
                </div>
                <div>
                  <p className="text-base font-bold text-white">Arjun Kumar</p>
                  <p className="text-xs text-white/50">4th Year · Computer Science</p>
                </div>
              </div>

              {/* Edit Fields */}
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-white/50">Username</label>
                  <input defaultValue="arjun_k" className="w-full rounded-xl border border-white/10 bg-[#12161E] px-4 py-3 text-sm text-white focus:border-sky-400 focus:outline-none transition-colors hover:bg-[#161B24]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-white/50">Full Name</label>
                  <input defaultValue="Arjun Kumar" className="w-full rounded-xl border border-white/10 bg-[#12161E] px-4 py-3 text-sm text-white focus:border-sky-400 focus:outline-none transition-colors hover:bg-[#161B24]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-white/50">College / Institution</label>
                  <input defaultValue="MIT Bangalore" className="w-full rounded-xl border border-white/10 bg-[#12161E] px-4 py-3 text-sm text-white focus:border-sky-400 focus:outline-none transition-colors hover:bg-[#161B24]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-white/50">Email</label>
                  <input defaultValue="arjun.k@student.edu" disabled className="w-full cursor-not-allowed rounded-xl border border-white/5 bg-[#0D1119] px-4 py-3 text-sm text-white/40" />
                </div>
              </div>

              <button
                onClick={() => alert('Profile saved!')}
                className="w-full rounded-xl bg-sky-400 py-3 text-sm font-bold text-slate-900 hover:bg-sky-300 transition-colors shadow-lg shadow-sky-500/20"
              >
                Save Changes
              </button>
            </div>
          )}

          {/* ── HISTORY TAB ── */}
          {activeTab === 'history' && (
            <div className="space-y-7">

              {/* Purchased Items */}
              <section>
                <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-sky-400">Items Purchased</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-[#12161E] border border-white/5 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-white">Engineering Books Vol.2</p>
                      <p className="mt-0.5 text-xs text-white/45">Bought · Oct 12, 2024</p>
                    </div>
                    <span className="text-sm font-black text-sky-300">₹850</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[#12161E] border border-white/5 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-white">Lab Coat (Size M)</p>
                      <p className="mt-0.5 text-xs text-white/45">Bought · Sep 28, 2024</p>
                    </div>
                    <span className="text-sm font-black text-sky-300">₹350</span>
                  </div>
                </div>
              </section>

              {/* Registered Events */}
              <section>
                <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-fuchsia-400">Registered Events</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-[#12161E] border border-white/5 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-white">Hackathon 2.0</p>
                      <p className="mt-0.5 text-xs text-white/45">Oct 14, 2024 · Main Campus</p>
                    </div>
                    <Badge color="bg-sky-500/20 text-sky-400" label="Upcoming" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[#12161E] border border-white/5 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-white">Jazz Night</p>
                      <p className="mt-0.5 text-xs text-white/45">Oct 9, 2024 · Open Air Theatre</p>
                    </div>
                    <Badge color="bg-emerald-500/20 text-emerald-400" label="Attended" />
                  </div>
                </div>
              </section>

              {/* Coaching Taken */}
              <section>
                <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-orange-400">Coaching Taken</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-[#12161E] border border-white/5 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-white">DSA Crash Course</p>
                      <p className="mt-0.5 text-xs text-white/45">Mentor: Priya S. · 4 sessions</p>
                    </div>
                    <Badge color="bg-emerald-500/20 text-emerald-400" label="Completed" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ── ACTIVITY TAB ── */}
          {activeTab === 'activity' && (
            <div className="space-y-7">

              {/* Sell Listings */}
              <section>
                <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-sky-400">Posted Listings</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-[#12161E] border border-white/5 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-white">Sony Headphones WH-1000XM4</p>
                      <p className="mt-0.5 text-xs text-white/45">Posted 2 days ago · ₹6,500</p>
                    </div>
                    <Badge color="bg-rose-500/20 text-rose-400" label="Unsold" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[#12161E] border border-white/5 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-white">Drafting Table</p>
                      <p className="mt-0.5 text-xs text-white/45">Posted Oct 1 · ₹2,200</p>
                    </div>
                    <Badge color="bg-emerald-500/20 text-emerald-400" label="Sold" />
                  </div>
                </div>
              </section>

              {/* Events Organized */}
              <section>
                <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-fuchsia-400">Events Organized</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-[#12161E] border border-white/5 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-white">AI Workshop Series</p>
                      <p className="mt-0.5 text-xs text-white/45">Next: Nov 5, 2024</p>
                    </div>
                    <Badge color="bg-orange-500/20 text-orange-400" label="Yet to Commence" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[#12161E] border border-white/5 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-white">Campus Photo Walk</p>
                      <p className="mt-0.5 text-xs text-white/45">Oct 5, 2024</p>
                    </div>
                    <Badge color="bg-emerald-500/20 text-emerald-400" label="Done" />
                  </div>
                </div>
              </section>

              {/* Coaching Status */}
              <section>
                <h4 className="mb-3 text-[10px] font-black uppercase tracking-widest text-orange-400">Coaching Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-[#12161E] border border-white/5 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-white">React Native 101</p>
                      <p className="mt-0.5 text-xs text-white/45">Student: Rohit M.</p>
                    </div>
                    <Badge color="bg-yellow-500/20 text-yellow-400" label="Pending" />
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[#12161E] border border-white/5 p-3.5">
                    <div>
                      <p className="text-sm font-semibold text-white">Python Basics</p>
                      <p className="mt-0.5 text-xs text-white/45">Student: Ananya K.</p>
                    </div>
                    <Badge color="bg-emerald-500/20 text-emerald-400" label="Completed" />
                  </div>
                </div>
              </section>

            </div>
          )}

        </div>
      </div>
    </>
  );
}
