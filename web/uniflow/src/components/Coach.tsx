import type { FormEvent } from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import TopNavActions from './TopNavActions'
import AISearchBar from './AISearchBar'

type SessionCardProps = {
  id: string
  tag: string
  title: string
  mentor: string
  role: string
  description: string
  schedule: string
  venue: string
  rating: number
  isApplied?: boolean
  onApply?: () => void
  showFindExtras?: boolean
  onOpenChat?: () => void
}

function SessionCard({
  tag,
  title,
  mentor,
  role,
  description,
  schedule,
  rating,
  isApplied = false,
  onApply,
  showFindExtras = false,
  onOpenChat,
}: SessionCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#121821]/85 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.35)] transition-all hover:scale-[1.01]">
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
      
      {showFindExtras ? (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
          <div className="flex items-center gap-1 text-amber-300">
            {Array.from({ length: 5 }).map((_, idx) => (
              <span key={`${title}-star-${idx}`}>{idx < Math.round(rating) ? '★' : '☆'}</span>
            ))}
            <span className="ml-2 text-sm font-semibold text-white/75">{rating.toFixed(1)}/5</span>
          </div>
          <button
            onClick={onOpenChat}
            className="rounded-md bg-sky-300/20 px-3 py-1 text-xs font-semibold text-sky-200 hover:bg-sky-300/30 transition-colors"
          >
            Chat
          </button>
        </div>
      ) : null}

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">When & Where</p>
        <p className="mt-2 text-xl font-semibold text-white/90">{schedule} @ {tag}</p>
      </div>

      <button
        onClick={onApply}
        disabled={isApplied}
        className={`mt-5 w-full rounded-xl py-4 text-lg font-bold uppercase tracking-widest transition shadow-lg ${
          isApplied
            ? 'cursor-default bg-emerald-500/25 text-emerald-200 shadow-none'
            : 'bg-white/10 text-white/90 hover:bg-sky-400/20 hover:text-sky-300 hover:border-sky-300/50 border border-transparent'
        }`}
      >
        {isApplied ? 'Application Sent' : 'Apply for Session'}
      </button>
    </article>
  )
}

export default function Coach() {
  const [showFindCoach, setShowFindCoach] = useState(false)
  const [showBecomeCoach, setShowBecomeCoach] = useState(false)
  
  // Filtering States
  const [topicFilter, setTopicFilter] = useState('All Topics')
  const [venueFilter, setVenueFilter] = useState('All Venues')
  const [coachFilter, setCoachFilter] = useState('All Coaches')
  
  // Become a Coach States
  const [topicName, setTopicName] = useState('')
  const [topicDescription, setTopicDescription] = useState('')
  const [coachName, setCoachName] = useState('')
  const [experience, setExperience] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState('')
  const [certificate, setCertificate] = useState<File | null>(null)
  
  // Data States
  const [coaches, setCoaches] = useState<any[]>([])
  const [appliedSessionIds, setAppliedSessionIds] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Chat States
  const [chatOpen, setChatOpen] = useState(false)
  const [chatSessionTitle, setChatSessionTitle] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<string[]>([])

  useEffect(() => {
    fetchCoaches()
  }, [])

  const fetchCoaches = async () => {
    const { data, error } = await supabase
      .from('coaches')
      .select('*')
      .order('submitted_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching coaches:', error)
    } else {
      // Map DB data to include required fields like rating if missing
      const processed = (data || []).map((item: any) => ({
        ...item,
        rating: item.rating || 4.5 + Math.random() * 0.5, // Default rating for now
        tag: item.topic_name?.toUpperCase() || 'GENERAL',
        title: item.topic_name,
        mentor: item.coach_name,
        role: item.experience || 'Student Peer',
        description: item.topic_description,
        schedule: item.schedule_time || 'TBD',
      }))
      setCoaches(processed)
    }
  }

  // Filter Options derived from dynamic data
  const topics = useMemo(() => ['All Topics', ...new Set(coaches.map((s) => s.tag))], [coaches])
  const venues = useMemo(() => ['All Venues', ...new Set(coaches.map((s) => s.venue))], [coaches])
  const mentors = useMemo(() => ['All Coaches', ...new Set(coaches.map((s) => s.mentor))], [coaches])

  const filteredSessions = useMemo(() => {
    return coaches.filter((session) => {
      const topicMatch = topicFilter === 'All Topics' || session.tag === topicFilter
      const venueMatch = venueFilter === 'All Venues' || session.venue === venueFilter
      const coachMatch = coachFilter === 'All Coaches' || session.mentor === coachFilter
      return topicMatch && venueMatch && coachMatch
    })
  }, [coaches, topicFilter, venueFilter, coachFilter])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    let certificatePath: string | null = null

    try {
      if (certificate) {
        const safeFileName = `${Date.now()}-${certificate.name}`.replace(/\s+/g, '-')
        const { error: uploadError } = await supabase.storage.from('certificates').upload(safeFileName, certificate)
        if (uploadError) throw uploadError
        certificatePath = safeFileName
      }

      const { error } = await supabase.from('coaches').insert({
        coach_name: coachName,
        topic_name: topicName,
        topic_description: topicDescription,
        experience,
        venue,
        certificate: certificatePath,
        schedule_time: time,
      })

      if (error) throw error

      setTopicName(''); setTopicDescription(''); setCoachName(''); setExperience(''); setTime(''); setVenue(''); setCertificate(null);
      await fetchCoaches()
      setShowBecomeCoach(false)
      alert('Connection established. Your mentor node is now live!')
    } catch (err: any) {
      console.error('Submission error:', err)
      alert(`Backend Sync Failed: ${err.message || 'Check your internet connection'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleApply = async (sessionId: string) => {
    // In a real app, this would record to an 'applications' table
    setAppliedSessionIds(prev => [...prev, sessionId])
    // Simulate backend delay
    setTimeout(() => {
      console.log(`Applied for session ${sessionId}`)
    }, 500)
  }

  return (
    <div className="min-h-dvh bg-[#06090F] text-white">
      <header className="border-b border-white/10 bg-[#0D1119]/90">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="text-4xl font-black italic tracking-tight text-sky-300">UniFlow</div>
            <nav className="hidden items-center gap-6 md:flex">
              <Link to="/dashboard" className="text-sm text-white/70 hover:text-white transition-colors">Dashboard</Link>
              <Link to="/marketplace" className="text-sm text-white/70 hover:text-white transition-colors">Marketplace</Link>
              <Link to="/events" className="text-sm text-white/70 hover:text-white transition-colors">Events</Link>
              <Link to="/coach" className="border-b-2 border-sky-300 pb-1 text-sm font-semibold text-sky-300">Coach</Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-72">
              <AISearchBar placeholder="Search coaching network..." />
            </div>
            <TopNavActions />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 py-10">
        <section className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300/70">Connect & Excel</p>
            <h1 className="mt-2 text-6xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Elevate Your<br />
              <span className="bg-gradient-to-r from-sky-300 to-violet-400 bg-clip-text text-transparent">Academic</span><br />
              <span className="text-violet-300">Journey.</span>
            </h1>
          </div>

          <div className="flex w-full max-w-md gap-3">
            <button
              onClick={() => { setShowFindCoach(prev => !prev); setShowBecomeCoach(false); }}
              className={`flex-1 rounded-2xl px-5 py-6 text-lg font-semibold transition-all ${showFindCoach ? 'bg-sky-400 text-slate-900 shadow-[0_0_30px_rgba(56,189,248,0.4)]' : 'bg-gradient-to-r from-sky-300 to-cyan-400 text-slate-950 shadow-lg'}`}
            >
              Find a Coach
            </button>
            <button
              onClick={() => { setShowBecomeCoach(prev => !prev); setShowFindCoach(false); }}
              className={`flex-1 rounded-2xl px-5 py-6 text-lg font-semibold transition-all ${showBecomeCoach ? 'bg-violet-500 text-white' : 'bg-white/10 text-white/90 hover:bg-white/15'}`}
            >
              Become a Coach
            </button>
          </div>
        </section>

        {/* --- FIND A COACH SECTION (Filtration) --- */}
        {showFindCoach ? (
          <section className="mt-8 rounded-2xl border border-sky-300/30 bg-[#111722] p-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-3xl font-semibold tracking-tight text-white italic">Curation Engine</h2>
              <button
                onClick={() => { setTopicFilter('All Topics'); setVenueFilter('All Venues'); setCoachFilter('All Coaches'); }}
                className="text-xs font-black uppercase tracking-widest text-sky-300 hover:text-sky-200"
              >
                Reset Filters
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="rounded-xl bg-white/5 p-4 border border-white/5 transition-colors focus-within:border-sky-300/30">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/40">Topic Category</p>
                <select
                  value={topicFilter}
                  onChange={(e) => setTopicFilter(e.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none cursor-pointer"
                >
                  {topics.map((topic) => <option key={topic} value={topic} className="bg-[#0B111A]">{topic}</option>)}
                </select>
              </label>

              <label className="rounded-xl bg-white/5 p-4 border border-white/5 focus-within:border-sky-300/30">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/40">Active Venue</p>
                <select
                  value={venueFilter}
                  onChange={(e) => setVenueFilter(e.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none cursor-pointer"
                >
                  {venues.map((v) => <option key={v} value={v} className="bg-[#0B111A]">{v}</option>)}
                </select>
              </label>

              <label className="rounded-xl bg-white/5 p-4 border border-white/5 focus-within:border-sky-300/30">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/40">Mentor Profile</p>
                <select
                  value={coachFilter}
                  onChange={(e) => setCoachFilter(e.target.value)}
                  className="w-full bg-transparent text-sm text-white outline-none cursor-pointer"
                >
                  {mentors.map((m) => <option key={m} value={m} className="bg-[#0B111A]">{m}</option>)}
                </select>
              </label>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-white/40 font-bold uppercase tracking-widest">
                Nodes matching filter: <span className="text-sky-300">{filteredSessions.length}</span>
              </p>
            </div>
          </section>
        ) : null}

        {/* --- BECOME A COACH SECTION --- */}
        {showBecomeCoach ? (
          <section className="mt-8 rounded-2xl border border-violet-300/30 bg-[#111722] p-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">Onboard as Mentor</h2>
              <button
                onClick={() => { setTopicName(''); setTopicDescription(''); setCoachName(''); setExperience(''); setTime(''); setVenue(''); setCertificate(null); }}
                className="text-xs font-bold text-sky-300 hover:text-sky-200"
              >
                Reset Application
              </button>
            </div>

            <form className="grid gap-6 md:grid-cols-2" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <label className="block rounded-2xl bg-white/5 p-4 border border-white/5 focus-within:border-sky-300/30 transition-all">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-sky-200">Session Identity</p>
                  <input
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                    placeholder="e.g. Advanced Calculus Coaching"
                    required
                    className="w-full bg-transparent text-base text-white placeholder:text-white/10 outline-none"
                  />
                </label>

                <label className="block rounded-2xl bg-white/5 p-4 border border-white/5 focus-within:border-sky-300/30 transition-all">
                  <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-sky-200">Internal Description</p>
                  <textarea
                    value={topicDescription}
                    onChange={(e) => setTopicDescription(e.target.value)}
                    placeholder="Describe the session objectives and target audience..."
                    rows={4}
                    required
                    className="w-full bg-transparent text-base text-white placeholder:text-white/10 outline-none resize-none"
                  />
                </label>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <label className="block rounded-2xl bg-white/5 p-4 border border-white/5 focus-within:border-sky-300/30 transition-all">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-sky-200">Mentor Alias</p>
                    <input
                      value={coachName}
                      onChange={(e) => setCoachName(e.target.value)}
                      placeholder="Your Full Name"
                      required
                      className="w-full bg-transparent text-base text-white placeholder:text-white/10 outline-none"
                    />
                  </label>
                  <label className="block rounded-2xl bg-white/5 p-4 border border-white/5 focus-within:border-sky-300/30 transition-all">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-sky-200">Credentialing</p>
                    <input
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. 3rd Year CS"
                      required
                      className="w-full bg-transparent text-base text-white placeholder:text-white/10 outline-none"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <label className="block rounded-2xl bg-white/5 p-4 border border-white/5 focus-within:border-sky-300/30 transition-all">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-sky-200">Frequency / Time</p>
                    <input
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="Wednesdays, 5 PM"
                      required
                      className="w-full bg-transparent text-base text-white placeholder:text-white/10 outline-none"
                    />
                  </label>
                  <label className="block rounded-2xl bg-white/5 p-4 border border-white/5 focus-within:border-sky-300/30 transition-all">
                    <p className="mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-sky-200">Geo Code / Venue</p>
                    <input
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="Old Library Hub"
                      required
                      className="w-full bg-transparent text-base text-white placeholder:text-white/10 outline-none"
                    />
                  </label>
                </div>

                <div className="rounded-2xl bg-white/5 p-4 border border-white/5 flex flex-col justify-center">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 text-sky-200">Academic Verification (PDF/IMG)</p>
                  <input
                    type="file"
                    onChange={(e) => setCertificate(e.target.files?.[0] || null)}
                    className="w-full text-xs text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:bg-sky-400 file:text-slate-950 hover:file:bg-sky-300 cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`mt-4 md:col-span-2 rounded-2xl h-16 text-sm font-black uppercase tracking-[0.3em] shadow-[0_10px_40px_rgba(56,189,248,0.25)] transition-all active:scale-[0.98] ${isSubmitting ? 'bg-sky-900 text-white/40 cursor-wait' : 'bg-sky-400 text-slate-950 hover:bg-sky-300'}`}
              >
                {isSubmitting ? 'Transmitting Data...' : 'Transmit Mentor Application'}
              </button>
            </form>
          </section>
        ) : null}

        {/* --- SESSIONS GRID --- */}
        <section className="mt-16">
          <div className="mb-10 flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-5xl font-black tracking-tighter uppercase italic">Nodes <span className="text-sky-300">Available</span></h2>
              <p className="mt-2 text-lg text-white/40 font-medium">Real-time peer knowledge matrix</p>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-sky-300 hidden md:block">Active Stream</p>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session) => (
                <SessionCard
                  key={session.id || session.title}
                  {...session}
                  isApplied={appliedSessionIds.includes(session.id)}
                  showFindExtras={showFindCoach}
                  onOpenChat={() => {
                    setChatSessionTitle(session.title)
                    setChatMessages([`System: Synchronizing with ${session.mentor}...`, `System: Connection established. Ask anything about "${session.title}".`])
                    setChatInput(''); setChatOpen(true);
                  }}
                  onApply={() => handleApply(session.id)}
                />
              ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] p-20 text-center">
                   <div className="h-12 w-12 rounded-full border-2 border-white/10 flex items-center justify-center text-white/20 mb-4 font-mono">?</div>
                   <p className="text-white/40 font-bold uppercase tracking-widest">No matching session nodes found</p>
                   <button onClick={() => { setTopicFilter('All Topics'); setVenueFilter('All Venues'); setCoachFilter('All Coaches'); }} className="mt-4 text-sky-300 text-xs font-bold hover:underline">Clear Filters</button>
                </div>
            )}
          </div>
        </section>

        {/* --- CHAT DRAWER --- */}
        {chatOpen ? (
          <div className="fixed bottom-6 right-6 z-50 w-[340px] rounded-3xl border border-sky-300/30 bg-[#0F1622] shadow-[0_30px_60px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom-8 duration-300">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 bg-white/[0.02]">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-sky-300">Direct Link</p>
                <p className="text-sm font-bold text-white leading-tight mt-1">{chatSessionTitle}</p>
              </div>
              <button 
                onClick={() => setChatOpen(false)} 
                className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="h-64 space-y-3 overflow-y-auto px-6 py-5 text-sm scrollbar-hide">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={`${idx}`} 
                  className={`rounded-2xl px-4 py-3 ${msg.startsWith('System:') ? 'text-sky-300/60 italic text-[10px]' : msg.startsWith('You:') ? 'bg-sky-400/10 text-white ml-6' : 'bg-white/5 text-white/80 mr-6'}`}
                >
                  {msg}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-white/10 p-4">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && chatInput.trim()) {
                    setChatMessages(prev => [...prev, `You: ${chatInput}`, `System: Routing message to ${chatSessionTitle.split(' ')[0]}...`]);
                    setChatInput('');
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border border-white/10 bg-[#0B111A] px-4 py-3 text-sm text-white placeholder:text-white/20 outline-none focus:border-sky-300/40"
              />
              <button
                onClick={() => {
                  if (!chatInput.trim()) return;
                  setChatMessages(prev => [...prev, `You: ${chatInput}`, `System: Routing message to ${chatSessionTitle.split(' ')[0]}...`]);
                  setChatInput('');
                }}
                className="h-12 w-12 rounded-xl bg-sky-300 flex items-center justify-center text-slate-950 shadow-lg shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  )
}
