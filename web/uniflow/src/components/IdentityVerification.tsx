type VerificationStepProps = {
  step: string
  title: string
  active?: boolean
}

function VerificationStep({ step, title, active = false }: VerificationStepProps) {
  return (
    <button
      className={`flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left ${
        active
          ? 'border-cyan-300/30 bg-white/5'
          : 'border-white/5 bg-[#0A0E15] text-white/50 hover:border-white/10'
      }`}
    >
      <div
        className={`grid h-10 w-10 place-items-center rounded-full text-sm ${
          active ? 'bg-cyan-300/20 text-cyan-200' : 'bg-white/5 text-white/40'
        }`}
      >
        ✦
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">{step}</div>
        <div className="text-2xl font-semibold text-white/90">{title}</div>
      </div>
    </button>
  )
}

function CodeBox({ value }: { value: string }) {
  return (
    <div className="grid h-14 w-14 place-items-center rounded-xl border border-white/5 bg-[#131A23] text-5xl font-semibold text-cyan-300/90">
      {value}
    </div>
  )
}

export default function IdentityVerification() {
  return (
    <div className="min-h-dvh bg-[#06090F] text-white">
      <header className="border-b border-white/5 bg-[#0B1019]/90">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="text-4xl font-black italic tracking-tight text-sky-300">UniFlow</div>
            <nav className="hidden items-center gap-6 md:flex">
              <button className="text-sm text-white/70 hover:text-white">Dashboard</button>
              <button className="text-sm text-white/70 hover:text-white">Marketplace</button>
              <button className="text-sm text-white/70 hover:text-white">Events</button>
              <button className="border-b-2 border-sky-300 pb-1 text-sm font-semibold text-sky-300">
                Verification
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-full bg-white/5 p-2 text-white/75">🔔</button>
            <button className="rounded-full bg-white/5 p-2 text-white/75">⚙</button>
            <button className="rounded-full bg-cyan-200/90 p-2 text-slate-900">👤</button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1400px] gap-6 px-6 py-10 lg:grid-cols-[420px_minmax(0,1fr)]">
        <section className="space-y-6">
          <div>
            <h1 className="text-6xl font-semibold tracking-tight">Identity Verification</h1>
            <p className="mt-2 max-w-md text-2xl leading-relaxed text-white/60">
              Secure your student status to unlock exclusive campus marketplace access and
              premium event perks.
            </p>
          </div>

          <VerificationStep step="Step 1" title="Email Authentication" active />
          <VerificationStep step="Step 2" title="Document Review" />

          <div className="pt-40">
            <div className="rounded-xl border border-orange-300/15 bg-[#10141D] p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-orange-300">🔒</div>
                <p className="text-sm leading-relaxed text-white/65">
                  Your data is encrypted with AES-256 standards. We only use your ID to verify
                  student status and never share it with third parties.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative rounded-2xl border border-white/10 bg-[#141A1E] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="absolute left-0 top-0 h-1 w-1/3 rounded-tl-2xl bg-cyan-300/80" />

          <div className="border-b border-white/5 pb-8">
            <h2 className="text-5xl font-semibold tracking-tight">Verify University Email</h2>
            <p className="mt-2 text-lg text-white/60">
              We&apos;ve sent a 6-digit code to <span className="text-cyan-300">alex.s@university.edu</span>
            </p>

            <div className="mt-6 flex items-center gap-3">
              <CodeBox value="4" />
              <CodeBox value="8" />
              <CodeBox value="2" />
              <CodeBox value="·" />
              <CodeBox value="·" />
              <CodeBox value="·" />
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <button className="text-white/70 hover:text-cyan-200">Resend Code</button>
              <span className="text-white/35">01:54 remaining</span>
            </div>
          </div>

          <div className="pt-8">
            <h3 className="text-5xl font-semibold tracking-tight">Upload Student ID</h3>
            <p className="mt-2 text-lg text-white/60">
              Please provide a clear photo of your current institutional ID card.
            </p>

            <div className="mt-5 rounded-xl border-2 border-dashed border-white/10 bg-[#090C11] p-10 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-cyan-300/20 text-cyan-200">
                ☁
              </div>
              <p className="mt-5 text-3xl font-semibold">
                Drag &amp; Drop or <span className="text-cyan-300">Browse</span>
              </p>
              <p className="mt-1 text-sm text-white/50">Supports JPG, PNG, PDF up to 10MB</p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-white/5 px-4 py-3 text-sm text-white/70">🚫 No blur or glare</div>
              <div className="rounded-lg bg-white/5 px-4 py-3 text-sm text-white/70">
                ✅ All 4 corners visible
              </div>
            </div>

            <button className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-300 to-sky-400 py-3 text-xl font-semibold text-slate-950 hover:brightness-105">
              Submit Verification →
            </button>
          </div>

          <div className="absolute -bottom-5 right-4 rounded-xl border border-orange-300/30 bg-[#171B21]/95 px-4 py-3 text-sm text-white/75">
            ⚡ Verification Surge
            <p className="mt-1 text-xs text-white/45">Requests are being processed within 15 minutes today.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

