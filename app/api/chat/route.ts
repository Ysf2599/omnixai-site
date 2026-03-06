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
        text.includes("business") ||
        text.includes("company") ||
        text.includes("service")
      ) {
        business = msg.content;
      }

      if (
        text.includes("leads") ||
        text.includes("bookings") ||
        text.includes("customers") ||
        text.includes("enquiries") ||
        text.includes("sales") ||
        text.includes("appointments")
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
The visitor is currently viewing the pricing section.

Your role is to help them understand the difference between the packages and guide them toward the best option for their business.
`;
  }

  if (p.includes("web")) {
    return `
PAGE CONTEXT:
The visitor may be interested in website development.

Explain that OmnixAI can be installed on existing websites or included in a new website build.
`;
  }

  return `
PAGE CONTEXT:
The visitor is browsing the homepage.

Your goal is to understand:
• what type of business they run
• what they want to improve on their website
• whether they want more enquiries, bookings, or a new website
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
You are OmnixAI, an AI conversion consultant for omnixai.co.uk.

Your role is to help businesses understand how OmnixAI can improve their website conversions.

${pageContext(pathname)}

Visitor Context
Business: ${context.business || "Unknown"}
Goal: ${context.goal || "Unknown"}

Offer Structure (must be accurate)

Standard AI Chatbox
£99 one-time setup
£49/month maintenance

Premium AI Assistant
£249 one-time setup
£149/month maintenance

Website + Premium AI
From £599 setup
£149/month maintenance

Consultation Behaviour

• Speak like a knowledgeable consultant
• Be clear and concise
• Ask ONE question at a time
• Focus on understanding the visitor's business
• Keep answers short and natural

Lead Qualification Strategy

When a conversation begins:

1. Ask what type of business they run.
2. Ask what they want to improve on their website.
3. Explain briefly how OmnixAI could help.
4. If they show interest, suggest seeing a walkthrough.

Do NOT ask for email or phone numbers.
The website popup collects their details.

Industry Awareness

If they mention their industry, tailor the conversation.

Examples:

Dental / medical
Ask about appointment bookings.

Restaurants
Ask about reservations.

Agencies
Ask about client enquiries.

Local services
Ask about lead generation.

E-commerce
Ask about product questions and conversions.

Conversion Guidance

When appropriate:

• suggest the most suitable package
• explain the difference between Standard and Premium
• mention the Website + AI option if they need a new website
• guide them toward requesting a walkthrough

Important Rules

• Never guarantee results
• Never claim to be human
• Always stay helpful and conversational
`,
        },

        ...history,

        {
          role: "user",
          content: message,
        },
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