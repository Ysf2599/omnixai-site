"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const STARTER_MSG: Msg = {
  role: "assistant",
  content:
    "Hi, I’m OmnixAI. I can help you capture more leads and qualify visitors on your website. What type of business are you running?",
};

const QUICK_REPLIES = [
  "How does this work?",
  "What’s the pricing?",
  "Can I see a demo?",
  "Is this right for my business?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([STARTER_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // Load chat from localStorage (persist across routes)
  useEffect(() => {
    const saved = localStorage.getItem("omnixai-chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Persist chat
  useEffect(() => {
    localStorage.setItem("omnixai-chat", JSON.stringify(messages));
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMessage: Msg = { role: "user", content: content.slice(0, 1000) };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages,
          pathname: window.location.pathname, // 👈 page-aware AI
        }),
      });

      const data = await res.json();

      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry—something went wrong on my side. Want to try again?",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Bubble */}
      <button
        aria-label="Open chat with OmnixAI"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        {open ? "Close chat" : "Chat with OmnixAI"}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 flex h-[460px] w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="font-semibold">OmnixAI Assistant</div>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Close
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="flex-1 space-y-2 overflow-y-auto p-3 text-sm"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-orange-100 text-right"
                    : "mr-auto bg-slate-100"
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-slate-400">OmnixAI is typing…</div>
            )}

            {/* Quick replies (only show early) */}
            {messages.length <= 2 && !loading && (
              <div className="mt-2 flex flex-wrap gap-2">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-full border px-3 py-1 text-xs text-slate-600 hover:bg-slate-100"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 rounded-lg border px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Type your message…"
                aria-label="Type your message"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
              >
                Send
              </button>
            </div>

            {/* Powered by */}
            <div className="mt-2 text-center text-[10px] text-slate-400">
              Powered by OmnixAI
            </div>
          </div>
        </div>
      )}
    </>
  );
}