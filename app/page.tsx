import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
<header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
  <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
    <a href="/" className="flex items-center">
      <img
        src="/logo.png"
        alt="OmnixAI logo"
        className="h-16 w-auto"
      />
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
          AI sales assistant • 24/7 lead capture
        </span>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
          Turn website visitors into leads — automatically
        </h1>

        <p className="mt-6 max-w-xl text-lg text-slate-600">
          OmnixAI answers questions, qualifies prospects, and books calls for you
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

        <div className="mt-10 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
            <div className="font-semibold text-slate-900">Custom trained</div>
            <div className="mt-1">On your pages + FAQs</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
            <div className="font-semibold text-slate-900">Lead capture</div>
            <div className="mt-1">Email + phone collection</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white/70 p-3">
            <div className="font-semibold text-slate-900">Bookings</div>
            <div className="mt-1">Routes to your calendar</div>
          </div>
        </div>
      </div>

      {/* Right – Chat card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl">
        <div className="flex items-center gap-2 px-2 pb-3">
          <span className="h-3 w-3 rounded-full bg-slate-300" />
          <span className="h-3 w-3 rounded-full bg-slate-300" />
          <span className="h-3 w-3 rounded-full bg-slate-300" />
          <span className="ml-auto text-xs text-slate-400">omnixai.ai</span>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-6 text-white">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="OmnixAI" className="h-5 w-5" />
            <p className="text-sm font-semibold">OmnixAI Assistant</p>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3">
              Hi 👋 What are you looking to improve on your website today?
            </div>

            <div className="ml-auto max-w-[85%] rounded-2xl bg-white/20 px-4 py-3">
              More leads without hiring.
            </div>

            <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3">
              Perfect. I can capture and qualify visitors 24/7 and book calls
              automatically. Want to see a quick demo?
            </div>

            <div className="ml-auto max-w-[85%] rounded-2xl bg-white/20 px-4 py-3">
              Yes please.
            </div>

            <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3">
              Great — what’s the best email to send your booking link?
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-white/10 px-4 py-3 text-xs opacity-90">
            Captures leads • Qualifies visitors • Books calls
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
        Choose the setup that fits your business — both include ongoing monthly maintenance.
      </p>
    </div>

    <div className="mt-12 grid gap-6 lg:grid-cols-2">
      {/* Standard */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold text-slate-900">
          Standard Chatbox
        </div>
        <p className="mt-2 text-sm text-slate-600">
          A clean AI chatbox trained on your business to answer questions and capture leads.
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
          <li className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-900" />
            <span>Trained on your website + FAQs</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-900" />
            <span>Lead capture prompts</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-900" />
            <span>Monthly updates & monitoring</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-900" />
            <span>Email support</span>
          </li>
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

        <div className="text-sm font-semibold text-slate-900">
          Premium Assistant
        </div>
        <p className="mt-2 text-sm text-slate-600">
          A more advanced assistant designed to qualify leads and push bookings more aggressively.
        </p>

        <div className="mt-6">
          <div className="text-4xl font-semibold text-slate-900">£399</div>
          <div className="mt-1 text-sm text-slate-600">one-time setup</div>
        </div>

        <div className="mt-4 flex items-end gap-2">
          <div className="text-3xl font-semibold text-slate-900">£149</div>
          <div className="pb-1 text-sm text-slate-600">/month maintenance</div>
        </div>

        <ul className="mt-6 space-y-2 text-sm text-slate-700">
          <li className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-900" />
            <span>Everything in Standard</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-900" />
            <span>Lead qualification flows</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-900" />
            <span>Booking + conversion optimization</span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-slate-900" />
            <span>Priority support + improvements</span>
          </li>
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
    </div>

    <p className="mt-8 text-center text-xs text-slate-500">
      Prices shown exclude VAT (if applicable). Cancel monthly maintenance anytime.
    </p>
  </div>
</section>

{/* FAQ */}
<section id="faq" className="py-24">
  <div className="mx-auto max-w-6xl px-6">
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold tracking-wider text-slate-500">
        FAQ
      </div>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
        Answers to common questions
      </h2>
      <p className="mt-3 text-base leading-7 text-slate-600">
        Quick answers to the things people ask before they book.
      </p>
    </div>

    <div className="mt-12 grid gap-6 md:grid-cols-2">
      {[
        {
          q: "What does the monthly maintenance include?",
          a: "Monthly maintenance covers updates to your knowledge base, monitoring, improvements based on real conversations, and support. Premium includes more proactive conversion and booking optimization.",
        },
        {
          q: "How is OmnixAI trained?",
          a: "We train it on your website pages, FAQs, and any documents you provide. We also tune the tone of voice to match your brand.",
        },
        {
          q: "How long does setup take?",
          a: "Standard is usually live within a few days. Premium can take a little longer if you want deeper lead qualification and booking flows.",
        },
        {
          q: "Can it capture leads and bookings?",
          a: "Yes. It can ask for key details (name, email, phone) and direct qualified visitors to your booking link. Premium is designed to qualify leads more strongly before booking.",
        },
        {
          q: "What if it doesn't know an answer?",
          a: "We can set guardrails so it asks follow-up questions, suggests contacting you, or routes to a form. Maintenance also helps improve responses over time.",
        },
        {
          q: "Can I customize how it looks on my website?",
          a: "Yes — we can match your colors, position, greeting message, and tone so it feels native to your brand.",
        },
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

{/* Demo Request */}
<section id="book" className="py-24">
  <div className="mx-auto max-w-6xl px-6">
    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-8 py-14 text-white">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-3xl font-semibold tracking-tight">
          Request a demo
        </h3>

        <p className="mt-3 text-base text-white/90">
          Leave your email or WhatsApp number and we’ll personally send you a demo.
        </p>

        <form className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Email address or WhatsApp number"
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-600"
          >
            Request demo
          </button>
        </form>

        <p className="mt-4 text-xs text-white/80">
          We’ll never spam you. One message to arrange the demo.
        </p>
      </div>
    </div>
  </div>
</section>



      {/* CTA anchor */}
      <section id="book" className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 px-10 py-14 text-center text-white">
          <h2 className="text-3xl font-semibold">Book a demo</h2>
          <p className="mt-3 text-white/90">
            We’ll show you how OmnixAI captures leads and books calls automatically.
          </p>
        </div>
      </section>
  <footer className="border-t border-slate-200 py-10">
  <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
    <div className="text-sm text-slate-600">
      © {new Date().getFullYear()} OmnixAI
    </div>

    <div className="flex gap-6 text-sm text-slate-600">
      <a href="#features" className="hover:text-slate-900">
        Features
      </a>
      <a href="#pricing" className="hover:text-slate-900">
        Pricing
      </a>
      <a href="#faq" className="hover:text-slate-900">
        FAQ
      </a>
    </div>
  </div>
</footer>


    </main>
  );
}
