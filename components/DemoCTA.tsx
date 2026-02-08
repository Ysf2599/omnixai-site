"use client";

export default function DemoCTA() {
  return (
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
  );
}