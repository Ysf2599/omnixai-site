"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const DEFAULT_STARTER: Msg = {
  role: "assistant",
  content:
    "Most websites lose potential leads because visitors don’t convert at the right moment.\n\nAre you looking to increase enquiries, improve booking rates, or launch a new website entirely?",
};

const QUICK_REPLIES = [
  "How does this work?",
  "What’s the pricing?",
  "Can I see a walkthrough?",
  "Is this right for my business?",
];

function getStarterForPath(pathname: string): Msg {
  const p = pathname.toLowerCase();

  if (p.includes("pricing")) {
    return {
      role: "assistant",
      content:
        "If you’re comparing the packages, I can help you choose the right setup.\n\nAre you improving an existing website or building a new one?",
    };
  }

  if (p.includes("web") || p.includes("website")) {
    return {
      role: "assistant",
      content:
        "If you’re planning a new website or redesign, the biggest gains usually come from combining the build with a conversion-focused AI assistant.\n\nAre you starting from scratch or upgrading an existing site?",
    };
  }

  return DEFAULT_STARTER;
}

export default function OmnixAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([DEFAULT_STARTER]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [showDemoPopup, setShowDemoPopup] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadSending, setLeadSending] = useState(false);
  const [leadSent, setLeadSent] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  const intentWords = [
    "price",
    "pricing",
    "cost",
    "how much",
    "demo",
    "interested",
    "setup",
    "get started",
    "book",
    "call",
  ];

  useEffect(() => {
    const starter = getStarterForPath(window.location.pathname);
    setMessages([starter]);
  }, []);

  useEffect(() => {
    const opened = sessionStorage.getItem("omnix-opened");

    if (!opened) {
      setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("omnix-opened", "true");
      }, 6000);
    }
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

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: content,
          history: messages,
          pathname: window.location.pathname,
        }),
      });

      const data = await res.json();

      const assistantReply: Msg = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((m) => [...m, assistantReply]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Something went wrong. Please try again shortly.",
        },
      ]);
    } finally {
      setLoading(false);
    }

    if (intentWords.some((w) => content.toLowerCase().includes(w))) {
      setTimeout(() => setShowDemoPopup(true), 800);
    }
  }

  async function submitLead() {
    if (!leadEmail) return;

    setLeadSending(true);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: leadEmail,
          phone: leadPhone,
          message: "Demo request from chat widget",
          page: window.location.pathname,
          conversation: messages,
        }),
      });

      setLeadSent(true);
    } catch {
      alert("Something went wrong sending your request.");
    } finally {
      setLeadSending(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600"
      >
        {open ? "Close Chat" : "Chat with OmnixAI"}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 flex h-[460px] w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
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
              <div className="text-xs text-slate-400">OmnixAI is typing…</div>
            )}

            {messages.length <= 2 && !loading && (
              <div className="flex flex-wrap gap-2">
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

          <div className="border-t p-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message…"
                className="flex-1 rounded-lg border px-2 py-2 text-sm outline-none"
              />

              <button
                onClick={() => sendMessage()}
                className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600"
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

      {showDemoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-[92%] max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {!leadSent ? (
              <>
                <h3 className="mb-2 text-lg font-semibold">
                  Get Your Tailored Walkthrough
                </h3>

                <p className="mb-4 text-sm text-slate-600">
                  I’ll send you a short breakdown showing how OmnixAI would work
                  for your business.
                </p>

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
                  {leadSending ? "Sending..." : "Send Walkthrough"}
                </button>
              </>
            ) : (
              <>
                <h3 className="mb-2 text-lg font-semibold">
                  Walkthrough Request Sent
                </h3>

                <p className="text-sm text-slate-600">
                  Check your inbox. I’ll send a breakdown shortly.
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