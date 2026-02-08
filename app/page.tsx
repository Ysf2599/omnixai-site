import OmnixAssistant from "@/components/OmnixAssistant";
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
            Get a demo
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
                OmnixAI answers questions, qualifies prospects, and captures enquiries
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

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Trusted by UK businesses
              </div>
            </div>

            {/* Polished mock chat */}
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
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">Website Assistant</p>
                    <span className="text-[10px] text-white/70">Online</span>
                  </div>

                  <div className="mt-4 space-y-3 text-sm">
                    <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3">
                      Hi 👋 Looking to turn more visitors into leads?
                    </div>
                    <div className="ml-auto max-w-[85%] rounded-2xl bg-white/20 px-4 py-3">
                      Yeah, but I don’t want to hire staff.
                    </div>
                    <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3">
                      I can answer questions 24/7 and capture enquiries automatically.
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-white/10 px-4 py-3 text-xs opacity-90">
                    Answers questions • Captures leads • Books demos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-6 grid gap-6 sm:grid-cols-3">
          <Testimonial quote="We started getting enquiries within the first week." name="James, Service Business Owner" />
          <Testimonial quote="Handles FAQs and captures leads 24/7. Huge time saver." name="Sarah, E-commerce Founder" />
          <Testimonial quote="Feels like having a sales assistant without hiring." name="Mark, Agency Director" />
        </div>
      </section>

      {/* CTA – working */}
      <section id="book" className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-semibold">Get a personalised demo</h2>
          <p className="mt-3 text-white/90">
            Leave your email or WhatsApp number and we’ll send you a quick demo.
          </p>

          <form
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const input = form.elements.namedItem("contact") as HTMLInputElement;

              await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contact: input.value, context: "Homepage CTA" }),
              });

              input.value = "";
              alert("Thanks! We’ll be in touch shortly.");
            }}
          >
            <input
              name="contact"
              required
              placeholder="Email address or WhatsApp number"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <button
              type="submit"
              className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Request demo
            </button>
          </form>
        </div>
      </section>

      <OmnixAssistant />
    </main>
  );
}

function Testimonial(props: any) {
  const { quote, name } = props;
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-700">“{quote}”</p>
      <div className="mt-3 text-xs font-semibold text-slate-500">{name}</div>
    </div>
  );
}