import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email: string | null = body.email || null;
    const phone: string | null = body.phone || null;
    const message: string = body.message || "No message provided";
    const page: string = body.page || "unknown";
    const conversation = body.conversation || [];

const conversationText = conversation
  .map((m: any) => `<strong>${m.role.toUpperCase()}:</strong> ${m.content}`)
  .join("<br><br>");

    if (!email && !phone) {
      return NextResponse.json(
        { ok: false, error: "No contact provided" },
        { status: 400 }
      );
    }

    // 🔥 Lead Classification
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

    const resend = new Resend(process.env.RESEND_API_KEY!);

    // =============================
    // 1️⃣ ADMIN NOTIFICATION EMAIL
    // =============================
    await resend.emails.send({
      from: `OmnixAI Leads <${process.env.LEADS_FROM_EMAIL!}>`,
      to: [process.env.LEADS_TO_EMAIL!],
      subject: `[${leadType}] Lead | ${page} | ${email ?? phone}`,
      html: `

<h2>New Lead</h2>
<p><strong>Type:</strong> ${leadType}</p>
<p><strong>Email:</strong> ${email ?? "Not provided"}</p>
<p><strong>Phone:</strong> ${phone ?? "Not provided"}</p>
<p><strong>Page:</strong> ${page}</p>
<p><strong>Message:</strong> ${message}</p>

<hr>

<h3>Conversation</h3>
<p>${conversationText}</p>
      `,
    });

    // =============================
    // 2️⃣ USER CONFIRMATION EMAIL
    // =============================
    if (email) {
      let confirmationContent = `
        <p>I’ve received your request and will send a tailored walkthrough shortly.</p>
      `;

      if (leadType === "WebDev") {
        confirmationContent = `
          <p>It looks like you're considering a website build or upgrade.</p>
          <p>I’ll outline how we structure high-converting websites integrated with Premium AI.</p>
        `;
      } else if (leadType === "Premium") {
        confirmationContent = `
          <p>You’re exploring Premium AI optimisation.</p>
          <p>I’ll show you how advanced qualification and booking optimisation would apply to your setup.</p>
        `;
      }

      await resend.emails.send({
        from: `OmnixAI <${process.env.LEADS_FROM_EMAIL!}>`,
        to: [email],
        subject: "Your OmnixAI Walkthrough Request",
        html: `
          <h2>Thanks for your interest in OmnixAI</h2>
          ${confirmationContent}
          <p>If there’s anything specific you'd like included, simply reply to this email.</p>
          <br />
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