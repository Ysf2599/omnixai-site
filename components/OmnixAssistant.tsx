"use client";

import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "omnixai-chat-v2";

const DEFAULT_STARTER: Msg = {
  role: "assistant",
  content:
    "Quick question — are you looking to increase enquiries from your current website, or planning a new one?",
};

const QUICK_REPLIES = [
  "How does this work?",
  "What’s the pricing?",
  "Can I see a walkthrough?",
  "Is this right for my business?",
];

function getVisitorId() {
  let id = localStorage.getItem("omnix-visitor-id");

  if (!id) {
    id = "v_" + Math.random().toString(36).substring(2, 10);
    localStorage.setItem("omnix-visitor-id", id);
  }

  return id;
}

export default function OmnixAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([DEFAULT_STARTER]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [visitorId, setVisitorId] = useState("");

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
  ];

  useEffect(() => {
    const id = getVisitorId();
    setVisitorId(id);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

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

  function resetChat() {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([DEFAULT_STARTER]);
  }

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

      await new Promise((resolve) => setTimeout(resolve, 1200));

      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);

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
          visitorId: visitorId,
        }),
      });

      setLeadSent(true);
    } catch {
      alert("Error sending request");
    }

    setLeadSending(false);
  }

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 animate-pulse rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600"
      >
        {open ? "Close Chat" : "Chat with OmnixAI"}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 flex h-[480px] w-80 flex-col overflow-hidden rounded-2xl border bg-white shadow-xl">

          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="font-semibold">OmnixAI Assistant</div>

            <button
              onClick={resetChat}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Reset
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto p-3 text-sm"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 max-w-[85%] ${
                  m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white text-xs font-semibold">
                    AI
                  </div>
                )}

                <div
                  className={`animate-fadeIn rounded-xl px-3 py-2 ${
                    m.role === "user"
                      ? "bg-orange-100 text-right"
                      : "bg-slate-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="flex gap-1">
                  <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400"></span>
                  <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 delay-150"></span>
                  <span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 delay-300"></span>
                </div>
                OmnixAI is typing
              </div>
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

          {/* Input */}
          <div className="border-t p-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 rounded-lg border px-2 py-2 text-sm"
              />

              <button
                onClick={() => sendMessage()}
                className="rounded-lg bg-orange-500 px-3 py-2 text-white"
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
      {showDemoPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">

            {!leadSent ? (
              <>
                <h3 className="mb-4 text-lg font-semibold">
                  Get Your Tailored Walkthrough
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
                  {leadSending ? "Sending..." : "Send Walkthrough"}
                </button>
              </>
            ) : (
              <>
                <h3 className="mb-2 text-lg font-semibold">
                  Request Sent
                </h3>

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