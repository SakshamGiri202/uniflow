import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CreateEventModal from './CreateEventModal'
import EventRegistrationModal from './EventRegistrationModal'
import EventRegistrations from './EventRegistrations'
import TopNavActions from './TopNavActions'
import AISearchBar from './AISearchBar'
import { supabase } from '../lib/supabase'

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

const CATEGORIES = [
  { label: 'Tech & Innovation', icon: '⚡' },
  { label: 'Arts & Culture', icon: '🎨' },
  { label: 'Sports', icon: '🏋️' },
  { label: 'Social Mixer', icon: '🍸' },
  { label: 'Workshop', icon: '🎓' },
];

export default function EventsPortal() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("Tech & Innovation");
  const [activeDay, setActiveDay] = useState("14");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isViewingRegistrations, setIsViewingRegistrations] = useState(false);
  const [events, setEvents] = useState<any[]>([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  // If viewing registrations, show the registrations component instead
  if (isViewingRegistrations) {
    const activeEvent = events.find(event => {
      const eventDate = new Date(event.event_date);
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      return eventDate.getDate() === parseInt(activeDay) && eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    if (activeEvent) {
      return (
        <EventRegistrations 
          eventId={activeEvent.id}
          eventName={activeEvent.event_name}
          onBack={() => setIsViewingRegistrations(false)}
        />
      );
    }
  }

  const fetchEvents = async () => {
    try {
      const startOfMonth = new Date(year, month, 1).toISOString().split('T')[0];
      const endOfMonth = new Date(year, month + 1, 0).toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('event_date', startOfMonth)
        .lte('event_date', endOfMonth);

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


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
    const eventForDay = events.find(event => {
      const eventDate = new Date(event.event_date);
      return eventDate.getDate() === i && eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
    let tag = undefined;
    let tone = undefined;
    if (eventForDay) {
      tag = eventForDay.event_name.toUpperCase();
      tone = 'purple'; // You can customize tone based on platform or category
    }
    calendarGrid.push({ day: i.toString(), tag, tone, muted: false });
  }

  const remainingCells = 42 - calendarGrid.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarGrid.push({ day: i.toString(), muted: true });
  }

  const activeEvent = events.find(event => {
    const eventDate = new Date(event.event_date);
    return eventDate.getDate() === parseInt(activeDay) && eventDate.getMonth() === month && eventDate.getFullYear() === year;
  });

  return (
    <div className="min-h-dvh bg-[#090C12] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-5">
        <header className="mb-7 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0D1119]/90 px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="text-4xl font-black italic tracking-tight text-sky-300">UniFlow</div>
            <nav className="hidden items-center gap-6 md:flex">
              <Link to="/dashboard" className="text-sm text-white/70 hover:text-white">
                Dashboard
              </Link>
              <Link to="/marketplace" className="text-sm text-white/70 hover:text-white">
                Marketplace
              </Link>
              <Link to="/events" className="border-b-2 border-sky-300 pb-1 text-sm font-semibold text-sky-300 transition-colors">
                Events
              </Link>
              <Link to="/coach" className="text-sm text-white/70 hover:text-white">
                Coach
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-72">
              <AISearchBar placeholder="Search Events..." />
            </div>
            <TopNavActions />
          </div>
        </header>
      </div>

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
                onClick={() => navigate('/event-detail')}
                className="rounded-lg bg-sky-300 px-6 py-3 font-bold text-slate-900 transition-colors hover:bg-sky-200"
              >
                Secure My Slot
              </button>
              <button
                onClick={() => navigate('/event-detail')}
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
            
            {activeEvent ? (
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#171B23]">
                <div className={`h-36 bg-gradient-to-br from-violet-500/60 via-orange-300/50 to-pink-500/40`} />
                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-3xl font-bold">{activeEvent.event_name}</h4>
                      <p className="text-sm text-orange-200">{activeEvent.platform} Event</p>
                    </div>
                    <button className="rounded-full bg-white/10 p-2 hover:bg-white/15 transition-colors">↗</button>
                  </div>
                  <div className="space-y-2 text-sm text-white/70">
                    <p>📍 {activeEvent.college_name}, {activeEvent.city}</p>
                    <p>📅 {new Date(activeEvent.event_date).toLocaleDateString()}</p>
                    <p>👤 {activeEvent.event_head}</p>
                    <p>📞 {activeEvent.contact_number}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setIsRegistrationModalOpen(true)}
                      className="w-full rounded-lg bg-sky-300 py-3 text-sm font-black uppercase tracking-[0.12em] text-slate-900 transition-colors hover:bg-sky-200">
                      Register Now
                    </button>
                    <button 
                      onClick={() => setIsViewingRegistrations(true)}
                      className="w-full rounded-lg bg-orange-500/20 border border-orange-500/30 py-3 text-sm font-bold uppercase tracking-[0.12em] text-orange-300 transition-colors hover:bg-orange-500/30">
                      👥 View
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-white/20 bg-[#171B23] p-5 text-center">
                <svg className="w-10 h-10 text-white/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white/50 font-semibold">No events to preview.</p>
                <p className="mt-2 text-sm text-white/30 max-w-[200px]">Click on a highlighted day in the calendar to view its event details.</p>
              </div>
            )}

            {/* Closing Soon Warning Card */}
            <div className="rounded-xl border border-rose-500/30 bg-[#1A1116] p-5 overflow-hidden relative shadow-[0_10px_30px_rgba(225,29,72,0.1)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full translate-x-10 -translate-y-10 pointer-events-none" />
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-3 w-3 mt-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-400">Closing Soon</span>
              </div>
              <h5 className="text-xl font-bold text-white mb-1">Cyber Security Workshop</h5>
              <p className="text-xs text-rose-200/80 font-medium mb-4">Registration explicitly closes in less than <span className="font-bold underline decoration-rose-500/50">24 hours</span>.</p>
              <button 
                onClick={() => alert('Quick registering for Cyber Security Workshop...')}
                className="w-full rounded-lg bg-rose-500/20 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-500/30 transition-colors border border-rose-500/20">
                Register Now →
              </button>
            </div>

            {/* Live Now Ongoing Events - Scrollable Single Card */}
            <div className="rounded-xl border border-orange-500/20 bg-[#1A1F27] overflow-hidden">
              <div className="border-b border-orange-500/10 bg-orange-500/5 px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-rose-300">Live Now</span>
                </div>
              </div>
              
              <div className="max-h-[280px] overflow-y-auto p-2 space-y-2 custom-scrollbar">
                {[
                  { title: 'Startup Founders Q&A', venue: 'Seminar Hall 3', description: 'Interactive session with campus founders.', time: 'Started 20m ago' },
                  { title: 'Graphic Design Workshop', venue: 'Lab 4 - CS Block', description: 'Advanced UI/UX walkthrough.', time: 'Started 1h ago' },
                  { title: 'AI Ethics Debate', venue: 'Main Auditorium', description: 'Faculty-led discussion on AI future.', time: 'Started 5m ago' }
                ].map((event, i) => (
                  <div key={i} className="rounded-lg bg-white/5 p-4 hover:bg-white/10 transition-colors border border-white/5 group">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-bold text-lg group-hover:text-orange-200 transition-colors">{event.title}</h5>
                      <span className="text-[9px] font-medium text-white/30 whitespace-nowrap">{event.time}</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed mb-3">
                      In <span className="text-orange-200 font-bold">{event.venue}</span> • {event.description}
                    </p>
                    <button 
                      onClick={() => alert(`Opening stream for ${event.title}...`)}
                      className="text-[10px] font-black uppercase tracking-widest text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1">
                      Join Session <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                ))}
              </div>
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
        <CreateEventModal onClose={() => { setIsCreateModalOpen(false); fetchEvents(); }} />
      )}

      {isRegistrationModalOpen && activeEvent && (
        <EventRegistrationModal 
          eventId={activeEvent.id}
          eventName={activeEvent.event_name}
          onClose={() => setIsRegistrationModalOpen(false)}
          onSuccess={() => fetchEvents()}
        />
      )}
    </div>
  )
}

