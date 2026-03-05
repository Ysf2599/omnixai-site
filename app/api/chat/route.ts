import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Msg = { role: "user" | "assistant"; content: string };

/*
Extract simple context from conversation
This allows the assistant to "remember" things like
business type and goals.
*/
function extractContext(history: Msg[]) {
  let business = "";
  let goal = "";

  for (const msg of history) {
    if (msg.role === "user") {
      const text = msg.content.toLowerCase();

      if (
        text.includes("clinic") ||
        text.includes("agency") ||
        text.includes("restaurant") ||
        text.includes("dentist") ||
        text.includes("lawyer") ||
        text.includes("shop") ||
        text.includes("ecommerce")
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

/*
Page context helps the AI tailor its responses
based on which page the visitor is on
*/
function pageContext(pathname: string) {
  const p = (pathname || "/").toLowerCase();

  if (p.includes("pricing")) {
    return `
PAGE CONTEXT: The visitor is viewing the pricing page.

Help them choose between the available packages.
Ask whether they want to improve an existing website or build a new one.
`;
  }

  if (p.includes("web")) {
    return `
PAGE CONTEXT: The visitor is on a web development related page.

They may be considering a new website or redesign.
Web Development + Premium AI is usually the best fit.
`;
  }

  return `
PAGE CONTEXT: The visitor is on a general page.

Your goal is to understand whether they want:
• more website enquiries
• better booking conversion
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

Behaviour rules:

• Be calm, strategic, and professional
• Keep answers concise
• Ask one question at a time
• If the visitor shows strong interest, suggest a tailored walkthrough
• Do NOT ask for email or phone numbers
• The website popup handles contact capture

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
      "Could you tell me a little more about what you're hoping to improve on your website?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}