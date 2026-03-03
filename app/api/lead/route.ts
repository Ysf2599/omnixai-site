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

    if (!email && !phone) {
      return NextResponse.json(
        { ok: false, error: "No contact provided" },
        { status: 400 }
      );
    }

    // 🔥 Lead Scoring
    let leadType = "General";

    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("website") ||
      lowerMessage.includes("build") ||
      lowerMessage.includes("scratch")
    ) {
      leadType = "WebDev";
    } else if (
      lowerMessage.includes("price") ||
      lowerMessage.includes("cost") ||
      lowerMessage.includes("premium")
    ) {
      leadType = "Premium";
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);

    const result = await resend.emails.send({
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
      `,
    });

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Lead route error:", error);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 }
    );
  }
}