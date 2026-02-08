"use client";
import { useEffect, useState } from "react";

type Counters = {
  opened: number;
  messages: number;
  demos: number;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<Counters | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/analytics");
    const json = await res.json();
    setData(json.counters);
    setLoading(false);
  }

  async function login() {
    setError("");
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const json = await res.json();
    if (json.ok) {
      setAuthed(true);
      load();
    } else {
      setError("Incorrect password");
    }
  }

  useEffect(() => {
    if (authed) {
      const t = setInterval(load, 5000);
      return () => clearInterval(t);
    }
  }, [authed]);

  if (!authed) {
    return (
      <main className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
        <div className="w-full max-w-sm rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-lg font-semibold">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-600">
            Enter password to view analytics
          </p>
          <input
            type="password"
            className="mt-4 w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <button
            onClick={login}
            className="mt-4 w-full rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">OmnixAI — Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Live chat engagement metrics (resets on deploy)
        </p>

        {!data ? (
          <div className="mt-6 text-slate-500">Loading…</div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Stat label="Chat opens" value={data.opened} />
            <Stat label="Messages sent" value={data.messages} />
            <Stat label="Demo requests" value={data.demos} />
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