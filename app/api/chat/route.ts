import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Resend } from "resend";

export const runtime = "nodejs"; // safer for SDKs in prod

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const resend = new Resend(process.env.RESEND_API_KEY!);

type Msg = { role: "user" | "assistant"; content: string };

// ---- Helpers ----
function extractContact(text: string) {
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];

  const phoneMatch = text.match(
    /(\+?\d{1,3}[\s.-]?)?(\(?\d{2,5}\)?[\s.-]?)?\d{3,5}[\s.-]?\d{3,5}[\s.-]?\d{0,5}/
  );

  const phone = phoneMatch?.[0]?.trim();
  const cleanPhone =
    phone && phone.replace(/\D/g, "").length >= 9 ? phone : undefined;

  return { email, phone: cleanPhone };
}

function detectIntentScore(userText: string) {
  const t = userText.toLowerCase();
  let score = 0;

  const highIntent = [
    "demo",
    "pricing",
    "price",
    "cost",
    "book",
    "call",
    "setup",
    "integrate",
    "buy",
  ];
  const mediumIntent = ["interested", "get started", "features", "how does it work"];

  highIntent.forEach((w) => t.includes(w) && (score += 2));
  mediumIntent.forEach((w) => t.includes(w) && (score += 1));

  return score;
}

async function sendLeadEmail(payload: {
  email?: string;
  phone?: string;
  lastMessage: string;
  intentScore: number;
  page?: string;
}) {
  const to = process.env.LEADS_TO_EMAIL!;
  const from = process.env.LEADS_FROM_EMAIL || "onboarding@resend.dev";

  await resend.emails.send({
    from: `OmnixAI Leads <${from}>`,
    to: [to],
    subject: payload.intentScore >= 3 ? "🔥 HOT OmnixAI Lead" : "New OmnixAI Lead",
    html: `
      <h2>New lead from OmnixAI website</h2>
      <p><strong>Email:</strong> ${payload.email ?? "Not provided"}</p>
      <p><strong>Phone/WhatsApp:</strong> ${payload.phone ?? "Not provided"}</p>
      <p><strong>Intent score:</strong> ${payload.intentScore}</p>
      <p><strong>Page:</strong> ${payload.page ?? "unknown"}</p>
      <p><strong>Last message:</strong> ${payload.lastMessage}</p>
      <hr />
      <p><em>Source: omnixai.co.uk AI Assistant</em></p>
    `,
  });
}

// ---- Route ----
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: string = body?.message ?? "";
    const history: Msg[] = body?.history ?? [];
    const pathname: string = body?.pathname ?? "unknown";

    if (!message) {
      return NextResponse.json({ reply: "What can I help you with?" });
    }

    const { email, phone } = extractContact(message);
    const intentScore = detectIntentScore(message);

    console.log("OmnixAI incoming:", { message, intentScore, pathname });

    // If contact info detected → email you instantly
    if (email || phone) {
      await sendLeadEmail({
        email,
        phone,
        lastMessage: message,
        intentScore,
        page: pathname,
      });

      return NextResponse.json({
        reply:
          "Thanks! I’ve sent that to the team. We’ll be in touch shortly. In the meantime, what would you like OmnixAI to handle on your website—leads, bookings, or FAQs?",
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `
You are OmnixAI’s Premium AI sales assistant for omnixai.co.uk.

CONTEXT
User is currently on page: ${pathname}

PRIMARY GOAL
Convert qualified visitors into leads by collecting email or WhatsApp.

PRODUCT (must be accurate)
Standard Chatbox: £99 setup + £49/month
Premium Assistant: £399 setup + £149/month

RULES
- Be concise, friendly, and confident.
- Ask one short qualifying question when helpful.
- When intent is high, ask for email or WhatsApp to send a demo.
- Recommend Premium for serious lead-gen needs.
- Never guarantee results.
- Offer human follow-up if user wants to talk to a person.
          `,
        },
        ...history,
        { role: "user", content: message },
      ],
    });

    let reply =
      completion.choices[0]?.message?.content ||
      "I can help with pricing, features, or how this works. What’s your main goal for your website?";

    // Smart nudge only for warm/hot leads
    if (intentScore >= 3) {
      reply +=
        "\n\nIf you want, drop your email or WhatsApp number and I’ll send you a quick demo + details.";
    }

    return NextResponse.json({ reply, intentScore });
  } catch (err) {
    console.error("AI route error:", err);
    return NextResponse.json({
      reply:
        "Sorry—something went wrong on my side. Want to try again or should I have a human reach out?",
    });
  }
}