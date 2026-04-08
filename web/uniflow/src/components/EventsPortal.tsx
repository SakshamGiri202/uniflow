import { Link } from 'react-router-dom'

function Pill({
  label,
  active = false,
  icon,
}: {
  label: string
  active?: boolean
  icon: string
}) {
  return (
    <button
      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${
        active
          ? 'bg-fuchsia-600 text-white'
          : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function CalendarCell({
  day,
  tag,
  tone = 'sky',
  muted = false,
}: {
  day: string
  tag?: string
  tone?: 'sky' | 'purple'
  muted?: boolean
}) {
  return (
    <div className={`min-h-[110px] bg-[#161A20] p-3 text-xs ${muted ? 'opacity-35' : ''}`}>
      <div>{day}</div>
      {tag ? (
        <div
          className={`mt-2 rounded-md border-l-2 p-2 text-[10px] font-bold ${
            tone === 'purple'
              ? 'border-violet-400 bg-violet-400/20 text-violet-200'
              : 'border-sky-300 bg-sky-300/20 text-sky-200'
          }`}
        >
          {tag}
        </div>
      ) : null}
    </div>
  )
}

export default function EventsPortal() {
  return (
    <div className="min-h-dvh bg-[#090C12] text-white">
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#0D1119]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <div className="text-3xl font-black italic tracking-tight text-sky-300">UniFlow</div>
            <div className="hidden items-center gap-7 md:flex">
              <Link to="/dashboard" className="text-sm text-white/65 hover:text-white">
                Dashboard
              </Link>
              <Link to="/marketplace" className="text-sm text-white/65 hover:text-white">
                Marketplace
              </Link>
              <Link to="/events" className="border-b-2 border-sky-300 pb-1 text-sm font-semibold text-sky-300">
                Events
              </Link>
              <Link to="/coach" className="text-sm text-white/65 hover:text-white">
                Coach
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/70">🔔</button>
            <button className="text-white/70">⚙</button>
            <button className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-xs">
              👤
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] space-y-10 px-6 py-8">
        <section className="relative overflow-hidden rounded-xl border border-white/10">
          <div className="h-[300px] bg-[radial-gradient(circle_at_75%_40%,rgba(251,146,60,0.45),transparent_28%),radial-gradient(circle_at_65%_45%,rgba(251,146,60,0.24),transparent_40%),linear-gradient(110deg,#0e131c_20%,#05070b_55%,#1e130b_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 md:p-10">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-fuchsia-600 px-3 py-1 text-xs font-bold uppercase">
                Trending Now
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">Oct 24, 2024</span>
            </div>
            <h1 className="text-5xl font-black leading-tight md:text-6xl">
              The Electric Pulse
              <br />
              <span className="italic text-sky-300">Hackathon 2.0</span>
            </h1>
            <p className="mt-3 max-w-xl text-white/70">
              Join 500+ developers for a 48-hour sprint of pure creation, neon aesthetics,
              and massive rewards.
            </p>
            <div className="mt-6 flex gap-3">
              <button className="rounded-lg bg-sky-300 px-6 py-3 font-bold text-slate-900">
                Secure My Slot
              </button>
              <button className="rounded-lg bg-white/10 px-6 py-3 font-bold text-white">
                View Details
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
            <span className="h-2 w-2 rounded-full bg-orange-300" />
            Trending Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            <Pill label="Tech & Innovation" icon="⚡" active />
            <Pill label="Arts & Culture" icon="🎨" />
            <Pill label="Sports" icon="🏋️" />
            <Pill label="Social Mixer" icon="🍸" />
            <Pill label="Workshop" icon="🎓" />
          </div>
        </section>

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 rounded-xl border border-white/10 bg-[#12161E] p-6 lg:col-span-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-4xl font-black">October 2024</h3>
                <p className="text-sm text-white/55">12 events scheduled this month</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-[#20242C] p-1.5">
                <button className="rounded-lg px-3 py-2 hover:bg-white/10">‹</button>
                <span className="px-3 text-xs font-bold uppercase tracking-[0.2em]">Today</span>
                <button className="rounded-lg px-3 py-2 hover:bg-white/10">›</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl bg-white/10">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
                <div
                  key={d}
                  className="bg-[#1A1F26] py-3 text-center text-[10px] font-bold tracking-[0.2em] text-white/55"
                >
                  {d}
                </div>
              ))}
              <CalendarCell day="28" muted />
              <CalendarCell day="29" muted />
              <CalendarCell day="30" muted />
              <CalendarCell day="1" />
              <CalendarCell day="2" />
              <CalendarCell day="3" tag="AI SEMINAR" />
              <CalendarCell day="4" />
              <CalendarCell day="5" />
              <CalendarCell day="6" />
              <CalendarCell day="7" />
              <CalendarCell day="8" />
              <CalendarCell day="9" tag="JAZZ NIGHT" tone="purple" />
              <CalendarCell day="10" />
              <CalendarCell day="11" />
              <CalendarCell day="12" />
              <CalendarCell day="13" />
              <div className="relative min-h-[110px] bg-[#1D2530] p-3 text-xs ring-2 ring-sky-300/70 ring-inset">
                <div>14</div>
                <div className="mt-2 rounded-md bg-sky-300 p-2 text-[10px] font-black text-slate-900">
                  HACKATHON 2.0
                </div>
              </div>
              <CalendarCell day="15" />
              <CalendarCell day="16" />
              <CalendarCell day="17" />
              <CalendarCell day="18" />
            </div>
          </div>

          <div className="col-span-12 flex flex-col gap-5 lg:col-span-4">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#171B23]">
              <div className="h-36 bg-gradient-to-br from-violet-500/60 via-orange-300/50 to-pink-500/40" />
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-3xl font-bold">Hackathon 2.0</h4>
                    <p className="text-sm text-orange-200">Starts in 3 days</p>
                  </div>
                  <button className="rounded-full bg-white/10 p-2">↗</button>
                </div>
                <div className="space-y-2 text-sm text-white/70">
                  <p>📍 Main Campus | Hall A</p>
                  <p>⏱ 48 Hours | 10:00 AM Onwards</p>
                  <p>👥 432 Students Registered</p>
                </div>
                <button className="w-full rounded-lg bg-sky-300 py-3 text-base font-black uppercase tracking-[0.12em] text-slate-900">
                  Quick Register
                </button>
              </div>
            </div>

            <div className="rounded-xl border-l-4 border-orange-300 bg-[#1A1F27] p-5">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-rose-300">
                Live Now
              </div>
              <h5 className="text-2xl font-bold">Startup Founders Q&A</h5>
              <p className="mt-2 text-sm text-white/60">
                Join the live session in Seminar Hall 3 or via the stream link below.
              </p>
              <button className="mt-3 text-sm font-bold text-sky-300">WATCH STREAM →</button>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#12161E] p-5">
              <h5 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/55">
                Upcoming this week
              </h5>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#232831] text-center">
                    <div className="text-[9px] font-bold text-violet-300">OCT</div>
                    <div className="text-lg font-black leading-none">16</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">Zen Yoga Morning</div>
                    <div className="text-[11px] text-white/60">07:30 AM • Student Center</div>
                  </div>
                  <button className="text-white/45">🔖</button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#232831] text-center">
                    <div className="text-[9px] font-bold text-violet-300">OCT</div>
                    <div className="text-lg font-black leading-none">17</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">Film Noir Screening</div>
                    <div className="text-[11px] text-white/60">06:00 PM • Auditorium 2</div>
                  </div>
                  <button className="text-white/45">🔖</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <button className="fixed bottom-8 right-8 z-40 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-400 text-4xl text-white shadow-[0_10px_28px_rgba(196,127,255,0.45)]">
        +
      </button>
    </div>
  )
}

