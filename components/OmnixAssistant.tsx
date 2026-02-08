"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function OmnixAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hey 👋 I’m the OmnixAI assistant. Want a quick 60-second demo of how we capture leads and book calls?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Auto-open once per visitor after 10 seconds
  useEffect(() => {
    const hasOpened = localStorage.getItem("omnixai_chat_opened");
    if (!hasOpened) {
      const t = setTimeout(() => {
        setOpen(true);
        localStorage.setItem("omnixai_chat_opened", "1");
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "opened" }),
        });
      }, 10000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (open) {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [open, messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Msg = { role: "user", content: text };
    const next: Msg[] = [...messages, userMsg];

    setMessages(next);
    setInput("");
    setLoading(true);

    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "messages" }),
    });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();

      setMessages([
        ...next,
        {
          role: "assistant",
          content: data?.text || "Sorry, I couldn’t respond just now.",
        },
      ]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Connection issue — please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function requestDemo() {
    const contact = prompt("Leave your email or WhatsApp and I’ll send you a demo:");
    if (!contact) return;

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, context: "Requested demo via chat" }),
      });

      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "demos" }),
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Thanks! We’ll message you shortly with your personalised OmnixAI demo 🙌",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong saving your request. Please try again.",
        },
      ]);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[9999] rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 transition"
      >
        {open ? "Close" : "Chat"}
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-[9999] w-[360px] max-w-[92vw] overflow-hidden rounded-2xl border bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="font-semibold">OmnixAI Assistant</div>
            <span className="text-xs text-slate-400">Powered by OmnixAI</span>
          </div>

          <div ref={listRef} className="h-[320px] space-y-2 overflow-y-auto px-3 py-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-orange-500 text-white"
                    : "mr-auto bg-slate-100 text-slate-900"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto max-w-[85%] rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-600">
                Typing…
              </div>
            )}
          </div>

          {messages.length > 2 && (
            <button
              onClick={requestDemo}
              className="mx-3 mb-2 w-[calc(100%-1.5rem)] rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 transition"
            >
              Request a demo
            </button>
          )}

          <div className="border-t p-2">
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about pricing, demos, setup…"
              />
              <button
                onClick={send}
                disabled={loading}
                className="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}