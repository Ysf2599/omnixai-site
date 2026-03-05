import { NextResponse } from "next/server";
import { Resend } from "resend";
import OpenAI from "openai";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body.email || null;
    const phone = body.phone || null;
    const message = body.message || "No message";
    const page = body.page || "unknown";
    const visitorId = body.visitorId || "unknown";
    const conversation = body.conversation || [];

    const conversationText = conversation
      .map((m: any) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");

    let summary = "Unavailable";

    try {
      const ai = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `
Analyse this lead conversation.

Return in this exact format:

Lead Score: 1-10
Conversion Likelihood: Low / Medium / High
Business Type:
Primary Goal:
Recommended Package: Standard / Premium / WebDev

Score leads higher if they:
- ask about pricing
- mention their business
- want better enquiries/bookings
- ask about setup or demo
`          },
          {
            role: "user",
            content: conversationText,
          },
        ],
      });

      summary = ai.choices[0]?.message?.content || "Unavailable";
    } catch {}

    await resend.emails.send({
      from: `OmnixAI <${process.env.LEADS_FROM_EMAIL!}>`,
      to: [process.env.LEADS_TO_EMAIL!],
      subject: `New Lead | ${page}`,
      html: `
      <h2>New Lead</h2>

      <p><strong>Visitor ID:</strong> ${visitorId}</p>
      <p><strong>Email:</strong> ${email ?? "Not provided"}</p>
      <p><strong>Phone:</strong> ${phone ?? "Not provided"}</p>
      <p><strong>Page:</strong> ${page}</p>

      <hr>

      <h3>AI Lead Summary</h3>
      <pre>${summary}</pre>

      <hr>

      <h3>Conversation</h3>
      <pre>${conversationText}</pre>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}