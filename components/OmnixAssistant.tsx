"use client";

import { useEffect, useState } from "react";

export default function OmnixAssistant() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 10000); // auto-open after 10s

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

      {/* REAL assistant */}
      {open && (
        <div className="mt-3 h-[520px] w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <iframe
            src="https://YOUR-REAL-ASSISTANT-URL"
            className="h-full w-full border-0"
            allow="clipboard-write; microphone"
          />
        </div>
      )}
    </div>
  );
}