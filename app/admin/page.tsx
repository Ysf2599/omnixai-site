"use client";
import { useEffect, useState } from "react";

type Counters = {
  opened: number;
  messages: number;
  demos: number;
};

export default function AdminPage() {
  const [data, setData] = useState<Counters | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/analytics");
    const json = await res.json();
    setData(json.counters);
    setLoading(false);
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 5000); // refresh every 5s
    return () => clearInterval(t);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">OmnixAI — Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Live chat engagement metrics (resets on deploy)
        </p>

        {loading ? (
          <div className="mt-6 text-slate-500">Loading…</div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Stat label="Chat opens" value={data?.opened ?? 0} />
            <Stat label="Messages sent" value={data?.messages ?? 0} />
            <Stat label="Demo requests" value={data?.demos ?? 0} />
          </div>
        )}

        <button
          onClick={load}
          className="mt-6 rounded-lg border bg-white px-4 py-2 text-sm hover:bg-slate-100"
        >
          Refresh
        </button>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-3xl font-semibold">{value}</div>
    </div>
  );
}