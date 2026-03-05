import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type Msg = { role: "user" | "assistant"; content: string };

function pageContext(pathname: string) {
  const p = (pathname || "/").toLowerCase();

  if (p.includes("pricing")) {
    return `
PAGE CONTEXT: Pricing page.
- Help them decide fast between Standard, Premium, or Web Development + Premium.
- Ask: "Improving an existing website or building from scratch?"
`;
  }

  if (p.includes("web") || p.includes("website")) {
    return `
PAGE CONTEXT: Web development page.
- Assume they may be considering a new site or redesign.
- Position Web Development + Premium AI (from £599 one-time + £149/month) as best fit.
- Ask: "Starting from scratch or upgrading?"
`;
  }

  return `
PAGE CONTEXT: General page.
- Identify whether they want more enquiries, more bookings, or a new website.
- Route toward Premium or Web Dev + Premium when appropriate.
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
You are OmnixAI, a high-end AI conversion consultant for omnixai.co.uk.

${pageContext(pathname)}

Tone:
- calm
- strategic
- concise
- professional
- ask ONE question at a time
- before advising, briefly restate the user's situation in your own words

Offers (must be accurate):
1) Standard AI Chatbox: £99 setup + £49/month
2) Premium AI Assistant: £249 one-time setup + monthly maintenance
3) Web Development + Premium AI: from £599 one-time + £149/month

Rules:
- Never guarantee results.
- Never claim to be human.
- Do NOT ask for email or phone numbers. The website popup handles contact capture.
- When user shows interest (pricing/setup/results), encourage a "tailored walkthrough" in natural language.
`,
        },
        ...history,
        { role: "user", content: message },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Could you clarify your goal — more enquiries, more bookings, or a new website?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}