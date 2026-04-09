import { useMemo, useState } from 'react'

interface Session {
    tag: string
    title: string
    mentor: string
    role: string
    description: string
    schedule: string
    venue: string
}

const sessions: Session[] = [
    { tag: 'Tech', title: 'Web Development Basics', mentor: 'Alex Chen', role: 'Senior Developer', description: 'Learn the fundamentals of building modern web applications with React and Node.js.', schedule: 'Mon, 3:00 PM', venue: 'Room 301' },
    { tag: 'Design', title: 'UI/UX Fundamentals', mentor: 'Sarah Kim', role: 'Product Designer', description: 'Master the principles of user-centered design and create intuitive interfaces.', schedule: 'Tue, 2:00 PM', venue: 'Design Lab' },
    { tag: 'Tech', title: 'Data Structures', mentor: 'Mike Johnson', role: 'ML Engineer', description: 'Deep dive into essential data structures and algorithms for coding interviews.', schedule: 'Wed, 4:00 PM', venue: 'Room 205' },
    { tag: 'Business', title: 'Startup 101', mentor: 'Emma Davis', role: 'Founder', description: 'Learn how to validate your startup ideas and build a minimum viable product.', schedule: 'Thu, 5:00 PM', venue: 'Innovation Hub' },
    { tag: 'Design', title: 'Brand Identity', mentor: 'Lisa Wang', role: 'Creative Director', description: 'Create a memorable brand identity from logo design to color psychology.', schedule: 'Fri, 1:00 PM', venue: 'Studio B' },
]

function SessionCard({ tag, title, mentor, role, description, schedule, venue }: Session) {
    return (
        <article className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0E121B] shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(56,189,248,0.1)]">
            <div className="flex-1 space-y-4 p-6">
                <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-400">
                        {tag}
                    </span>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-white/90">{schedule}</p>
                        <p className="text-xs text-white/50">{venue}</p>
                    </div>
                </div>

                <div>
                    <h3 className="line-clamp-2 text-2xl font-semibold leading-tight text-white">{title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-white/65">{description}</p>
                </div>

                <div className="flex items-center gap-3 pt-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-sky-400 font-bold text-slate-900 shadow-md">
                        {mentor.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white/90">{mentor}</p>
                        <p className="text-xs text-white/55">{role}</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/5 bg-white/5 p-4">
                <button className="w-full rounded-xl bg-sky-300/90 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-sky-300">
                    Book Session
                </button>
            </div>
        </article>
    )
}

interface Props {
    onBack?: () => void
    onNavigate?: (page: string) => void
}

export default function Coach({ onNavigate }: Props) {
    const [showFindCoach, setShowFindCoach] = useState(false)
    const [showBecomeCoach, setShowBecomeCoach] = useState(false)
    const [topicFilter, setTopicFilter] = useState('All Topics')
    const [venueFilter, setVenueFilter] = useState('All Venues')
    const [coachFilter, setCoachFilter] = useState('All Coaches')
    const [topicName, setTopicName] = useState('')
    const [topicDescription, setTopicDescription] = useState('')
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
                            <button onClick={() => onNavigate?.('dashboard')} className="text-sm text-white/70 hover:text-white">
                                Dashboard
                            </button>
                            <button onClick={() => onNavigate?.('marketplace')} className="text-sm text-white/70 hover:text-white">
                                Marketplace
                            </button>
                            <button onClick={() => onNavigate?.('events')} className="text-sm text-white/70 hover:text-white">
                                Events
                            </button>
                            <button className="border-b-2 border-sky-300 pb-1 text-sm font-semibold text-sky-300">
                                Coach
                            </button>
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
                                    setTopicDescription('')
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

                            <label className="rounded-xl bg-white/5 p-3 md:col-span-2">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Topic Description</p>
                                <textarea
                                    value={topicDescription}
                                    onChange={(e) => setTopicDescription(e.target.value)}
                                    placeholder="Briefly describe what you'll cover in this session..."
                                    rows={3}
                                    className="w-full resize-none rounded-lg border border-white/10 bg-[#0B111A] px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-sky-300/50"
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
