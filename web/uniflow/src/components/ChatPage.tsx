interface Props {
  sellerName: string
  productTitle: string
  onBack: () => void
}

const mockMessages = [
  { id: 1, sender: 'seller', text: 'Hi! Is this item still available?', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Yes, it is! Are you interested?', time: '10:32 AM' },
  { id: 3, sender: 'seller', text: 'Definitely! Can you share more photos?', time: '10:33 AM' },
  { id: 4, sender: 'me', text: 'Sure, I can send some from different angles. Any specific part you want to see?', time: '10:35 AM' },
  { id: 5, sender: 'seller', text: 'Just the condition of the edges and any scratches if possible.', time: '10:36 AM' },
]

export default function ChatPage({ sellerName, productTitle, onBack }: Props) {
  return (
    <div className="min-h-dvh bg-[#070A10] text-white">
      <header className="flex items-center gap-4 border-b border-white/10 bg-[#0D1119]/90 px-4 py-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center rounded-lg bg-white/10 p-2 hover:bg-white/15 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{sellerName}</h2>
          <p className="text-sm text-white/55">{productTitle}</p>
        </div>
        <button className="rounded-lg bg-white/10 p-2 hover:bg-white/15 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </header>

      <main className="flex flex-col gap-4 p-4 h-[calc(100vh-140px)] overflow-y-auto">
        <div className="text-center text-sm text-white/40 py-2">
          Today
        </div>

        {mockMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.sender === 'me'
                  ? 'bg-sky-300/90 text-slate-900 rounded-br-md'
                  : 'bg-white/10 text-white rounded-bl-md'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-slate-600/70' : 'text-white/40'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </main>

      <footer className="border-t border-white/10 bg-[#0D1119]/90 p-3">
        <form
          className="flex items-center gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement
            if (input.value.trim()) {
              alert(`Message sent: ${input.value}`)
              input.value = ''
            }
          }}
        >
          <button
            type="button"
            className="flex items-center justify-center rounded-full bg-white/10 p-2 hover:bg-white/15 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <input
            name="message"
            type="text"
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-sky-300/50 focus:outline-none focus:ring-1 focus:ring-sky-300/50"
            autoComplete="off"
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-full bg-sky-300/90 p-2.5 hover:bg-sky-300 transition-colors"
          >
            <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </footer>
    </div>
  )
}