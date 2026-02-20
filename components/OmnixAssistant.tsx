"use client";

import { useEffect, useState } from "react";

export default function OmnixAssistant() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Auto-open after 10 seconds
    const timer = setTimeout(() => {
      setOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700"
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Chat window */}
      {open && (
        <div className="mt-3 h-[420px] w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2">
            <div className="text-sm font-semibold text-slate-900">OmnixAI Assistant</div>
            <button
              onClick={() => setOpen(false)}
              className="text-xs text-slate-500 hover:text-slate-900"
            >
              Close
            </button>
          </div>

          {/* Replace this with your real assistant UI */}
          <div className="flex h-full flex-col p-4 text-sm text-slate-700">
            <div className="mb-2 rounded-xl bg-slate-100 p-2">
              Hi 👋 I’m OmnixAI. How can I help you today?
            </div>
            <div className="mt-auto text-xs text-slate-400">
              Demo assistant – connect your real AI here
            </div>
          </div>
        </div>
      )}
    </div>
  );
}