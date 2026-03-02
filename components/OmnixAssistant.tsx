"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const STARTER_MSG: Msg = {
  role: "assistant",
  content:
    "Most websites lose potential leads because visitors don’t convert at the right moment.\n\nAre you looking to increase enquiries, improve booking rates, or launch a new website entirely?",
};

export default function OmnixAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([STARTER_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [showDemoPopup, setShowDemoPopup] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSending, setLeadSending] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  // Reset chat on every refresh
  useEffect(() => {
    localStorage.removeItem("omnixai-chat");
    setMessages([STARTER_MSG]);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMessage: Msg = { role: "user", content };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          history: messages,
          pathname: window.location.pathname,
        }),
      });

      const data = await res.json();

      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);

      // Trigger demo popup if user intent includes demo
const highIntentWords = [
  "price",
  "pricing",
  "cost",
  "how much",
  "interested",
  "book",
  "call",
  "setup",
  "get started",
  "demo",
  "sign up",
  "subscribe",
  "whatsapp"
];

if (highIntentWords.some(word =>
  content.toLowerCase().includes(word)
)) {
  setTimeout(() => setShowDemoPopup(true), 700);
}
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead() {
    if (!leadEmail && !leadPhone) return;

    setLeadSending(true);

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: leadEmail,
          phone: leadPhone,
          message: "Demo request from chat widget",
          page: window.location.pathname,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setLeadSent(true);
        setLeadEmail("");
        setLeadPhone("");
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch {
      alert("Submission failed.");
    } finally {
      setLeadSending(false);
    }
  }

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600"
      >
        {open ? "Close chat" : "Chat with OmnixAI"}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 flex h-[460px] w-80 flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl">
          <div className="border-b px-4 py-3 font-semibold">
            OmnixAI Assistant
          </div>

          <div
            ref={listRef}
            className="flex-1 space-y-2 overflow-y-auto p-3 text-sm"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 ${
                  m.role === "user"
                    ? "ml-auto bg-orange-100 text-right"
                    : "mr-auto bg-slate-100"
                }`}
              >
                {m.content}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-slate-400">
                OmnixAI is typing…
              </div>
            )}
          </div>

          <div className="border-t p-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 rounded-lg border px-2 py-2 text-sm"
                placeholder="Type your message…"
              />
              <button
                onClick={() => sendMessage()}
                className="rounded-lg bg-orange-500 px-3 py-2 text-white"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Demo Popup */}
      {showDemoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
            {!leadSent ? (
              <>
                <h3 className="mb-4 text-lg font-semibold">
                  Book Your Demo
                </h3>

                <input
                  type="email"
                  placeholder="Your email"
                  value={leadEmail}
                  onChange={(e) => setLeadEmail(e.target.value)}
                  className="mb-3 w-full rounded-lg border px-3 py-2"
                />

                <input
                  type="text"
                  placeholder="WhatsApp (optional)"
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="mb-4 w-full rounded-lg border px-3 py-2"
                />

                <button
                  onClick={submitLead}
                  disabled={leadSending}
                  className="w-full rounded-lg bg-orange-500 py-2 text-white"
                >
                  {leadSending ? "Sending..." : "Send"}
                </button>
              </>
            ) : (
              <>
                <h3 className="mb-2 text-lg font-semibold">
                  🎉 Demo Request Sent
                </h3>
                <p className="text-sm text-slate-600">
                  We’ll contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setShowDemoPopup(false);
                    setLeadSent(false);
                  }}
                  className="mt-4 w-full rounded-lg bg-orange-500 py-2 text-white"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}