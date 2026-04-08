import { useState } from 'react'
import CreateEventModal from './CreateEventModal'

function Pill({
  label,
  active = false,
  icon,
  onClick,
}: {
  label: string
  active?: boolean
  icon: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
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
  isActive = false,
  onClick,
}: {
  day: string
  tag?: string
  tone?: 'sky' | 'purple'
  muted?: boolean
  isActive?: boolean
  onClick?: () => void
}) {
  // If active, give it a bright primary look depending on tag type, else defaults.
  return (
    <div 
      onClick={onClick}
      className={`min-h-[110px] p-3 text-xs cursor-pointer transition-colors duration-200 ${
        isActive 
          ? 'bg-[#1D2530] ring-2 ring-sky-300/70 ring-inset shadow-lg shadow-sky-500/10 scale-[1.02] transform z-10' 
          : 'bg-[#161A20] hover:bg-[#1C212A]'
      } ${muted && !isActive ? 'opacity-35 hover:opacity-50' : ''}`}
    >
      <div className={isActive ? 'font-bold text-sky-200' : ''}>{day}</div>
      {tag ? (
        <div
          className={`mt-2 rounded-md p-2 text-[10px] font-bold ${
            isActive
              ? tone === 'purple' 
                  ? 'bg-violet-400 text-slate-900' 
                  : 'bg-sky-300 text-slate-900 border-none'
              : tone === 'purple'
                ? 'border-l-2 border-violet-400 bg-violet-400/20 text-violet-200'
                : 'border-l-2 border-sky-300 bg-sky-300/20 text-sky-200'
          }`}
        >
          {tag}
        </div>
      ) : null}
    </div>
  )
}

interface Props {
  onNavigate?: (page: string) => void
}

const CATEGORIES = [
  { label: 'Tech & Innovation', icon: '⚡' },
  { label: 'Arts & Culture', icon: '🎨' },
  { label: 'Sports', icon: '🏋️' },
  { label: 'Social Mixer', icon: '🍸' },
  { label: 'Workshop', icon: '🎓' },
];

export default function EventsPortal({ onNavigate }: Props) {
  const [activeCategory, setActiveCategory] = useState("Tech & Innovation");
  const [activeDay, setActiveDay] = useState("14");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month + offset);
    setCurrentDate(newDate);
  };

  const monthName = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const monthStrShort = currentDate.toLocaleString('en-US', { month: 'short' });

  // Generate calendar grid (42 cells: 6 weeks x 7 days representing Mon-Sun)
  const calendarGrid = [];
  const firstDay = new Date(year, month, 1).getDay();
  const startDayOffset = (firstDay + 6) % 7; // Monday = 0, Sunday = 6
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  for (let i = startDayOffset - 1; i >= 0; i--) {
    calendarGrid.push({ day: (daysInPrevMonth - i).toString(), muted: true });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    let tag = undefined;
    let tone = undefined;
    if (i === 3) tag = 'AI SEMINAR';
    if (i === 9) { tag = 'JAZZ NIGHT'; tone = 'purple'; }
    if (i === 14) tag = 'HACKATHON 2.0';
    calendarGrid.push({ day: i.toString(), tag, tone, muted: false });
  }

  const remainingCells = 42 - calendarGrid.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarGrid.push({ day: i.toString(), muted: true });
  }

  return (
    <div className="min-h-dvh bg-[#090C12] text-white">
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#0D1119]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <div className="text-3xl font-black italic tracking-tight text-sky-300">UniFlow</div>
            <div className="hidden items-center gap-7 md:flex">
              <button onClick={() => onNavigate?.('dashboard')} className="text-sm text-white/65 hover:text-white transition-colors">Dashboard</button>
              <button onClick={() => onNavigate?.('marketplace')} className="text-sm text-white/65 hover:text-white transition-colors">Marketplace</button>
              <button className="border-b-2 border-sky-300 pb-1 text-sm font-semibold text-sky-300 transition-colors">Events</button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/70 hover:text-white transition-colors">🔔</button>
            <button className="text-white/70 hover:text-white transition-colors">⚙</button>
            <button className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-xs hover:bg-white/30 transition-colors">
              👤
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-[1440px] space-y-10 px-6 py-8">
        <section className="relative flex min-h-[350px] md:min-h-[400px] flex-col justify-end overflow-hidden rounded-xl border border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,rgba(251,146,60,0.45),transparent_28%),radial-gradient(circle_at_65%_45%,rgba(251,146,60,0.24),transparent_40%),linear-gradient(110deg,#0e131c_20%,#05070b_55%,#1e130b_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          <div className="relative z-10 p-8 pt-20 md:p-10 md:pt-24">
            <div className="mb-3 flex items-center gap-3">
              <span className="rounded-full bg-fuchsia-600 px-3 py-1 text-xs font-bold uppercase">
                Trending Now
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs">{monthStrShort} {activeDay}, {year}</span>
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
              <button
                onClick={() => onNavigate?.('event-detail')}
                className="rounded-lg bg-sky-300 px-6 py-3 font-bold text-slate-900 transition-colors hover:bg-sky-200"
              >
                Secure My Slot
              </button>
              <button
                onClick={() => onNavigate?.('event-detail')}
                className="rounded-lg bg-white/10 px-6 py-3 font-bold text-white transition-colors hover:bg-white/15"
              >
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
            {CATEGORIES.map(category => (
              <Pill 
                key={category.label}
                label={category.label} 
                icon={category.icon} 
                active={activeCategory === category.label} 
                onClick={() => setActiveCategory(category.label)}
              />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 rounded-xl border border-white/10 bg-[#12161E] p-6 lg:col-span-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="text-4xl font-black">{monthName}</h3>
                <p className="text-sm text-white/55">12 events scheduled this month</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-[#20242C] p-1.5">
                <button onClick={() => changeMonth(-1)} className="rounded-lg px-3 py-2 hover:bg-white/10 transition-colors">‹</button>
                <span className="px-3 text-xs font-bold uppercase tracking-[0.2em] cursor-pointer" onClick={() => setCurrentDate(new Date())}>Today</span>
                <button onClick={() => changeMonth(1)} className="rounded-lg px-3 py-2 hover:bg-white/10 transition-colors">›</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl bg-white/10 items-start">
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
                <div
                  key={d}
                  className="bg-[#1A1F26] py-3 text-center text-[10px] font-bold tracking-[0.2em] text-white/55"
                >
                  {d}
                </div>
              ))}
              
              {calendarGrid.map((cell, idx) => (
                <CalendarCell 
                  key={`${cell.day}-${idx}`}
                  day={cell.day}
                  tag={cell.tag}
                  tone={cell.tone as any}
                  muted={cell.muted}
                  isActive={!cell.muted && activeDay === cell.day}
                  onClick={() => { if (!cell.muted) setActiveDay(cell.day); }}
                />
              ))}
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
                  <button className="rounded-full bg-white/10 p-2 hover:bg-white/15 transition-colors">↗</button>
                </div>
                <div className="space-y-2 text-sm text-white/70">
                  <p>📍 Main Campus | Hall A</p>
                  <p>⏱ 48 Hours | 10:00 AM Onwards</p>
                  <p>👥 432 Students Registered</p>
                </div>
                <button className="w-full rounded-lg bg-sky-300 py-3 text-base font-black uppercase tracking-[0.12em] text-slate-900 transition-colors hover:bg-sky-200">
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
              <button 
                onClick={() => alert('Opening live stream...')}
                className="mt-3 text-sm font-bold text-sky-300 hover:text-sky-200 transition-colors">WATCH STREAM →</button>
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
                  <button 
                    onClick={() => alert('Saved Zen Yoga Morning to your agenda!')}
                    className="text-white/45 hover:text-white transition-colors">🔖</button>
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
                  <button 
                    onClick={() => alert('Saved Film Noir Screening to your agenda!')}
                    className="text-white/45 hover:text-white transition-colors">🔖</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <button 
        onClick={() => setIsCreateModalOpen(true)}
        className="fixed bottom-8 right-8 z-40 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-400 text-4xl text-white shadow-[0_10px_28px_rgba(196,127,255,0.45)] hover:scale-105 transition-transform">
        +
      </button>

      {isCreateModalOpen && (
        <CreateEventModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  )
}

