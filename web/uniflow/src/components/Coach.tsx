import type { FormEvent } from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

type CoachCardProps = {
  coach_name: string
  topic_name: string
  topic_description: string
  experience: string
  venue: string
  certificate?: string | null
  schedule_time?: string | null
  submitted_at?: string | null
  onViewCertificate?: () => void
}

function CoachCard({
  coach_name,
  topic_name,
  topic_description,
  experience,
  venue,
  certificate,
  schedule_time,
  submitted_at,
  onViewCertificate,
}: CoachCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#121821]/85 p-5 shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-sky-200">
          {topic_name}
        </span>
        <span className="text-white/45">⚡</span>
      </div>

      <h3 className="text-3xl font-semibold tracking-tight text-white">{coach_name}</h3>
      <div className="mt-3 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-cyan-300/25 text-sm">👤</div>
        <div>
          <p className="text-sm font-semibold text-white/85">{experience}</p>
          <p className="text-xs text-white/45">{venue}</p>
        </div>
      </div>

      <p className="mt-4 text-base leading-relaxed text-white/70">{topic_description}</p>
      <div className="mt-5 border-t border-white/10 pt-4">
        {schedule_time ? (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">Schedule</p>
            <p className="mt-2 text-xl font-semibold text-white/90">{schedule_time}</p>
          </>
        ) : null}
        {submitted_at ? (
          <p className="text-xs text-white/45 mt-1">Submitted: {new Date(submitted_at).toLocaleString()}</p>
        ) : null}
        {certificate && onViewCertificate ? (
          <button
            onClick={onViewCertificate}
            className="mt-3 px-3 py-1 bg-sky-300/20 text-sky-200 rounded text-sm hover:bg-sky-300/30 transition"
          >
            View Certificate
          </button>
        ) : null}
      </div>
    </article>
  )
}

export default function Coach() {
  const [showBecomeCoach, setShowBecomeCoach] = useState(false)
  const [topicName, setTopicName] = useState('')
  const [topicDescription, setTopicDescription] = useState('')
  const [coachName, setCoachName] = useState('')
  const [experience, setExperience] = useState('')
  const [time, setTime] = useState('')
  const [venue, setVenue] = useState('')
  const [certificate, setCertificate] = useState<File | null>(null)
  const [coaches, setCoaches] = useState<any[]>([])

  useEffect(() => {
    fetchCoaches()
  }, [])

  const fetchCoaches = async () => {
    const { data, error } = await supabase.from('coaches').select('*')
    if (error) console.error('Error fetching coaches:', error)
    else setCoaches(data || [])
  }

  const getBucketPath = (certificate?: string | null) => {
    if (!certificate) return ''
    if (certificate.startsWith('http')) {
      try {
        const url = new URL(certificate)
        const rawPath = url.pathname.replace(/^\/storage\/v1\/object\/public\/certificates\//, '')
        return decodeURIComponent(rawPath)
      } catch {
        return decodeURIComponent(certificate.split('/').pop() || '')
      }
    }
    return certificate
  }

  const handleViewCertificate = async (certificate?: string | null) => {
    const path = getBucketPath(certificate)
    if (!path) return

    const { data, error } = await supabase.storage.from('certificates').createSignedUrl(path, 60)
    if (error) {
      console.error('Error creating signed URL:', error)
      const publicUrl = supabase.storage.from('certificates').getPublicUrl(path).data.publicUrl
      if (publicUrl) {
        window.open(publicUrl, '_blank')
      }
      return
    }

    if (data?.signedUrl) {
      window.open(data.signedUrl, '_blank')
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    let certificatePath: string | null = null

    if (certificate) {
      const safeFileName = `${Date.now()}-${certificate.name}`.replace(/\s+/g, '-')
      const { error: uploadError } = await supabase.storage.from('certificates').upload(safeFileName, certificate)

      if (uploadError) {
        console.error('Error uploading certificate:', uploadError)
        return
      }

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

    if (error) {
      console.error('Error inserting coach:', error)
    } else {
      setTopicName('')
      setTopicDescription('')
      setCoachName('')
      setExperience('')
      setTime('')
      setVenue('')
      setCertificate(null)
      fetchCoaches()
    }
  }

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
              onClick={() => setShowBecomeCoach((prev) => !prev)}
              className="flex-1 rounded-2xl bg-gradient-to-r from-sky-300 to-cyan-400 px-5 py-6 text-lg font-semibold text-slate-950 shadow-[0_10px_24px_rgba(56,189,248,0.35)]"
            >
              Become a Coach
            </button>
          </div>
        </section>

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
                  setCertificate(null)
                }}
                className="text-sm font-semibold text-sky-300 hover:text-sky-200"
              >
                Clear Form
              </button>
            </div>

            <form className="grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
              <label className="rounded-xl bg-white/5 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Topic name</p>
                <input
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="e.g. Data Structures"
                  className="w-full rounded-lg border border-white/10 bg-[#0B111A] px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-sky-300/50"
                />
              </label>

              <label className="rounded-xl bg-white/5 p-3 md:col-span-2">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                  Topic description
                </p>
                <textarea
                  value={topicDescription}
                  onChange={(e) => setTopicDescription(e.target.value)}
                  placeholder="Briefly describe what students will learn in this coaching session."
                  rows={3}
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
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Certificate (Image) - Optional</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCertificate(e.target.files?.[0] || null)}
                  className="w-full rounded-lg border border-white/10 bg-[#0B111A] px-3 py-2 text-sm text-white outline-none focus:border-sky-300/50"
                />
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-sky-300 to-cyan-400 py-3 text-base font-semibold text-slate-950 shadow-[0_10px_24px_rgba(56,189,248,0.25)] hover:brightness-105"
                >
                  Submit
                </button>
              </div>
            </form>
          </section>
        ) : null}

        <section className="mt-12">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-5xl font-semibold tracking-tight">Available Coaches</h2>
              <p className="mt-1 text-xl text-white/50">Coaches who have submitted their profiles</p>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {coaches.map((coach) => (
              <CoachCard
                key={coach.id}
                {...coach}
                onViewCertificate={() => handleViewCertificate(coach.certificate)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
