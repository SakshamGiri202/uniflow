import React from 'react'

interface Props {
  onBack: () => void
}

const EventDetail: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-dvh bg-[#090C12] text-white">
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#0D1119]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <div className="text-3xl font-black italic tracking-tight text-sky-300">UniFlow</div>
            <div className="hidden items-center gap-7 md:flex">
              <button onClick={onBack} className="text-sm text-white/65 hover:text-white">Dashboard</button>
              <button className="text-sm text-white/65 hover:text-white">Marketplace</button>
              <button className="border-b-2 border-sky-300 pb-1 text-sm font-semibold text-sky-300">Events</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/70">🔔</button>
            <button className="text-white/70">⚙</button>
            <button className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-xs">👤</button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] px-6 py-8">
        <button onClick={onBack} className="mb-6 flex items-center gap-2 text-white/60 hover:text-white">
          ← Back to Events
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <div className="h-[400px] bg-[radial-gradient(circle_at_75%_40%,rgba(251,146,60,0.45),transparent_28%),radial-gradient(circle_at_65%_45%,rgba(251,146,60,0.24),transparent_40%),linear-gradient(110deg,#0e131c_20%,#05070b_55%,#1e130b_100%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="rounded-full bg-fuchsia-600 px-3 py-1 text-xs font-bold uppercase">Tech & Innovation</span>
                <h1 className="mt-4 text-5xl font-black leading-tight">The Electric Pulse Hackathon 2.0</h1>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#12161E] p-6">
              <h2 className="text-xl font-bold mb-4">About This Event</h2>
              <p className="text-white/70 leading-relaxed">
                Join 500+ developers for a 48-hour sprint of pure creation, neon aesthetics, and massive rewards. 
                This hackathon brings together the brightest minds from campuses across the region to build 
                innovative solutions for real-world problems.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-xs text-white/50 uppercase tracking-wider">Participants</div>
                  <div className="text-2xl font-bold text-sky-300">432+</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-xs text-white/50 uppercase tracking-wider">Prize Pool</div>
                  <div className="text-2xl font-bold text-orange-300">₹50,000</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#12161E] p-6">
              <h2 className="text-xl font-bold mb-4">Timeline</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-20 text-sm text-white/50">Day 1</div>
                  <div className="flex-1 bg-white/5 rounded-lg p-3 text-sm">09:00 AM - Registration & Kickoff</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-20 text-sm text-white/50">Day 1</div>
                  <div className="flex-1 bg-white/5 rounded-lg p-3 text-sm">11:00 AM - Hacking Begins</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-20 text-sm text-white/50">Day 2</div>
                  <div className="flex-1 bg-white/5 rounded-lg p-3 text-sm">10:00 PM - Submission Deadline</div>
                </div>
                <div className="flex gap-4">
                  <div className="w-20 text-sm text-white/50">Day 2</div>
                  <div className="flex-1 bg-white/5 rounded-lg p-3 text-sm">02:00 PM - Presentations & Awards</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-[#171B23] p-6">
              <h3 className="text-lg font-bold mb-4">Event Details</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-white/50">📍</span>
                  <span>Main Campus, Hall A</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/50">📅</span>
                  <span>October 14-15, 2024</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/50">⏱</span>
                  <span>48 Hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/50">👥</span>
                  <span>500 Max Participants</span>
                </div>
              </div>
              <button className="mt-6 w-full rounded-lg bg-sky-300 py-3 text-base font-black uppercase tracking-[0.12em] text-slate-900">
                Register Now
              </button>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#12161E] p-6">
              <h3 className="text-lg font-bold mb-4">Organizer</h3>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-400" />
                <div>
                  <div className="font-semibold">Tech Club</div>
                  <div className="text-xs text-white/50">Campus Chapter</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EventDetail