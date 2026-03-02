import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body.email || null;
    const phone = body.phone || null;
    const message = body.message || "No message provided";
    const page = body.page || "unknown";

    // Require at least email OR phone
    if (!email && !phone) {
      return NextResponse.json(
        { ok: false, error: "No contact provided" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: `OmnixAI Leads <${process.env.LEADS_FROM_EMAIL!}>`,
      to: [process.env.LEADS_TO_EMAIL!],
      subject: "🔥 New OmnixAI Demo Request",
      html: `
        <h2>New demo request</h2>
        <p><strong>Email:</strong> ${email ?? "Not provided"}</p>
        <p><strong>Phone:</strong> ${phone ?? "Not provided"}</p>
        <p><strong>Page:</strong> ${page}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead route error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}