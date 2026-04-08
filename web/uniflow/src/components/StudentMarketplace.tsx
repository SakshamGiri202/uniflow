import { Link } from 'react-router-dom'

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
}: ProductCardProps) {
  const previewTone =
    tone === 'teal'
      ? 'from-cyan-500/30 to-teal-400/20'
      : tone === 'blue'
        ? 'from-sky-500/30 to-indigo-400/20'
        : 'from-white/15 to-white/5'

  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#0E121B] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      <div className={`relative h-44 bg-gradient-to-br ${previewTone}`}>
        {badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-violet-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            {badge}
          </span>
        ) : null}
        <span className="absolute bottom-3 right-3 rounded-lg bg-slate-900/90 px-3 py-1.5 text-xl font-bold text-sky-300">
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
          <button className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/15">
            View Details
          </button>
          <button className="rounded-lg bg-sky-300/90 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-sky-300">
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
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium ${
                  category.active
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
        <div className="mt-4 h-1.5 rounded-full bg-white/10">
          <div className="h-1.5 w-3/4 rounded-full bg-sky-300" />
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-white/70">
          <span className="rounded-md bg-white/5 px-2 py-1">500</span>
          <span>to</span>
          <span className="rounded-md bg-white/5 px-2 py-1">5000+</span>
        </div>
      </div>

      <div className="rounded-xl border border-sky-400/20 bg-gradient-to-br from-[#101A28] to-[#0D1119] p-4">
        <h5 className="text-lg font-semibold text-white">Want to sell?</h5>
        <p className="mt-2 text-sm text-white/65">Turn your old gear into cash for next semester's textbooks.</p>
        <button className="mt-4 w-full rounded-xl bg-sky-300/90 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-300">
          List an Item
        </button>
      </div>
    </aside>
  )
}

export default function StudentMarketplace() {
  return (
    <div className="min-h-dvh bg-[#070A10] text-white">
      <div className="mx-auto max-w-[1400px] px-6 py-5">
        <header className="mb-7 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0D1119]/90 px-6 py-4">
          <div className="flex items-center gap-8">
            <div className="text-4xl font-black italic tracking-tight text-sky-300">UniFlow</div>
            <nav className="hidden items-center gap-6 md:flex">
              <Link to="/dashboard" className="text-sm text-white/70 hover:text-white">
                Dashboard
              </Link>
              <Link to="/marketplace" className="border-b-2 border-sky-300 pb-1 text-sm font-semibold text-sky-300">
                Marketplace
              </Link>
              <Link to="/events" className="text-sm text-white/70 hover:text-white">
                Events
              </Link>
              <Link to="/coach" className="text-sm text-white/70 hover:text-white">
                Coach
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <input
              className="w-72 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-white/35 focus:border-sky-300/50 focus:outline-none"
              placeholder="Search Marketplace..."
            />
            <button className="rounded-full bg-white/5 p-2 text-white/75">🔔</button>
            <button className="rounded-full bg-white/5 p-2 text-white/75">⚙</button>
            <button className="rounded-full bg-white/10 p-2 text-white">👤</button>
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
                <button className="rounded-lg bg-white/10 px-3 py-2">▦</button>
                <button className="rounded-lg bg-white/5 px-3 py-2">☰</button>
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
              />
              <ProductCard
                title="Hero Cycle"
                description="Hero Sprint Pro. Dual disc brakes, 21-speed gears, perfect for campus rides."
                price="₹4,500"
                seller="SR · Sanya R. · 3rd Year Biotech"
                action="Buy"
                badge="Verified Student"
                tone="teal"
              />

              <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#0E121B]">
                <div className="h-24 bg-white/90" />
                <div className="h-20 bg-gradient-to-br from-white/15 to-black/30" />
                <div className="space-y-3 p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-200/70">
                    Featured Collection
                  </p>
                  <h3 className="text-5xl font-black italic text-white">TechRefresh</h3>
                  <p className="text-sm text-white/65">Upgrade your setup with pre-loved campus electronics.</p>
                  <button className="text-lg font-semibold text-sky-300 hover:text-sky-200">
                    Browse All →
                  </button>
                </div>
              </article>

              <article className="rounded-2xl border border-orange-300/40 bg-[#1A1D24] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-200">Hot deal right now</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-20 w-16 rounded-lg bg-cyan-200/80" />
                  <div>
                    <h3 className="text-3xl font-semibold">iPad Air (M1) + Pencil</h3>
                    <p className="text-sm text-white/60">4 Offers Pending...</p>
                    <p className="mt-1 text-5xl font-black text-sky-300">₹32,000</p>
                  </div>
                </div>
                <button className="mt-5 w-full rounded-xl bg-white/10 py-3 text-base font-semibold hover:bg-white/15">
                  View Auction ⚡
                </button>
              </article>

              <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#0E121B]">
                <div className="h-40 bg-gradient-to-br from-sky-500/35 to-violet-500/20" />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-semibold">Semester 4 IT Books</h3>
                    <span className="rounded bg-slate-900/90 px-2 py-1 text-xs font-bold text-sky-300">₹800</span>
                  </div>
                  <p className="mt-2 text-sm text-white/65">Complete set of 6 books for IT.</p>
                  <button className="mt-4 w-full rounded-lg bg-white/10 py-2 text-sm font-semibold hover:bg-white/15">
                    CONTACT SELLER
                  </button>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E121B]">
                <div className="h-40 bg-gradient-to-br from-teal-300/60 to-sky-500/35" />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-semibold">Lab Coat (Size M)</h3>
                    <span className="rounded bg-slate-900/90 px-2 py-1 text-xs font-bold text-sky-300">₹350</span>
                  </div>
                  <p className="mt-2 text-sm text-white/65">Only used for Chemistry labs.</p>
                  <button className="mt-4 w-full rounded-lg bg-white/10 py-2 text-sm font-semibold hover:bg-white/15">
                    CONTACT SELLER
                  </button>
                </div>
                <button className="absolute bottom-4 right-4 h-14 w-14 rounded-2xl bg-sky-300/90 text-4xl font-light text-slate-950 shadow-lg shadow-sky-500/30 hover:bg-sky-300">
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

