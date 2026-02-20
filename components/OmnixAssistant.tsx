"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Msg = { role: "user", content: input };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await res.json();

      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something went wrong. Try again." },
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
        className="fixed bottom-6 right-6 z-50 rounded-full bg-orange-500 px-4 py-3 text-white shadow-lg"
      >
        Chat
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 z-50 w-80 rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b px-4 py-3 font-semibold">
            OmnixAI Assistant
          </div>

          <div className="h-64 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 ${
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

          <div className="flex gap-2 border-t p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 rounded-lg border px-2 py-1 text-sm outline-none"
              placeholder="Ask something…"
            />
            <button
              onClick={sendMessage}
              className="rounded-lg bg-orange-500 px-3 py-1 text-sm text-white"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}