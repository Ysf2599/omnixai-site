import OmnixAssistant from "@/components/OmnixAssistant";
import DemoCTA from "@/components/DemoCTA";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="OmnixAI logo" className="h-16 w-auto" />
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
          </nav>

          <a href="#book" className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
            Book a demo
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-white" />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-700">
                AI sales assistant • 24/7 lead capture
              </span>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Turn website visitors into leads — automatically
              </h1>

              <p className="mt-6 max-w-xl text-lg text-slate-600">
                OmnixAI answers questions instantly, qualifies prospects, and books calls
                around the clock — so your website actually converts.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="#book" className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600">
                  Book a demo
                </Link>
                <Link href="#pricing" className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold hover:bg-slate-50">
                  View pricing
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
                  <div className="font-semibold text-slate-900">Custom trained</div>
                  <div className="mt-1">On your business & FAQs</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
                  <div className="font-semibold text-slate-900">Lead capture</div>
                  <div className="mt-1">Email & WhatsApp details</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
                  <div className="font-semibold text-slate-900">Bookings</div>
                  <div className="mt-1">Auto-books calls to your calendar</div>
                </div>
              </div>
            </div>

            {/* Mock chat */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-indigo-500/20 blur-2xl" />
              <div className="relative rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-2 px-2 pb-3">
                  <span className="h-3 w-3 rounded-full bg-red-400/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <span className="h-3 w-3 rounded-full bg-green-400/70" />
                  <span className="ml-auto text-xs text-slate-400">omnixai.co.uk</span>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-6 text-white">
                  <p className="text-sm font-semibold">OmnixAI Assistant</p>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3">
                      Hi 👋 What are you looking to improve on your website today?
                    </div>
                    <div className="ml-auto max-w-[85%] rounded-2xl bg-white/20 px-4 py-3">
                      More leads without hiring.
                    </div>
                    <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3">
                      Perfect. I can capture and qualify visitors 24/7 and book calls automatically.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Simple plans. Real results.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Standard Chatbox</div>
              <div className="mt-6 text-4xl font-semibold text-slate-900">£99</div>
              <div className="text-sm text-slate-600">setup</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">£49 / month</div>
            </div>

            <div className="relative rounded-2xl border border-orange-200 bg-white p-8 shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </div>
              <div className="text-sm font-semibold text-slate-900">Premium Assistant</div>
              <div className="mt-6 text-4xl font-semibold text-slate-900">£249</div>
              <div className="text-sm text-slate-600">setup</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">£149 / month</div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Website + AI</div>
              <div className="mt-6 text-4xl font-semibold text-slate-900">From £599</div>
              <div className="text-sm text-slate-600">one-time website build</div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">£149 / month maintenance</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (old layout, new questions) */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Answers to common questions
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Quick answers to the things people ask before they book.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              { q: "What does the monthly maintenance include?", a: "Ongoing updates, monitoring, and improvements to your AI assistant and website (if we built it)." },
              { q: "How is OmnixAI trained?", a: "On your website pages, FAQs, and any documents you provide, tuned to your brand voice." },
              { q: "How long does setup take?", a: "Standard assistants go live within days. Premium setups and website builds may take longer depending on scope." },
              { q: "Can it capture leads and bookings?", a: "Yes. OmnixAI captures details and can route qualified prospects to booking links." },
              { q: "Do you build the website as well as the AI assistant?", a: "Yes — we can build your website from scratch or integrate OmnixAI into your existing site." },
              { q: "What’s included in the website build?", a: "Starter builds include a 1–3 page custom site, mobile responsive design, basic SEO, and OmnixAI installed." },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="font-semibold text-slate-900">{item.q}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DemoCTA />
      <OmnixAssistant />
    </main>
  );
}