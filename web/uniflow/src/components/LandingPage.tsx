
import { useNavigate } from 'react-router-dom';

type StatPillProps = {
  title: string
  description: string
}

function StatPill({ title, description }: StatPillProps) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
      <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-violet-500/60 to-sky-400/60 ring-1 ring-white/10" />
      <div className="leading-tight">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-xs text-white/60">{description}</div>
      </div>
    </div>
  )
}

type MetricProps = {
  value: string
  label: string
}

function Metric({ value, label }: MetricProps) {
  return (
    <div className="text-center">
      <div className="text-3xl font-semibold tracking-tight text-white">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
        {label}
      </div>
    </div>
  )
}

type FeatureCardProps = {
  title: string
  description: string
  tone?: 'slate' | 'violet'
  cta1?: string
  cta2?: string
}

function FeatureCard({
  title,
  description,
  tone = 'slate',
  cta1,
  cta2,
}: FeatureCardProps) {
  const toneClass =
    tone === 'violet'
      ? 'bg-gradient-to-br from-violet-500/20 to-sky-400/10'
      : 'bg-white/5'

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 p-6 ${toneClass}`}
    >
      <div className="absolute right-4 top-4 h-12 w-12 rounded-2xl bg-white/5 ring-1 ring-white/10" />
      <div className="text-sm font-semibold text-white/80">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/55">{description}</div>
      {(cta1 || cta2) && (
        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-white/70">
          {cta1 ? (
            <button className="rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/10 hover:bg-white/15">
              {cta1}
            </button>
          ) : null}
          {cta2 ? (
            <button className="rounded-full bg-white/5 px-3 py-1.5 ring-1 ring-white/10 hover:bg-white/10">
              {cta2}
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate();
  const onGetStarted = () => navigate('/dashboard');

  return (
    <div className="min-h-dvh bg-[#070A10] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_30%_20%,rgba(96,165,250,0.18),transparent_60%),radial-gradient(900px_700px_at_75%_30%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(900px_700px_at_45%_85%,rgba(34,197,94,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <div className="h-4 w-4 rounded-sm bg-gradient-to-br from-sky-400 to-violet-500" />
          </div>
          <span className="text-sm font-semibold tracking-wide text-white/90">UniFlow</span>
        </div>

        <button
          onClick={onGetStarted}
          className="rounded-full bg-sky-300/90 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm shadow-sky-500/20 ring-1 ring-white/10 hover:bg-sky-300"
        >
          Join Now
        </button>
      </header>

      <main className="mx-auto w-full max-w-6xl px-5">
        <section className="pt-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90" />
            The platform is electric
          </div>

          <h1 className="mx-auto mt-7 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            <span className="text-white">The Pulse of Your</span>{' '}
            <span className="bg-gradient-to-r from-sky-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Campus
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/55 sm:text-base">
            A unified ecosystem designed for the modern student. Exchange, connect,
            and excel with the only platform that speaks your language.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onGetStarted}
              className="rounded-full bg-sky-300/90 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm shadow-sky-500/20 ring-1 ring-white/10 hover:bg-sky-300"
            >
              Get Started
            </button>
            <button className="rounded-full bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 ring-1 ring-white/10 hover:bg-white/10">
              Learn More
            </button>
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-3">
            <StatPill title="Real-time Sync" description="Updates instantly across devices" />
            <StatPill title="Verified Students" description="Trusted campus community" />
            <StatPill title="Secure Trade" description="Safe exchange built-in" />
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur">
            <Metric value="10k+" label="Active Students" />
            <Metric value="50+" label="Top Colleges" />
            <Metric value="500+" label="Live Events" />
          </div>
        </section>

        <section className="mt-20">
          <div className="text-left">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
              Unified ecosystem
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One Platform.
              <br />
              Infinite Possibilities.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <FeatureCard
              title="Campus Marketplace"
              description="Buy, sell, and swap essentials in a trusted student-only marketplace."
              tone="slate"
              cta1="List your books"
              cta2="Start saving"
            />
            <FeatureCard
              title="Event Portal"
              description="Discover clubs, meetups, fests, and talks. Stay in the loop with what’s happening."
              tone="violet"
              cta1="Browse events"
              cta2="Create an event"
            />

            <div className="grid gap-5 lg:col-span-2 lg:grid-cols-3">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 lg:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-white/5 ring-1 ring-white/10" />
                  <div>
                    <div className="text-sm font-semibold text-white/80">Verified Mentorship</div>
                    <div className="text-xs text-white/55">
                      Learn from seniors with structured guidance.
                    </div>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10" />
                  <div className="h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10" />
                  <div className="h-16 rounded-xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10" />
                </div>
                <button className="mt-5 rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-white/75 ring-1 ring-white/10 hover:bg-white/10">
                  Find your mentor →
                </button>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-semibold text-white/80">Private Rooms</div>
                <div className="mt-2 text-sm leading-relaxed text-white/55">
                  Create focused groups for projects, classes, and clubs.
                </div>
                <div className="mt-5 h-24 rounded-xl bg-gradient-to-br from-violet-500/20 to-sky-400/10 ring-1 ring-white/10" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 pb-16">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-14 text-center backdrop-blur sm:px-10">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-white/40">
              Ready to start?
            </div>
            <h3 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Join the Electric{' '}
              <span className="bg-gradient-to-r from-sky-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Pulse.
              </span>
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/55">
              Be part of the ecosystem that’s redefining the student experience.
              Sign up today and get access in minutes.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onGetStarted}
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 ring-1 ring-white/10 hover:bg-white/90"
              >
                Sign Up Now
              </button>
              <button className="rounded-full bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/80 ring-1 ring-white/10 hover:bg-white/10">
                View all features
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pb-10 text-xs text-white/40">
        <div>UniFlow</div>
        <div className="flex items-center gap-5">
          <button className="hover:text-white/70">Home</button>
          <button className="hover:text-white/70">Support</button>
          <button className="hover:text-white/70">Privacy</button>
        </div>
      </footer>
    </div>
  )
}

