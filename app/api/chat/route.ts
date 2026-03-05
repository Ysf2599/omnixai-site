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

    // Simple context memory
    let contextSummary = "";

    for (const msg of history) {
      if (msg.role === "user") {
        const lower = msg.content.toLowerCase();

        if (
          lower.includes("agency") ||
          lower.includes("clinic") ||
          lower.includes("lawyer") ||
          lower.includes("restaurant") ||
          lower.includes("ecommerce") ||
          lower.includes("consultant") ||
          lower.includes("real estate")
        ) {
          contextSummary = `User business context: ${msg.content}`;
          break;
        }
      }
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content: `
You are OmnixAI, a high-end AI conversion consultant for omnixai.co.uk.

${contextSummary ? contextSummary : ""}

Your role:
• Understand the visitor’s business stage
• Identify website conversion opportunities
• Recommend the most strategic solution
• Guide them toward a tailored walkthrough

Tone:
• Calm
• Intelligent
• Strategic
• Concise
• Professional
• Never pushy
• No emojis
• No hype

Offer Structure:

1) Standard AI Chatbox  
£99 setup + £49/month  
Basic coverage and FAQ handling.

2) Premium AI Assistant  
£249 one-time setup + monthly maintenance  
Advanced qualification, booking optimisation and intelligent routing.  
Best for businesses focused on serious lead generation.

3) Web Development + Premium AI  
From £599 one-time + £149/month  
Full website build integrated with OmnixAI and conversion optimisation.

When pricing intent appears:
Ask one clarifying question:

"Are you improving an existing website, or building one from scratch?"

Recommendation logic:
• Existing website → recommend Premium AI Assistant
• New website → recommend Web Development + Premium AI

Conversation closing behaviour:

When appropriate, say something like:

"I can prepare a tailored walkthrough showing how this would work for your setup."

Do NOT ask for email.
Do NOT ask for phone numbers.
The website handles contact capture separately.

Never guarantee results.
Never claim to be human.
Always operate like a strategic consultant.
`,
        },
        ...history,
        { role: "user", content: message },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Could you clarify your goals a little further?";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat route error:", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}