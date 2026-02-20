import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Resend } from "resend";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const resend = new Resend(process.env.RESEND_API_KEY!);

type Msg = { role: "user" | "assistant"; content: string };

function extractContact(text: string) {
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];

  // Stronger phone detection (handles UK + intl, spaces, hyphens, brackets)
  const phone = text
    .match(
      /(\+?\d{1,3}[\s.-]?)?(\(?\d{2,5}\)?[\s.-]?)?\d{3,5}[\s.-]?\d{3,5}[\s.-]?\d{0,5}/
    )?.[0]
    ?.trim();

  // Filter out tiny/false matches
  const cleanPhone =
    phone && phone.replace(/\D/g, "").length >= 9 ? phone : undefined;

  return { email, phone: cleanPhone };
}

function shouldAskForContact(userText: string) {
  const t = userText.toLowerCase();
  const intentWords = [
    "demo",
    "price",
    "pricing",
    "cost",
    "setup",
    "subscribe",
    "buy",
    "purchase",
    "interested",
    "get started",
    "book",
    "call",
    "whatsapp",
  ];
  return intentWords.some((w) => t.includes(w));
}

async function sendLeadEmail(payload: {
  email?: string;
  phone?: string;
  lastMessage: string;
}) {
  const to = process.env.LEADS_TO_EMAIL!;
  const from = process.env.LEADS_FROM_EMAIL || "onboarding@resend.dev";

  await resend.emails.send({
    from: `OmnixAI Leads <${from}>`,
    to: [to],
    subject: "🔥 New OmnixAI website lead",
    html: `
      <h2>New lead from your website</h2>
      <p><strong>Email:</strong> ${payload.email ?? "Not provided"}</p>
      <p><strong>Phone/WhatsApp:</strong> ${payload.phone ?? "Not provided"}</p>
      <p><strong>Last message:</strong> ${payload.lastMessage}</p>
    `,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const message: string = body?.message ?? "";
  const history: Msg[] = body?.history ?? [];

  const { email, phone } = extractContact(message);

  // Log so you can confirm in Vercel logs
  console.log("OmnixAI incoming:", message);
  console.log("Detected contact:", { email, phone });

  // If user provided contact details, email you immediately
  if (email || phone) {
    try {
      await sendLeadEmail({ email, phone, lastMessage: message });
      return NextResponse.json({
        reply:
          "Perfect — thanks. I’ve got that. We’ll send you the demo shortly. Anything specific you want OmnixAI to handle on your site (leads, bookings, FAQs)?",
      });
    } catch (err) {
      console.error("Lead email failed:", err);
      return NextResponse.json({
        reply:
          "Thanks — I’ve got your details. (There was a delivery issue on our side, but we’ll still reach out.) What type of business is your website for?",
      });
    }
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content: `
You are OmnixAI, a high-converting AI sales assistant for omnixai.ai.

PRIMARY GOAL
Convert visitors into leads by:
- understanding their business and goals
- explaining OmnixAI clearly
- prompting for email/WhatsApp at the right moment

PRODUCT (must be accurate)
Two options:
1) Standard Chatbox: £99 setup + £49/month maintenance
2) Premium Assistant: £399 setup + £149/month maintenance (more advanced qualification + booking optimization)

BEHAVIOR
- Be concise and confident, not pushy.
- Ask 1 question at a time.
- When user shows intent, ask for: "email or WhatsApp number to send the demo".
- If asked "best option", recommend Premium for serious lead-gen, Standard for basic coverage.
- Do not guarantee results.
- Never claim to be human.
        `,
      },
      ...history,
      { role: "user", content: message },
    ],
  });

  let reply =
    completion.choices[0]?.message?.content ||
    "I can help with features, pricing, or sending a demo. What’s your goal for the website?";

  // Nudge for contact if intent is detected
  if (shouldAskForContact(message)) {
    reply +=
      "\n\nIf you want, leave your email or WhatsApp number and I’ll send you the demo.";
  }

  return NextResponse.json({ reply });
}