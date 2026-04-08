import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type SessionCardProps = {
  tag: string
  title: string
  mentor: string
  role: string
  description: string
  schedule: string
  venue: string
}

const sessions: SessionCardProps[] = [
  {
    tag: 'TECH & CODING',
    title: 'React Hooks Deep Dive',
    mentor: 'Liam Scott',
    role: '3+ Years in Frontend',
    description: 'Learn useEffect, useMemo, and custom hooks with real-world patterns.',
    schedule: 'Today, 6:00 PM @ Library Hall',
    venue: 'Library Hall',
  },
  {
    tag: 'DATA SCIENCE',
    title: 'Data Viz Mastery',
    mentor: 'Sarah Chen',
    role: 'Data Intern @ Google',
    description: 'Make complex data beautiful and digestible using D3.js and Tableau.',
    schedule: 'Tomorrow, 4:30 PM @ Lab 4B',
    venue: 'Lab 4B',
  },
  {
    tag: 'MARKETING',
    title: 'Brand Identity Lab',
    mentor: 'Marcus Thorne',
    role: 'Freelance Brand Strategist',
    description: 'Developing a unique voice and visual language for your personal brand.',
    schedule: 'Fri, 5:00 PM @ Seminar Hall A',
    venue: 'Seminar Hall A',
  },
]

function SessionCard({ tag, title, mentor, role, description, schedule }: SessionCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#121821]/85 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-sky-200">
          {tag}
        </span>
        <span className="text-white/45">⚡</span>
      </div>

      <h3 className="text-3xl font-semibold tracking-tight text-white">{title}</h3>
      <div className="mt-3 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-cyan-300/25 text-sm">👤</div>
        <div>
          <p className="text-sm font-semibold text-white/85">{mentor}</p>
          <p className="text-xs text-white/45">{role}</p>
        </div>
      </div>

      <p className="mt-4 text-base leading-relaxed text-white/70">{description}</p>
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">When & Where</p>
        <p className="mt-2 text-xl font-semibold text-white/90">{schedule}</p>
      </div>

      <button className="mt-5 w-full rounded-xl bg-white/10 py-3 text-lg font-semibold text-white/90 hover:bg-white/15">
        Apply Now
      </button>
    </article>
  )
}

export default function Coach() {
  const [showFindCoach, setShowFindCoach] = useState(false)
  const [showBecomeCoach, setShowBecomeCoach] = useState(false)
  const [topicFilter, setTopicFilter] = useState('All Topics')
  const [venueFilter, setVenueFilter] = useState('All Venues')
  const [coachFilter, setCoachFilter] = useState('All Coaches')
  const [topicName, setTopicName] = useState('')
  const [coachName, setCoachName] = useState('')
  const [experience, setExperience] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState('')

  const topics = useMemo(() => ['All Topics', ...new Set(sessions.map((s) => s.tag))], [])
  const venues = useMemo(() => ['All Venues', ...new Set(sessions.map((s) => s.venue))], [])
  const coaches = useMemo(() => ['All Coaches', ...new Set(sessions.map((s) => s.mentor))], [])

  const filteredSessions = useMemo(
    () =>
      sessions.filter((session) => {
        const topicMatch = topicFilter === 'All Topics' || session.tag === topicFilter
        const venueMatch = venueFilter === 'All Venues' || session.venue === venueFilter
        const coachMatch = coachFilter === 'All Coaches' || session.mentor === coachFilter
        return topicMatch && venueMatch && coachMatch
      }),
    [topicFilter, venueFilter, coachFilter]
  )

  return (
    <div className="min-h-dvh bg-[#06090F] text-white">
      <header className="border-b border-white/10 bg-[#0D1119]/90">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="text-4xl font-black italic tracking-tight text-sky-300">UniFlow</div>
            <nav className="hidden items-center gap-6 md:flex">
              <Link to="/dashboard" className="text-sm text-white/70 hover:text-white">
                Dashboard
              </Link>
              <Link to="/marketplace" className="text-sm text-white/70 hover:text-white">
                Marketplace
              </Link>
              <Link to="/events" className="text-sm text-white/70 hover:text-white">
                Events
              </Link>
              <Link to="/coach" className="border-b-2 border-sky-300 pb-1 text-sm font-semibold text-sky-300">
                Coach
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-10">
        <section className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300/70">Connect & Excel</p>
            <h1 className="mt-2 text-6xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Elevate Your
              <br />
              <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">
                Academic
              </span>
              <br />
              <span className="text-violet-300">Journey.</span>
            </h1>
          </div>

          <div className="flex w-full max-w-md gap-3">
            <button
              onClick={() => {
                setShowFindCoach((prev) => !prev)
                setShowBecomeCoach(false)
              }}
              className="flex-1 rounded-2xl bg-gradient-to-r from-sky-300 to-cyan-400 px-5 py-6 text-lg font-semibold text-slate-950 shadow-[0_10px_24px_rgba(56,189,248,0.35)]"
            >
              Find a Coach
            </button>
            <button
              onClick={() => {
                setShowBecomeCoach((prev) => !prev)
                setShowFindCoach(false)
              }}
              className="flex-1 rounded-2xl bg-white/10 px-5 py-6 text-lg font-semibold text-white/90 hover:bg-white/15"
            >
              Become a Coach
            </button>
          </div>
        </section>

        {showFindCoach ? (
          <section className="mt-8 rounded-2xl border border-sky-300/30 bg-[#111722] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-3xl font-semibold tracking-tight text-white">Find a Coach</h2>
              <button
                onClick={() => {
                  setTopicFilter('All Topics')
                  setVenueFilter('All Venues')
                  setCoachFilter('All Coaches')
                }}
                className="text-sm font-semibold text-sky-300 hover:text-sky-200"
              >
                Reset Filters
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <label className="rounded-xl bg-white/5 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Topic</p>
                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#0B111A] px-3 py-2 text-sm text-white outline-none focus:border-sky-300/50"
                >
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </label>

              <label className="rounded-xl bg-white/5 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Venue</p>
                <select
                  value={venueFilter}
                  onChange={(e) => setVenueFilter(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#0B111A] px-3 py-2 text-sm text-white outline-none focus:border-sky-300/50"
                >
                  {venues.map((venue) => (
                    <option key={venue} value={venue}>
                      {venue}
                    </option>
                  ))}
                </select>
              </label>

              <label className="rounded-xl bg-white/5 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Coach</p>
                <select
                  value={coachFilter}
                  onChange={(e) => setCoachFilter(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#0B111A] px-3 py-2 text-sm text-white outline-none focus:border-sky-300/50"
                >
                  {coaches.map((coach) => (
                    <option key={coach} value={coach}>
                      {coach}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <p className="mt-4 text-sm text-white/55">
              Showing <span className="font-semibold text-white/85">{filteredSessions.length}</span> matching sessions
            </p>
          </section>
        ) : null}

        {showBecomeCoach ? (
          <section className="mt-8 rounded-2xl border border-violet-300/30 bg-[#111722] p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-3xl font-semibold tracking-tight text-white">Become a Coach</h2>
              <button
                onClick={() => {
                  setTopicName('')
                  setCoachName('')
                  setExperience('')
                  setTime('')
                  setVenue('')
                }}
                className="text-sm font-semibold text-sky-300 hover:text-sky-200"
              >
                Clear Form
              </button>
            </div>

            <form className="grid gap-3 md:grid-cols-2">
              <label className="rounded-xl bg-white/5 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Topic name</p>
                <input
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="e.g. Data Structures"
                  className="w-full rounded-lg border border-white/10 bg-[#0B111A] px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-sky-300/50"
                />
              </label>

              <label className="rounded-xl bg-white/5 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Coach name</p>
                <input
                  value={coachName}
                  onChange={(e) => setCoachName(e.target.value)}
                  placeholder="e.g. Alex Johnson"
                  className="w-full rounded-lg border border-white/10 bg-[#0B111A] px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-sky-300/50"
                />
              </label>

              <label className="rounded-xl bg-white/5 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Experience</p>
                <input
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 4 years in Frontend"
                  className="w-full rounded-lg border border-white/10 bg-[#0B111A] px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-sky-300/50"
                />
              </label>

              <label className="rounded-xl bg-white/5 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Time</p>
                <input
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="e.g. Wed, 5:30 PM"
                  className="w-full rounded-lg border border-white/10 bg-[#0B111A] px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-sky-300/50"
                />
              </label>

              <label className="rounded-xl bg-white/5 p-3 md:col-span-2">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Venue</p>
                <input
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Seminar Hall B"
                  className="w-full rounded-lg border border-white/10 bg-[#0B111A] px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-sky-300/50"
                />
              </label>
            </form>
          </section>
        ) : null}

        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-5xl font-semibold tracking-tight">Peer Coaching Sessions</h2>
              <p className="mt-1 text-xl text-white/50">Live knowledge sharing from fellow students</p>
            </div>
            <button className="hidden text-lg font-semibold text-sky-300 hover:text-sky-200 md:block">
              View All Sessions
            </button>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {filteredSessions.map((session) => (
              <SessionCard key={session.title} {...session} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
