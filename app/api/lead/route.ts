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

    const email: string | null = body.email || null;
    const phone: string | null = body.phone || null;
    const message: string = body.message || "No message provided";
    const page: string = body.page || "unknown";
    const conversation = body.conversation || [];

    if (!email && !phone) {
      return NextResponse.json(
        { ok: false, error: "No contact provided" },
        { status: 400 }
      );
    }

    // Convert conversation to text
    const conversationText = conversation
      .map((m: any) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");

    // 🔥 AI Lead Summary
    let leadSummary = "Summary unavailable";

    try {
      const summaryResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `
Summarise this conversation between a website visitor and an AI assistant.

Return the result exactly like this:

Business:
Goal:
Intent Level: Low / Medium / High
Recommended Package: Standard / Premium / WebDev

Keep it short and structured.
`,
          },
          {
            role: "user",
            content: conversationText,
          },
        ],
      });

      leadSummary =
        summaryResponse.choices[0]?.message?.content || "Summary unavailable";
    } catch (err) {
      console.error("Summary generation failed:", err);
    }

    // 🔥 Basic Lead Classification
    let leadType: "WebDev" | "Premium" | "General" = "General";

    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("website") ||
      lowerMessage.includes("build") ||
      lowerMessage.includes("scratch") ||
      lowerMessage.includes("redesign")
    ) {
      leadType = "WebDev";
    } else if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("premium") ||
      lowerMessage.includes("optimisation")
    ) {
      leadType = "Premium";
    }

    // =============================
    // ADMIN EMAIL (YOU RECEIVE)
    // =============================
    await resend.emails.send({
      from: `OmnixAI Leads <${process.env.LEADS_FROM_EMAIL!}>`,
      to: [process.env.LEADS_TO_EMAIL!],
      subject: `[${leadType}] Lead | ${page} | ${email ?? phone}`,
      html: `
        <h2>New Lead</h2>

        <p><strong>Email:</strong> ${email ?? "Not provided"}</p>
        <p><strong>Phone:</strong> ${phone ?? "Not provided"}</p>
        <p><strong>Page:</strong> ${page}</p>
        <p><strong>Message:</strong> ${message}</p>

        <hr>

        <h3>AI Lead Summary</h3>
        <pre>${leadSummary}</pre>

        <hr>

        <h3>Conversation</h3>
        <pre>${conversationText}</pre>
      `,
    });

    // =============================
    // USER CONFIRMATION EMAIL
    // =============================
    if (email) {
      await resend.emails.send({
        from: `OmnixAI <${process.env.LEADS_FROM_EMAIL!}>`,
        to: [email],
        subject: "Your OmnixAI Walkthrough Request",
        html: `
          <h2>Thanks for your interest in OmnixAI</h2>

          <p>I’ve received your request and will send a tailored walkthrough shortly.</p>

          <p>We typically work with businesses focused on improving conversion performance and qualified enquiries.</p>

          <p>If there’s anything specific you'd like included, simply reply to this email.</p>

          <br/>

          <p>— OmnixAI</p>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead route error:", error);

    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}