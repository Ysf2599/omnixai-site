import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Chatbot for Websites | OmnixAI",
  description:
    "Install an AI chatbot on your website that answers questions, qualifies visitors, and captures leads automatically.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white text-slate-900 px-6 py-20">
      <div className="mx-auto max-w-3xl">

        <h1 className="text-4xl font-semibold">
          AI Chatbot for Websites
        </h1>

        <p className="mt-6 text-lg text-slate-600">
          An AI chatbot can transform your website into a 24/7 lead generation tool.
          Instead of missing enquiries, visitors can ask questions and receive
          instant answers.
        </p>

        <p className="mt-4 text-slate-600">
          OmnixAI installs an AI assistant on your website that understands
          your business, responds to visitors, and captures contact details
          when someone shows interest.
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          How AI Chatbots Help Businesses
        </h2>

        <ul className="mt-4 space-y-3 text-slate-600">
          <li>• Answer visitor questions instantly</li>
          <li>• Capture leads automatically</li>
          <li>• Qualify potential customers</li>
          <li>• Book enquiries directly from your website</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">
          Install an AI Chatbot on Your Website
        </h2>

        <p className="mt-4 text-slate-600">
          OmnixAI makes it easy for businesses to install a powerful AI
          assistant on their website without complicated setup.
        </p>

        <p className="mt-4 text-slate-600">
          See how it works by chatting with the assistant on our homepage.
        </p>

      </div>
    </main>
  );
}