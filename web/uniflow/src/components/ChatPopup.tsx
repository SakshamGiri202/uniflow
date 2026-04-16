import { useState, useRef, useEffect } from 'react';

type ChatPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
};

type Message = {
  id: string;
  sender: 'user' | 'recipient';
  text: string;
  timestamp: Date;
};

export default function ChatPopup({ isOpen, onClose, recipientName }: ChatPopupProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'recipient',
      text: `Hi there! Interested in my item?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 5)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: newMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    setTimeout(() => {
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'recipient',
        text: `Thanks for reaching out! I'll check and get back to you shortly.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[340px] sm:w-[380px] flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#04060A]/80 backdrop-blur-2xl shadow-[0_30px_80px_-15px_rgba(56,189,248,0.25)] ring-1 ring-white/5 animate-in slide-in-from-bottom-10 fade-in zoom-in-95 duration-500 ease-out">
      {/* Header */}
      <div className="relative flex items-center justify-between px-5 py-4 overflow-hidden border-b border-white/5 bg-white/[0.02]">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-fuchsia-500/10 to-indigo-500/10 z-0"></div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-500 text-sm font-bold text-white shadow-[0_0_15px_rgba(168,85,247,0.5)]">
              {recipientName.slice(0, 2).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-[2.5px] border-[#04060A] bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
          </div>
          <div>
            <h3 className="text-[15px] font-bold text-white tracking-wide">{recipientName}</h3>
            <p className="text-xs font-medium text-emerald-400/90 mt-0.5">Online now</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="relative z-10 rounded-full p-2.5 text-white/40 hover:bg-white/10 hover:text-white transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 h-[320px] overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="flex justify-center mb-6">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5">
            Today
          </span>
        </div>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} max-w-[80%]`}>
              <div
                className={`px-4 py-2.5 text-[14px] leading-relaxed shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-sky-400 to-indigo-500 text-white rounded-[20px] rounded-tr-[4px] shadow-[0_4px_15px_rgba(56,189,248,0.25)]'
                    : 'bg-white/[0.04] border border-white/10 text-white/90 rounded-[20px] rounded-tl-[4px] backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.2)]'
                }`}
              >
                <p>{message.text}</p>
              </div>
              <span className={`mt-1.5 text-[10px] font-medium tracking-wider ${
                  message.sender === 'user' ? 'text-sky-300/60' : 'text-white/30'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-gradient-to-t from-[#04060A] to-transparent">
        <div className="relative flex items-center p-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl transition-all focus-within:border-sky-500/50 focus-within:bg-white/[0.06] focus-within:shadow-[0_0_20px_rgba(56,189,248,0.1)]">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${recipientName.split(' ')[0]}...`}
            className="w-full bg-transparent py-2 pl-4 pr-12 text-sm text-white placeholder-white/30 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white shadow-[0_0_15px_rgba(56,189,248,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:grayscale"
          >
            <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
