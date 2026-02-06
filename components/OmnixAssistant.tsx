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

    const userMsg: Msg = { role: "user", content: text };
    const next: Msg[] = [...messages, userMsg];

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

      const aiMsg: Msg = {
        role: "assistant",
        content: data?.text || "Sorry, I couldn’t respond.",
      };

      setMessages([...next, aiMsg]);
    } catch (e) {
      const errMsg: Msg = {
        role: "assistant",
        content: "There was a connection issue. Please try again.",
      };
      setMessages([...next, errMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Chat bubble */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[9999] rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90"
        aria-label="Open chat"
      >
        {open ? "Close" : "Chat"}
      </button>

      {/* Chat panel */}
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
                className="flex-1 rounded-lg border px-3 py-2 text-sm focus:outline-none"
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
}// Add near the bottom of the panel, above the input:
{messages.length > 3 && (
  <button
    onClick={async () => {
      const contact = prompt("Leave your email or WhatsApp and I’ll send you a demo:");
      if (!contact) return;

      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact,
          context: messages.slice(-3).map(m => `${m.role}: ${m.content}`).join(" | "),
        }),
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Thanks! We’ll be in touch shortly to arrange your demo 🙌" },
      ]);
    }}
    className="mx-3 mb-2 rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
  >
    Request a demo
  </button>
)}