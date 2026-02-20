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
            {/* Left */}
            <div>
              <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-700">
                AI assistants • Websites • 24/7 lead capture
              </span>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Turn website visitors into leads — automatically
              </h1>

              <p className="mt-6 max-w-xl text-lg text-slate-600">
                OmnixAI builds AI assistants and high-converting websites that capture,
                qualify, and book leads around the clock — so your website actually converts.
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

            {/* Right – Mock chat */}
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

      {/* Social proof */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-center text-sm text-slate-600">
              Early clients are already booking calls automatically.
            </p>

            <div className="mt-6 grid grid-cols-3 items-center justify-items-center gap-6 opacity-70 sm:grid-cols-6">
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="h-4 w-20 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <div className="text-xs font-semibold tracking-wider text-slate-500">
              TESTIMONIALS
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              What early users are saying
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Real feedback from businesses using OmnixAI.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-700">
                “We started getting enquiries within the first week of adding OmnixAI.”
              </p>
              <div className="mt-3 text-xs font-semibold text-slate-500">
                James, Service Business Owner
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-700">
                “The assistant handles our FAQs and captures leads 24/7. Huge time saver.”
              </p>
              <div className="mt-3 text-xs font-semibold text-slate-500">
                Sarah, E-commerce Founder
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-700">
                “Feels like having a sales assistant on the site without hiring anyone.”
              </p>
              <div className="mt-3 text-xs font-semibold text-slate-500">
                Mark, Agency Director
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold tracking-wider text-slate-500">
              WHY OMNIXAI
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Built to convert — without hiring more staff.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              OmnixAI answers questions instantly, qualifies prospects, and pushes the best leads to book calls.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Works 24/7",
                desc: "Never miss a lead — respond instantly, even after hours.",
                items: ["Instant answers", "Lead qualification", "Always-on availability"],
              },
              {
                title: "Trained on your business",
                desc: "Uses your pages, FAQs, and tone of voice.",
                items: ["Website ingestion", "Custom tone", "Continuous updates"],
              },
              {
                title: "Turns chats into bookings",
                desc: "Captures details and routes prospects to your calendar.",
                items: ["Lead capture", "Booking links", "CRM-ready exports"],
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {f.items.map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-900" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-slate-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold tracking-wider text-slate-500">
              PRICING
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Simple plans. Real results.
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Choose the setup that fits your business — all plans include ongoing monthly maintenance.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {/* Standard */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Standard Chatbox</div>
              <p className="mt-2 text-sm text-slate-600">
                AI chatbox trained on your business to answer questions and capture leads.
              </p>

              <div className="mt-6">
                <div className="text-4xl font-semibold text-slate-900">£99</div>
                <div className="mt-1 text-sm text-slate-600">one-time setup</div>
              </div>

              <div className="mt-4 flex items-end gap-2">
                <div className="text-3xl font-semibold text-slate-900">£49</div>
                <div className="pb-1 text-sm text-slate-600">/month maintenance</div>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />Trained on your website + FAQs</li>
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />Lead capture prompts</li>
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />Monthly updates & monitoring</li>
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />Email support</li>
              </ul>

              <div className="mt-8">
                <Link
                  href="#book"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Choose Standard
                </Link>
              </div>
            </div>

            {/* Premium */}
            <div className="relative rounded-2xl border border-orange-200 bg-white p-8 shadow-lg">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </div>

              <div className="text-sm font-semibold text-slate-900">Premium Assistant</div>
              <p className="mt-2 text-sm text-slate-600">
                Advanced assistant designed to qualify leads and push bookings more aggressively.
              </p>

              <div className="mt-6">
                <div className="text-4xl font-semibold text-slate-900">£249</div>
                <div className="mt-1 text-sm text-slate-600">one-time setup</div>
              </div>

              <div className="mt-4 flex items-end gap-2">
                <div className="text-3xl font-semibold text-slate-900">£149</div>
                <div className="pb-1 text-sm text-slate-600">/month maintenance</div>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />Everything in Standard</li>
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />Lead qualification flows</li>
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />Booking + conversion optimisation</li>
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />Priority support + improvements</li>
              </ul>

              <div className="mt-8">
                <Link
                  href="#book"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  Choose Premium
                </Link>
              </div>
            </div>

            {/* Website + AI */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">Website + AI (Done-For-You)</div>
              <p className="mt-2 text-sm text-slate-600">
                High-converting website with OmnixAI built in to turn visitors into qualified leads and bookings.
              </p>

              <div className="mt-6">
                <div className="text-4xl font-semibold text-slate-900">From £599</div>
                <div className="mt-1 text-sm text-slate-600">one-time website build</div>
              </div>

              <div className="mt-4 flex items-end gap-2">
                <div className="text-3xl font-semibold text-slate-900">£149</div>
                <div className="pb-1 text-sm text-slate-600">/month maintenance</div>
              </div>

              <ul className="mt-6 space-y-2 text-sm text-slate-700">
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />1–3 page custom website</li>
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />Mobile responsive design</li>
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />Basic SEO setup</li>
                <li className="flex gap-2"><span className="mt-1 inline-block h-2 w-2 rounded-full bg-slate-900" />OmnixAI assistant installed</li>
              </ul>

              <div className="mt-8">
                <Link
                  href="#book"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Get a Website + AI Quote
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-500">
            Prices shown exclude VAT (if applicable). Cancel monthly maintenance anytime.
          </p>
        </div>
      </section>

 {[

{/* FAQ */}
<section id="faq" className="py-24">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold tracking-wider text-slate-500">FAQ</div>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
        Answers to common questions
      </h2>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Quick answers to the things people ask before they book.
      </p>
    </div>

    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {[
        { q: "What does the monthly maintenance include?", a: "Ongoing updates, monitoring, improvements based on real chats, and support for both the AI assistant and your website (if we built it)." },
        { q: "How is OmnixAI trained?", a: "On your website pages, FAQs, and any documents you provide, tuned to your brand voice and services." },
        { q: "How long does setup take?", a: "Standard assistants go live within days. Premium setups and website builds may take a little longer depending on scope." },
        { q: "Can it capture leads and bookings?", a: "Yes. OmnixAI captures visitor details and can route qualified prospects to booking links or your CRM." },
        { q: "Do you build the website as well as the AI assistant?", a: "Yes. We can build your website from scratch and embed OmnixAI, or integrate OmnixAI into your existing site." },
        { q: "What’s included in the website build?", a: "Starter builds include a 1–3 page custom website, mobile responsive design, basic SEO setup, contact forms, and OmnixAI fully installed. Larger builds and custom features are available as upgrades." },
      ].map((item) => (
        <div
          key={item.q}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="font-semibold text-slate-900">{item.q}</div>
          <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Demo CTA + Live Assistant */}
      <DemoCTA />
      <OmnixAssistant />
    </main>
  );
}