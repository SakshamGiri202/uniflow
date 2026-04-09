import React, { useState, useRef } from 'react';

type Tab = 'profile' | 'history' | 'activity';

function Badge({ color, label }: { color: string; label: string }) {
  return (
    <span className={`rounded px-2.5 py-1 text-[10px] font-bold ${color}`}>{label}</span>
  );
}

export default function ProfilePanel({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  
  // Dynamic Profile State (Frontend Only)
  const [profile, setProfile] = useState({
    username: 'arjun_k',
    fullName: 'Arjun Kumar',
    institution: 'MIT Bangalore',
    email: 'arjun.k@student.edu',
    degree: '4th Year · Computer Science',
    bio: 'Passionate full-stack developer and tech enthusiast. Always learning!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const TABS: { key: Tab; label: string }[] = [
    { key: 'profile', label: 'Profile' },
    { key: 'history', label: 'History' },
    { key: 'activity', label: 'Activity' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate a dynamic update
    setTimeout(() => {
      setIsSaving(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    }, 800);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        style={{ zIndex: 9998 }}
        onClick={onClose}
      />
      <div
        className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-[#0A0D14] shadow-2xl border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300"
        style={{ zIndex: 9999 }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0D1119] px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-white">Account Settings</h2>
            <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5 font-bold">Manage your academic identity</p>
          </div>
          <button
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/60 hover:bg-white/15 hover:text-white transition-all active:scale-90"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex shrink-0 border-b border-white/10 bg-[#0D1119] scrollbar-hide overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 min-w-[100px] py-4 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
                activeTab === tab.key
                  ? 'border-sky-400 text-sky-400'
                  : 'border-transparent text-white/30 hover:text-white/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">

          {/* ── PROFILE TAB ── */}
          {activeTab === 'profile' && (
            <div className="space-y-8 pb-10">
              {/* Avatar Section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-3xl bg-white/[0.02] border border-white/5">
                <div className="relative h-24 w-24 shrink-0">
                  <img
                    src={profile.avatar}
                    alt="Avatar"
                    className="h-full w-full rounded-full object-cover border-4 border-white/10 shadow-xl"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-sky-400 text-slate-950 shadow-lg hover:bg-sky-300 transition-all hover:scale-110 active:scale-90"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" accept="image/*" />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-black text-white">{profile.fullName}</h3>
                  <p className="text-xs text-sky-400 font-bold uppercase tracking-widest">{profile.degree}</p>
                  <p className="text-[10px] text-white/30 mt-1 uppercase font-bold">Last profile sync: Today</p>
                </div>
              </div>

              {/* Editable Fields */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Display Name</label>
                    <input 
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-white/10 bg-[#12161E] px-5 py-3.5 text-sm text-white focus:border-sky-400 focus:ring-1 focus:ring-sky-400/20 outline-none transition-all hover:bg-white/[0.04]" 
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Username</label>
                    <input 
                      name="username"
                      value={profile.username}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-white/10 bg-[#12161E] px-5 py-3.5 text-sm font-mono text-sky-300 focus:border-sky-400 outline-none transition-all" 
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Bio / About</label>
                  <textarea 
                    name="bio"
                    value={profile.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-2xl border border-white/10 bg-[#12161E] px-5 py-3.5 text-sm text-white/70 focus:border-sky-400 outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Institution</label>
                  <input 
                    name="institution"
                    value={profile.institution}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-white/10 bg-[#12161E] px-5 py-3.5 text-sm text-white focus:border-sky-400 outline-none transition-all" 
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Email (Verified)</label>
                  <input 
                    value={profile.email}
                    disabled 
                    className="w-full cursor-not-allowed rounded-2xl border border-white/5 bg-[#0D1119] px-5 py-3.5 text-sm text-white/30 font-medium" 
                  />
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14] to-transparent sm:relative sm:p-0 sm:bg-none">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="w-full h-14 rounded-2xl bg-sky-400 text-slate-900 text-sm font-black uppercase tracking-[0.2em] hover:bg-sky-300 active:scale-[0.98] transition-all shadow-[0_10px_25px_rgba(56,189,248,0.3)] disabled:opacity-50"
                >
                  {isSaving ? 'Processing Evolution...' : 'Synchronize Identity'}
                </button>
                {message && (
                  <p className="mt-3 text-center text-[10px] font-bold text-emerald-400 uppercase tracking-widest animate-bounce">{message}</p>
                )}
              </div>
            </div>
          )}

          {/* ── HISTORY TAB ── */}
          {activeTab === 'history' && (
            <div className="space-y-8">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-sky-300">Transaction History</h4>
                  <span className="text-[10px] font-bold text-white/30">Total: ₹1,200</span>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Engineering Books Vol.2', date: 'Bought · Oct 12', price: '₹850' },
                    { title: 'Lab Coat (Size M)', date: 'Bought · Sep 28', price: '₹350' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl bg-white/[0.03] border border-white/5 p-4 hover:bg-white/[0.05] transition-colors">
                      <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="text-[10px] text-white/40 uppercase font-bold mt-1">{item.date}</p>
                      </div>
                      <span className="text-sm font-black text-white">{item.price}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="mb-4 text-[10px] font-black uppercase tracking-widest text-fuchsia-400">Events Pipeline</h4>
                <div className="space-y-3">
                  {[
                    { title: 'Hackathon 2.0', desc: 'Oct 14 · Main Campus', badge: 'Upcoming', bColor: 'bg-sky-500/20 text-sky-400' },
                    { title: 'Jazz Night', desc: 'Oct 9 · Open Air', badge: 'Attended', bColor: 'bg-emerald-500/20 text-emerald-400' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                      <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="text-[10px] text-white/40 uppercase font-bold mt-1">{item.desc}</p>
                      </div>
                      <Badge color={item.bColor} label={item.badge} />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ── ACTIVITY TAB ── */}
          {activeTab === 'activity' && (
            <div className="space-y-8">
              <section>
                <h4 className="mb-4 text-[10px] font-black uppercase tracking-widest text-orange-400">Merchant Insights</h4>
                <div className="space-y-3">
                  {[
                    { title: 'Sony Headphones WH-1000XM4', info: '₹6,500', badge: 'Unsold', bColor: 'bg-rose-500/20 text-rose-400' },
                    { title: 'Drafting Table', info: '₹2,200', badge: 'Sold', bColor: 'bg-emerald-500/20 text-emerald-400' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl bg-white/[0.03] border border-white/5 p-4">
                      <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="text-[10px] text-white/40 uppercase font-bold mt-1">{item.info}</p>
                      </div>
                      <Badge color={item.bColor} label={item.badge} />
                    </div>
                  ))}
                </div>
              </section>

              <div className="p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 text-center">
                 <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-2">Pro Member Badge</p>
                 <p className="text-xs text-white/50">You've organized 5 events this semester. You're in the top 1% of contributors!</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
