import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Msg = { role: "user" | "assistant"; content: string };

function pageContext(pathname: string) {
  const p = pathname.toLowerCase();

  if (p.includes("pricing")) {
    return `
The visitor is on the pricing page.
Help them decide between Standard, Premium, or Web Development + Premium.
`;
  }

  if (p.includes("web")) {
    return `
The visitor is viewing a web development related page.
They may be considering a new website or redesign.
`;
  }

  return `
The visitor is likely on the homepage or a general page.
Identify whether they want more leads, bookings, or a new website.
`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message: string = body?.message ?? "";
    const history: Msg[] = body?.history ?? [];
    const pathname: string = body?.pathname ?? "/";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: `
You are OmnixAI, a high-end AI conversion consultant.

${pageContext(pathname)}

Tone:
- calm
- strategic
- concise
- professional

Offers:

Standard AI Chatbox
£99 setup + £49/month

Premium AI Assistant
£249 one-time + monthly maintenance

Web Development + Premium AI
From £599 one-time + £149/month

When users ask about pricing or setup, guide them toward a tailored walkthrough.

Do not ask for email directly.
The website popup collects contact details.
`,
        },
        ...history,
        { role: "user", content: message },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Could you clarify what you're hoping to improve on your website?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}