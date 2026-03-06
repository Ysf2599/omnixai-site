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

          <a
            href="#book"
            className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
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

                <Link
                  href="#book"
                  className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Book a demo
                </Link>

                <Link
                  href="#pricing"
                  className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  View pricing
                </Link>

              </div>

              {/* Feature pills */}

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

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Trusted by UK businesses
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
                      Want to see a quick demo?
                    </div>

                  </div>

                  <div className="mt-5 rounded-xl bg-white/10 px-4 py-3 text-xs opacity-90">
                    Captures leads • Qualifies prospects • Books calls
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Everything else remains exactly the same */}
      {/* Social Proof */}
      {/* Testimonials */}
      {/* Features */}
      {/* Pricing */}
      {/* FAQ */}
      {/* DemoCTA */}
      {/* Footer */}
      {/* OmnixAssistant */}

      <DemoCTA />

      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="text-sm text-slate-600">
            © {new Date().getFullYear()} OmnixAI
          </div>

          <div className="flex gap-6 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900">Features</a>
            <a href="#pricing" className="hover:text-slate-900">Pricing</a>
            <a href="#faq" className="hover:text-slate-900">FAQ</a>
          </div>
        </div>
      </footer>

      <OmnixAssistant />

    </main>
  );
}