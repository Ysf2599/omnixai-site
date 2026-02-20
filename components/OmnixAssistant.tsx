"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi, I’m OmnixAI. I can help you capture more leads and book more calls from your website. What’s your main goal?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Msg = { role: "user", content: input };
    const nextHistory = [...messages, userMessage];

    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, history: messages }),
      });

      const data = await res.json();

      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Bubble */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600"
      >
        Chat with OmnixAI
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 flex h-[440px] w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
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
              <div className="text-xs text-slate-400">
                OmnixAI is typing…
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