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
                AI assistants • Websites • 24/7 lead capture
              </span>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Turn website visitors into leads & bookings — automatically
              </h1>

              <p className="mt-6 max-w-xl text-lg text-slate-600">
                OmnixAI builds AI-powered assistants and high-converting websites that
                capture, qualify, and book leads around the clock.
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
                      Hi 👋 Want more leads from your website?
                    </div>
                    <div className="ml-auto max-w-[85%] rounded-2xl bg-white/20 px-4 py-3">
                      Yes, without hiring more staff.
                    </div>
                    <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3">
                      Perfect. I capture and qualify visitors 24/7 and book calls automatically.
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

      {/* Features */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Built to convert — not just chat.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              OmnixAI turns conversations into real leads and bookings.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Simple pricing. Real results.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* Standard */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold">Standard AI</div>
              <div className="mt-4 text-4xl font-semibold">£99</div>
              <div className="text-sm text-slate-600">setup</div>
              <div className="mt-2 text-2xl font-semibold">£49/mo</div>
              <Link href="#book" className="mt-6 inline-block w-full rounded-xl border px-6 py-3 text-center text-sm font-semibold">
                Choose Standard
              </Link>
            </div>

            {/* Premium */}
            <div className="relative rounded-2xl border border-orange-200 bg-white p-8 shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </div>
              <div className="text-sm font-semibold">Premium AI</div>
              <div className="mt-4 text-4xl font-semibold">£249</div>
              <div className="text-sm text-slate-600">setup</div>
              <div className="mt-2 text-2xl font-semibold">£149/mo</div>
              <Link href="#book" className="mt-6 inline-block w-full rounded-xl bg-orange-500 px-6 py-3 text-center text-sm font-semibold text-white">
                Choose Premium
              </Link>
            </div>

            {/* Website + AI */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold">Website + AI</div>
              <div className="mt-4 text-4xl font-semibold">From £599</div>
              <div className="text-sm text-slate-600">one-time build</div>
              <p className="mt-3 text-sm text-slate-600">
                High-converting website with OmnixAI built in.
              </p>
              <Link href="#book" className="mt-6 inline-block w-full rounded-xl border px-6 py-3 text-center text-sm font-semibold">
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold">FAQs</h2>
        </div>
      </section>

      <DemoCTA />
      <OmnixAssistant />
    </main>
  );
}