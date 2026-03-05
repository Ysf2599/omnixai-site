import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Msg = {
  role: "user" | "assistant";
  content: string;
};

function extractContext(history: Msg[]) {
  let business = "";
  let goal = "";

  for (const msg of history) {
    if (msg.role === "user") {
      const text = msg.content.toLowerCase();

      if (
        text.includes("clinic") ||
        text.includes("dentist") ||
        text.includes("agency") ||
        text.includes("restaurant") ||
        text.includes("lawyer") ||
        text.includes("shop") ||
        text.includes("ecommerce") ||
        text.includes("business")
      ) {
        business = msg.content;
      }

      if (
        text.includes("leads") ||
        text.includes("bookings") ||
        text.includes("customers") ||
        text.includes("enquiries")
      ) {
        goal = msg.content;
      }
    }
  }

  return { business, goal };
}

function pageContext(pathname: string) {
  const p = (pathname || "/").toLowerCase();

  if (p.includes("pricing")) {
    return `
PAGE CONTEXT:
The visitor is viewing the pricing page.

Help them understand the difference between packages and which option suits them best.
`;
  }

  if (p.includes("web")) {
    return `
PAGE CONTEXT:
The visitor is exploring web development services.

They may need a new website or redesign combined with AI automation.
`;
  }

  return `
PAGE CONTEXT:
General browsing.

Your goal is to understand their website and whether they want:
• more enquiries
• more bookings
• a new website
`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message: string = body?.message ?? "";
    const history: Msg[] = body?.history ?? [];
    const pathname: string = body?.pathname ?? "/";

    const context = extractContext(history);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: `
You are OmnixAI, a high-end AI conversion consultant for omnixai.co.uk.

${pageContext(pathname)}

Visitor Context
Business: ${context.business || "Unknown"}
Goal: ${context.goal || "Unknown"}

Offer Structure (must be accurate)

Standard AI Chatbox
£99 setup + £49/month

Premium AI Assistant
£249 one-time setup + monthly maintenance

Web Development + Premium AI
From £599 one-time setup + £149/month

Consultation Behaviour

• Speak like a professional consultant
• Ask thoughtful follow-up questions
• Ask ONE question at a time
• Keep answers concise
• Focus on understanding the visitor's business

Industry Awareness

If the visitor mentions their industry, tailor questions:

Dental / medical:
Ask about appointment bookings.

Restaurants:
Ask about reservations.

Agencies:
Ask about client enquiries.

Local services:
Ask about lead generation.

Ecommerce:
Ask about product enquiries or conversions.

Conversion Strategy

When appropriate:
• suggest the most suitable package
• recommend a walkthrough
• guide the visitor toward the next step

Do NOT ask for email or phone numbers.
The popup on the website handles lead capture.

Never guarantee results.
Never claim to be human.
`,
        },

        ...history,

        { role: "user", content: message },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Could you tell me a little more about your website and what you're trying to improve?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}