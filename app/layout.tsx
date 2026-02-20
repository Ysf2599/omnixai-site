"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function OmnixAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m OmnixAI. Want more leads from your website or to see a demo?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Msg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });

      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600"
      >
        {open ? "Close" : "Chat"}
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 z-50 flex h-[460px] w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="font-semibold">OmnixAI Assistant</div>
            <div className="text-[10px] text-slate-400">Powered by OmnixAI</div>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto p-3 text-sm">
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
              <div className="text-xs text-slate-400">Typing…</div>
            )}
          </div>

          <div className="border-t p-2">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 rounded-lg border px-2 py-2 text-sm outline-none"
                placeholder="Type your message…"
              />
              <button
                onClick={sendMessage}
                className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600"
              >
                Send
              </button>
            </div>

            <div className="mt-2 text-center text-[10px] text-slate-400">
              Tip: You can leave your email or WhatsApp number to get the demo.
            </div>
          </div>
        </div>
      )}
    </>
  );
}