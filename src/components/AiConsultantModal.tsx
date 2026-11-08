import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { X, Send, Bot, User, Sparkles, RefreshCw, HardHat } from 'lucide-react';

interface AiConsultantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiConsultantModal: React.FC<AiConsultantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Greetings. I am the AI Technical Desk Consultant for Rehman Construction (Pvt) Ltd. Headquartered in Sector F-10 Islamabad under Chairman Sheikh Munawar Mandokhail, MD Sheikh Ali Mandokhail, and Corporate Liaison Ahmed Khan Mandokhail, we execute specialized civil engineering packages, heavy earthworks, highways, and infrastructure across Pakistan. How can I assist with your tender or project inquiries?",
      timestamp: 'Now',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "What was Rehman Construction's role in CPEC?",
    "Tell me about the 4M Gallon Gaddafi Stadium rain tank",
    "Explain D-Chowk underpass & T-Chowk flyover works",
    "Who are the owners and how to contact the F-10 office?",
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!res.ok) {
        throw new Error('API server failed');
      }

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: data.reply || "Rehman Construction engineering desk has logged your request.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      // Fallback response
      const fallbackReply: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: "Rehman Construction (Pvt) Ltd executes specialized civil engineering and infrastructure packages across Pakistan. For inquiries or direct liaison with leadership, please contact our Sector F-10 Islamabad office via mandokhailahmedkhan74@gmail.com, direct phone 0311-7771414, or Instagram @ahmed_mandokhail10.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex flex-col h-[85vh] w-full max-w-2xl rounded-2xl border border-stone-200 bg-white shadow-2xl dark:border-stone-800 dark:bg-stone-900 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 px-6 py-4 bg-stone-50 dark:bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 font-bold text-stone-950 shadow-xs">
              <HardHat className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="rocky-title text-base font-bold text-stone-900 dark:text-stone-100">
                  REHMAN AI ENGINEERING DESK
                </h3>
                <span className="text-[10px] font-mono font-bold uppercase text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Gemini 3.8
                </span>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                Official Technical, Tender & Project Assistant
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-100/50 dark:bg-stone-900/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[88%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-amber-400'
                }`}
              >
                {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 font-semibold text-stone-950 shadow-xs'
                    : 'border border-stone-200 bg-white text-stone-800 shadow-xs dark:border-stone-800 dark:bg-stone-950 dark:text-stone-200'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`mt-1.5 text-[10px] font-mono ${
                    msg.sender === 'user' ? 'text-stone-900/70 text-right' : 'text-stone-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 max-w-[85%] mr-auto">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-stone-200 text-stone-900 dark:bg-stone-800 dark:text-amber-400">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-4 py-3 text-xs text-stone-500 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-400 shadow-xs">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-500" />
                <span>Analyzing civil engineering repositories & technical specs...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Inquiries */}
        <div className="border-t border-stone-200 dark:border-stone-800 bg-stone-50/80 dark:bg-stone-950/80 px-4 py-2.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
            Suggested Engineering Inquiries
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="whitespace-nowrap shrink-0 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-700 hover:border-amber-500 hover:text-amber-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-amber-400 dark:hover:text-amber-400 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleFormSubmit}
          className="flex items-center gap-2 border-t border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950"
        >
          <input
            type="text"
            placeholder="Ask about N-50, T-Chowk, Gaddafi Rain Tank, tenders, or F-10 office..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 px-4 py-2.5 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:border-amber-500 focus:outline-hidden"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-stone-950 transition-colors hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
