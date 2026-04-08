type Category = {
  name: string
  active?: boolean
}

type ProductCardProps = {
  title: string
  description: string
  price: string
  seller: string
  action: string
  badge?: string
  tone?: 'teal' | 'blue' | 'slate'
  imageSrc?: string
}

const categories: Category[] = [
  { name: 'All Items', active: true },
  { name: 'Academic Kits' },
  { name: 'Electronics' },
  { name: 'Bicycles' },
  { name: 'Hostel Gear' },
]

function ProductCard({
  title,
  description,
  price,
  seller,
  action,
  badge,
  tone = 'slate',
  imageSrc,
}: ProductCardProps) {
  const previewTone =
    tone === 'teal'
      ? 'from-cyan-500/30 to-teal-400/20'
      : tone === 'blue'
        ? 'from-sky-500/30 to-indigo-400/20'
        : 'from-white/15 to-white/5'

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#0E121B] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      <div className={`relative h-44 bg-gradient-to-br ${previewTone} overflow-hidden`}>
        {imageSrc && (
          <img src={imageSrc} alt={title} className="absolute inset-0 h-full w-full object-cover" />
        )}
        {badge ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-violet-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
            {badge}
          </span>
        ) : null}
        <span className="absolute bottom-3 right-3 z-10 rounded-lg bg-slate-900/90 px-3 py-1.5 text-xl font-bold text-sky-300 backdrop-blur">
          {price}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-2 text-2xl font-semibold leading-tight text-white">{title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/65">{description}</p>
        </div>

        <p className="text-xs text-white/55">{seller}</p>

        <div className="flex items-center gap-2">
          <button className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15 transition-colors">
            View Details
          </button>
          <button className="rounded-lg bg-sky-300/90 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300 transition-colors">
            {action}
          </button>
        </div>
      </div>
    </article>
  )
}

function CategoryPanel() {
  return (
    <aside className="space-y-7 rounded-2xl border border-white/10 bg-[#0D1119] p-5">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Browse Categories</h4>
        <ul className="mt-4 space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <button
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${category.active
                  ? 'bg-sky-400/15 text-sky-300'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {category.name}
                <span className="text-white/35">›</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Price Range (₹)</h4>
        <div className="mt-4 h-1.5 rounded-full bg-white/10 relative">
          <div className="absolute left-0 h-1.5 w-3/4 rounded-full bg-sky-300" />
          <div className="absolute top-1/2 left-0 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-sky-300 bg-white" />
          <div className="absolute top-1/2 left-3/4 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-sky-300 bg-white" />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-white/70">
          <span className="rounded-md bg-white/5 px-2 py-1">500</span>
          <span>to</span>
          <span className="rounded-md bg-white/5 px-2 py-1">5000+</span>
        </div>
      </div>

      <div className="rounded-xl border border-sky-400/20 bg-gradient-to-br from-[#101A28] to-[#0D1119] p-4 relative overflow-hidden">
        <h5 className="relative z-10 text-lg font-semibold text-white">Want to sell?</h5>
        <p className="relative z-10 mt-2 text-sm text-white/65">Turn your old gear into cash for next semester's textbooks.</p>
        <button className="relative z-10 mt-4 w-full rounded-xl bg-sky-300/90 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-300 transition-colors">
          List an Item
        </button>
      </div>
    </aside>
  )
}

interface Props {
  onNavigate?: (page: string) => void;
}

export default function StudentMarketplace({ onNavigate }: Props) {
  return (
    <div className="min-h-dvh bg-[#070A10] text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-5">
        <header className="mb-7 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0D1119]/90 px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="text-4xl font-black italic tracking-tight text-sky-300">UniFlow</div>
            <nav className="hidden items-center gap-6 md:flex relative">
              <button
                onClick={() => onNavigate?.('dashboard')}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate?.('marketplace')}
                className="relative text-sm font-semibold text-sky-300 transition-colors">
                Marketplace
                <div className="absolute -bottom-[23px] left-0 h-[2px] w-full bg-sky-300" />
              </button>
              <button
                onClick={() => onNavigate?.('events')}
                className="text-sm text-white/70 hover:text-white transition-colors">Events</button>

            </nav>
          </div>

          <div className="flex items-center gap-3">
            <input
              className="w-72 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/35 focus:border-sky-300/50 focus:outline-none focus:ring-1 focus:ring-sky-300/50 transition-all"
              placeholder="Search Marketplace..."
            />
            <button className="rounded-full bg-white/5 hover:bg-white/10 transition-colors p-2 text-white/75 flex items-center justify-center h-9 w-9">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="rounded-full bg-white/5 hover:bg-white/10 transition-colors p-2 text-white/75 flex items-center justify-center h-9 w-9">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <div className="h-9 w-9 overflow-hidden rounded-full border border-white/10 shrink-0 ml-1">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <CategoryPanel />

          <main>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-6xl font-semibold tracking-tight">Student Marketplace</h1>
                <p className="mt-1 text-xl text-white/65">Hand-picked gear from verified peers on campus.</p>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <button className="rounded-lg bg-white/10 px-3 py-2 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
                  </svg>
                </button>
                <button className="rounded-lg bg-white/5 px-3 py-2 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                  </svg>
                </button>
              </div>
            </div>

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <ProductCard
                title="Engineering Graphics Kit"
                description="Complete set for Semester 1. Includes draftsman, A3 board, and sheets."
                price="₹1,200"
                seller="AK · Arjun K. · 4th Year Mechanical"
                action="Buy"
                badge="Verified Student"
                tone="slate"
                imageSrc="https://images.unsplash.com/photo-1541580628362-e6bb1f912e52?w=500&q=80"
              />
              <ProductCard
                title="Hero Cycle"
                description="Hero Sprint Pro. Dual disc brakes, 21-speed gears, perfect for campus rides."
                price="₹4,500"
                seller="SR · Sanya R. · 3rd Year Biotech"
                action="Buy"
                badge="Verified Student"
                tone="teal"
                imageSrc="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80"
              />

              <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E121B]">
                <div className="absolute inset-0 z-0">
                  <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80" alt="TechRefresh" className="h-full w-full object-cover opacity-50 mix-blend-luminosity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E121B] via-[#0E121B]/80 pointer-events-none" />
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end space-y-3 p-5 pt-32">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-200/70">
                    Featured Collection
                  </p>
                  <h3 className="text-5xl font-black italic text-white leading-tight">TechRefresh</h3>
                  <p className="text-sm text-white/65">Upgrade your setup with pre-loved campus electronics.</p>
                  <button className="w-fit text-lg font-semibold text-sky-300 hover:text-sky-200 transition-colors mt-2">
                    Browse All →
                  </button>
                </div>
              </article>

              <article className="rounded-2xl border border-orange-300/40 bg-[#1A1D24] p-5 shadow-[0_4px_30px_rgba(253,186,116,0.1)]">
                <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-200">
                  <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                  Hot deal right now
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-cyan-200/80 shadow-md">
                    <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80" alt="iPad Air" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold text-white">iPad Air (M1) + Pencil</h3>
                    <p className="text-sm text-white/60">4 Offers Pending...</p>
                    <p className="mt-1 text-5xl font-black text-sky-300">₹32,000</p>
                  </div>
                </div>
                <button className="mt-5 w-full rounded-xl bg-white/10 py-3 text-base font-semibold text-white hover:bg-white/15 transition-colors">
                  View Auction ⚡
                </button>
              </article>

              <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#0E121B] shadow-[0_10px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                <div className="relative h-44 w-full">
                  <img src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80" alt="Books" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/35 to-violet-500/20 -z-10" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="line-clamp-2 text-3xl font-semibold text-white leading-tight">Semester 4 IT Books</h3>
                    <span className="shrink-0 rounded bg-slate-900/90 px-2 py-1 text-sm font-bold text-sky-300 shadow-sm backdrop-blur">₹800</span>
                  </div>
                  <p className="mt-2 text-sm text-white/65 flex-1">Complete set of 6 books for IT.</p>
                  <button className="mt-4 w-full rounded-lg bg-white/10 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition-colors">
                    CONTACT SELLER
                  </button>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E121B] shadow-[0_10px_40px_rgba(0,0,0,0.35)] flex flex-col justify-between">
                <div className="relative h-44 w-full">
                  <img src="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500&q=80" alt="Lab Coat" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-300/60 to-sky-500/35 -z-10" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="line-clamp-2 text-3xl font-semibold text-white leading-tight">Lab Coat (Size M)</h3>
                    <span className="shrink-0 rounded bg-slate-900/90 px-2 py-1 text-sm font-bold text-sky-300 shadow-sm backdrop-blur">₹350</span>
                  </div>
                  <p className="mt-2 text-sm text-white/65 flex-1">Only used for Chemistry labs.</p>
                  <button className="mt-4 w-full rounded-lg bg-white/10 py-2.5 text-sm font-semibold text-white hover:bg-white/15 transition-colors pr-12">
                    CONTACT SELLER
                  </button>
                </div>
                <button className="absolute bottom-4 right-4 h-12 w-12 rounded-xl bg-sky-300/90 text-3xl font-light text-slate-950 flex items-center justify-center shadow-lg shadow-sky-500/30 hover:bg-sky-300 transition-colors">
                  +
                </button>
              </article>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
