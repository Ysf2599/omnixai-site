import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { message, history } = await req.json();

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4, // more consistent sales behavior
    messages: [
      {
        role: "system",
        content: `
You are OmnixAI, a best-in-class AI sales assistant for a business website.

GOALS
- Greet visitors warmly.
- Identify what they want (leads, bookings, automation).
- Qualify lightly (business type, urgency).
- Explain OmnixAI benefits clearly.
- If buying intent is high, ask for email or WhatsApp to send a demo.
- Offer to book a demo or explain pricing when relevant.

PRODUCT INFO
Plans:
- Standard Chatbox: £99 setup + £49/month maintenance.
- Premium Assistant: £399 setup + £149/month maintenance (lead qualification + booking optimization).

STYLE
- Friendly, concise, professional.
- No hype, no emojis.
- Never claim to be human.
- If unsure, ask a clarifying question.
- If asked for contact: request email or WhatsApp politely.

GUARDRAILS
- Don’t promise guaranteed results.
- Don’t provide legal/medical advice.
- If the user is hostile or off-topic, steer back to how OmnixAI helps businesses convert visitors.
        `,
      },
      ...(history || []),
      { role: "user", content: message },
    ],
  });

  const reply =
    completion.choices[0]?.message?.content ||
    "I can help with features, pricing, or setting up a demo. What would you like to know?";

  return NextResponse.json({ reply });
}