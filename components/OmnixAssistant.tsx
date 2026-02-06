"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function OmnixAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I’m the OmnixAI assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [open, messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.text || "Sorry, I couldn’t respond." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Connection issue. Try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[9999] rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90"
      >
        {open ? "Close" : "Chat"}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-[9999] w-[340px] max-w-[92vw] overflow-hidden rounded-2xl border bg-white shadow-2xl">
          <div className="border-b px-4 py-3 font-semibold">OmnixAI Assistant</div>

          <div ref={listRef} className="h-[320px] space-y-2 overflow-y-auto px-3 py-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-slate-900 text-white"
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

          <div className="border-t p-2">
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-lg border px-3 py-2 text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Ask about OmnixAI, pricing, demos…"
              />
              <button
                onClick={send}
                disabled={loading}
                className="rounded-lg bg-black px-3 py-2 text-sm text-white disabled:opacity-50"
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