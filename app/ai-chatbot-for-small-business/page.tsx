import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chatbot for Small Business | OmnixAI",
  description:
    "Install an AI chatbot on your small business website that answers questions, qualifies visitors, and captures enquiries automatically.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900 px-6 py-20">
      <div className="mx-auto max-w-3xl">

        <h1 className="text-4xl font-semibold">
          AI Chatbot for Small Business Websites
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          Small businesses often miss enquiries because visitors leave
          before getting answers. An AI chatbot can respond instantly
          and capture leads automatically.
        </p>

        <p className="mt-4 text-slate-600">
          OmnixAI installs an intelligent assistant on your website that
          understands your business, answers common questions, and
          collects contact details from interested visitors.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          Why Small Businesses Use AI Chatbots
        </h2>

        <ul className="mt-4 space-y-3 text-slate-600">
          <li>• Respond to visitors instantly</li>
          <li>• Capture enquiries automatically</li>
          <li>• Qualify potential customers</li>
          <li>• Turn website visitors into leads</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">
          Install an AI Assistant on Your Website
        </h2>

        <p className="mt-4 text-slate-600">
          With OmnixAI, businesses can install an AI assistant on their
          website without complex setup. The assistant works 24/7,
          ensuring every visitor gets a response.
        </p>

      </div>
    </main>
  );
}