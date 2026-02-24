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

export default function OmnixAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([STARTER_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSent, setLeadSent] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  // ✅ Option A: Reset chat on new browser session
  useEffect(() => {
    const sessionKey = "omnixai-session-started";
    const started = sessionStorage.getItem(sessionKey);

    if (!started) {
      localStorage.removeItem("omnixai-chat");
      sessionStorage.setItem(sessionKey, "1");
    }
  }, []);

  // Load chat from localStorage (persist during same session)
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
          pathname: window.location.pathname,
        }),
      });

      const data = await res.json();
      const assistantReply = data.reply as string;

      setMessages((m) => [...m, { role: "assistant", content: assistantReply }]);

      // Open demo popup if bot mentions demo
      if (assistantReply.toLowerCase().includes("demo")) {
        setShowLeadForm(true);
      }
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

  async function submitLead() {
    if (!leadEmail && !leadPhone) return;

    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: leadEmail || undefined,
        phone: leadPhone || undefined,
        message: "Demo request from chat widget",
        page: window.location.pathname,
      }),
    });

    setLeadSent(true);

    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        content: "Thanks! We’ve got your details and will be in touch shortly.",
      },
    ]);

    setTimeout(() => {
      setShowLeadForm(false);
      setLeadEmail("");
      setLeadPhone("");
      setLeadSent(false);
    }, 1200);
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
          <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
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
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading}
                className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-center text-[10px] text-slate-400">
              Powered by OmnixAI
            </div>
          </div>
        </div>
      )}

      {/* Demo Popup */}
      {showLeadForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="w-80 rounded-2xl bg-white p-4 shadow-xl">
            <h3 className="mb-1 text-sm font-semibold">Book a demo</h3>
            <p className="mb-3 text-xs text-slate-500">
              Leave your details and we’ll reach out.
            </p>

            <input
              value={leadEmail}
              onChange={(e) => setLeadEmail(e.target.value)}
              placeholder="Email"
              className="mb-2 w-full rounded-lg border px-2 py-2 text-sm"
            />
            <input
              value={leadPhone}
              onChange={(e) => setLeadPhone(e.target.value)}
              placeholder="WhatsApp (optional)"
              className="mb-3 w-full rounded-lg border px-2 py-2 text-sm"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setShowLeadForm(false)}
                className="w-1/2 rounded-lg border py-2 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={submitLead}
                className="w-1/2 rounded-lg bg-orange-500 py-2 text-sm font-semibold text-white hover:bg-orange-600"
              >
                {leadSent ? "Sent ✓" : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}