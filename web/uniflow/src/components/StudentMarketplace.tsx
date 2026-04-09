import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import CreateListingModal from './CreateListingModal'
import TopNavActions from './TopNavActions'
import AISearchBar from './AISearchBar'

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
  viewLayout?: 'grid' | 'list'
}

const categories = [
  'All Items',
  'Academic Kits',
  'Electronics',
  'Bicycles',
  'Hostel Gear',
]

type CategoryPanelProps = {
  activeCategory: string
  onCategoryChange: (cat: string) => void
  priceRange: [number, number]
  onPriceChange: (val: [number, number]) => void
  onOpenSellModal: () => void
}

function ProductCard({
  title,
  description,
  price,
  seller,
  action,
  badge,
  tone = 'slate',
  imageSrc,
  viewLayout = 'grid',
}: ProductCardProps) {
  const previewTone =
    tone === 'teal'
      ? 'from-cyan-500/30 to-teal-400/20'
      : tone === 'blue'
        ? 'from-sky-500/30 to-indigo-400/20'
        : 'from-white/15 to-white/5'

  return (
    <article className={`overflow-hidden flex rounded-2xl border border-white/10 bg-[#0E121B] shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform hover:scale-[1.02] ${viewLayout === 'list' ? 'flex-col sm:flex-row' : 'flex-col'}`}>
      <div className={`relative shrink-0 overflow-hidden bg-gradient-to-br ${previewTone} ${viewLayout === 'list' ? 'sm:w-80 sm:h-auto h-44' : 'h-44 w-full'}`}>
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

      <div className="flex flex-1 flex-col justify-between space-y-3 p-4 sm:p-5">
        <div>
          <h3 className="line-clamp-2 text-2xl font-semibold leading-tight text-white">{title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-white/65">{description}</p>
        </div>

        <p className="text-xs text-white/55">{seller}</p>

        <div className={`mt-4 flex items-center gap-2 ${viewLayout === 'list' ? 'sm:mt-6 sm:justify-end sm:max-w-md' : ''}`}>
          <button 
            onClick={() => alert(`Opening Chat with ${seller.split('·')[0].trim()}`)}
            className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs xl:text-sm font-semibold text-white hover:bg-white/15 transition-colors shrink-0 whitespace-nowrap">
            💬 Chat
          </button>
          <button 
            onClick={() => alert(`Viewing details for ${title}`)}
            className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-xs xl:text-sm font-semibold text-white hover:bg-white/15 transition-colors shrink-0 whitespace-nowrap">
            Details
          </button>
          <button 
            onClick={() => alert(`Starting ${action} for ${title}`)}
            className="flex-1 sm:flex-none sm:px-6 rounded-lg bg-sky-300/90 px-3 py-2 text-xs xl:text-sm font-semibold text-slate-950 hover:bg-sky-300 transition-colors whitespace-nowrap shadow-sm shadow-sky-500/20">
            {action}
          </button>
        </div>
      </div>
    </article>
  )
}

function CategoryPanel({ activeCategory, onCategoryChange, priceRange, onPriceChange, onOpenSellModal }: CategoryPanelProps) {
  const minP = 0
  const maxP = 10000
  const leftPercent = ((priceRange[0] - minP) / (maxP - minP)) * 100
  const rightPercent = ((priceRange[1] - minP) / (maxP - minP)) * 100

  return (
    <aside className="space-y-7 rounded-2xl border border-white/10 bg-[#0D1119] p-5">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Browse Categories</h4>
        <ul className="mt-4 space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => onCategoryChange(category)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeCategory === category
                  ? 'bg-sky-400/15 text-sky-300'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
              >
                {category}
                <span className="text-white/35">›</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Price Range (₹)</h4>
        <div className="relative h-1.5 mt-5">
          <div className="absolute w-full h-1.5 bg-white/10 rounded-full" />
          <div
            className="absolute h-1.5 bg-sky-300 rounded-full"
            style={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
          />

          <input
            type="range"
            min={minP}
            max={maxP}
            step="100"
            value={priceRange[0]}
            onChange={(e) => onPriceChange([Math.min(parseInt(e.target.value), priceRange[1] - 100), priceRange[1]])}
            className="absolute -top-1 w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-sky-300 cursor-pointer"
          />
          <input
            type="range"
            min={minP}
            max={maxP}
            step="100"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Math.max(parseInt(e.target.value), priceRange[0] + 100)])}
            className="absolute -top-1 w-full h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-sky-300 cursor-pointer"
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-white/70">
          <span className="rounded-md bg-white/5 px-2 py-1">{priceRange[0]}</span>
          <span>to</span>
          <span className="rounded-md bg-white/5 px-2 py-1">{priceRange[1] >= maxP ? `${priceRange[1]}+` : priceRange[1]}</span>
        </div>
      </div>

      <div className="rounded-xl border border-sky-400/20 bg-gradient-to-br from-[#101A28] to-[#0D1119] p-4 relative overflow-hidden">
        <h5 className="relative z-10 text-lg font-semibold text-white">Want to sell?</h5>
        <p className="relative z-10 mt-2 text-sm text-white/65">Turn your old gear into cash for next semester's textbooks.</p>
        <button 
          onClick={onOpenSellModal}
          className="relative z-10 mt-4 w-full rounded-xl bg-sky-300/90 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-sky-300 transition-colors">
          Sell an Item
        </button>
      </div>
    </aside>
  )
}

export default function StudentMarketplace() {
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [priceRange, setPriceRange] = useState<[number, number]>([500, 5000]);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from('marketplace_items')
      .select('*')
      .order('posted_at', { ascending: false })

    if (error) {
      console.error('Error fetching marketplace items:', error)
    } else {
      setListings(data || [])
    }
  }

  const addListing = (item: any) => {
    setListings((prev) => [item, ...prev])
  }

  const getListingImageUrl = (imagePath: string) => {
    if (!imagePath) return ''
    if (imagePath.startsWith('http')) return imagePath
    return supabase.storage.from('marketplace-images').getPublicUrl(imagePath).data.publicUrl
  }

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

          <div className="flex items-center gap-6">
            <div className="w-72">
              <AISearchBar placeholder="Search Marketplace..." />
            </div>
            <TopNavActions />
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] items-start">
          <CategoryPanel 
            activeCategory={activeCategory} 
            onCategoryChange={setActiveCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            onOpenSellModal={() => setIsListingModalOpen(true)}
          />

          <main>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-6xl font-semibold tracking-tight">Student Marketplace</h1>
                <p className="mt-1 text-xl text-white/65">Hand-picked gear from verified peers on campus.</p>
              </div>
              <div className="flex items-center gap-2 text-white/60">
                <button 
                  onClick={() => setViewLayout('grid')}
                  className={`rounded-lg px-3 py-2 flex items-center justify-center transition-colors ${viewLayout === 'grid' ? 'bg-white/15 text-white' : 'bg-white/5 hover:bg-white/10'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setViewLayout('list')}
                  className={`rounded-lg px-3 py-2 flex items-center justify-center transition-colors ${viewLayout === 'list' ? 'bg-white/15 text-white' : 'bg-white/5 hover:bg-white/10'}`}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
                  </svg>
                </button>
              </div>
            </div>

            <section className={viewLayout === 'grid' ? "grid gap-5 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-5"}>
              <ProductCard
                viewLayout={viewLayout}
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
                viewLayout={viewLayout}
                title="Hero Cycle"
                description="Hero Sprint Pro. Dual disc brakes, 21-speed gears, perfect for campus rides."
                price="₹4,500"
                seller="SR · Sanya R. · 3rd Year Biotech"
                action="Buy"
                badge="Verified Student"
                tone="teal"
                imageSrc="https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&q=80"
              />
              <ProductCard
                viewLayout={viewLayout}
                title="TechRefresh Bundle"
                description="Upgrade your setup with pre-loved campus electronics. Monitor, keyboard & mouse."
                price="₹8,500"
                seller="UN · UniFlow · Official Partner"
                action="Browse"
                badge="Featured"
                tone="blue"
                imageSrc="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&q=80"
              />
              <ProductCard
                viewLayout={viewLayout}
                title="iPad Air (M1) + Pencil"
                description="4 Offers Pending... Barely used, pristine condition. Battery health 98%."
                price="₹32,000"
                seller="JS · Jai S. · 2nd Year CS"
                action="Bid Now"
                badge="Hot Deal"
                tone="slate"
                imageSrc="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80"
              />
              <ProductCard
                viewLayout={viewLayout}
                title="Semester 4 IT Books"
                description="Complete set of 6 books for IT syllabus."
                price="₹800"
                seller="MT · Maya T. · 3rd Year IT"
                action="Buy"
                tone="blue"
                imageSrc="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80"
              />
              <ProductCard
                viewLayout={viewLayout}
                title="Lab Coat (Size M)"
                description="Only used for Chemistry labs. Recently washed."
                price="₹350"
                seller="RV · Rahul V. · 1st Year Chem"
                action="Buy"
                tone="teal"
                imageSrc="https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500&q=80"
              />
              {listings.map((item) => (
                <ProductCard
                  key={item.id}
                  viewLayout={viewLayout}
                  title={item.product_name}
                  description={item.description}
                  price={`₹${item.price}`}
                  seller={`${item.seller_name} · ${item.city_campus}`}
                  action="Buy"
                  badge={item.category}
                  tone="teal"
                  imageSrc={item.imageSrc || getListingImageUrl(item.image_path)}
                />
              ))}
            </section>
          </main>
        </div>
      </div>

      {isListingModalOpen && (
        <CreateListingModal
          onClose={() => setIsListingModalOpen(false)}
          onItemCreated={addListing}
        />
      )}
    </div>
  )
}
