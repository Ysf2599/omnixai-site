import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: string = body?.message ?? "";
    const history: Msg[] = body?.history ?? [];
    const pathname: string = body?.pathname ?? "unknown";

    if (!message) {
      return NextResponse.json({ reply: "What can I help you with?" });
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
Help visitors understand OmnixAI and encourage demo requests.

PRODUCT (must be accurate)
Standard Chatbox: £99 setup + £49/month
Premium Assistant: £399 setup + £149/month

BEHAVIOUR
- Be concise, friendly, and helpful.
- Ask one short qualifying question when useful.
- If user shows interest in a demo or pricing, suggest booking a demo.
- Do not guarantee results.
- Never claim to be human.
          `,
        },
        ...history,
        { role: "user", content: message },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "I can help with pricing, features, or booking a demo. What would you like to know?";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json({
      reply:
        "Sorry, something went wrong on my side. Please try again or I can have a human reach out.",
    });
  }
}