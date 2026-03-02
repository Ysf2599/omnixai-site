throw new Error("LEAD ROUTE TEST CRASH");

import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    console.log("Lead route hit");

    const body = await req.json();
    console.log("Payload received:", body);

    const email = body.email || null;
    const phone = body.phone || null;
    const message = body.message || "No message provided";
    const page = body.page || "unknown";

    // Require at least one contact method
    if (!email && !phone) {
      console.log("No contact provided");
      return NextResponse.json(
        { ok: false, error: "No contact provided" },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing");
      return NextResponse.json(
        { ok: false, error: "Server misconfigured (no API key)" },
        { status: 500 }
      );
    }

    if (!process.env.LEADS_FROM_EMAIL || !process.env.LEADS_TO_EMAIL) {
      console.error("Lead email env vars missing");
      return NextResponse.json(
        { ok: false, error: "Server misconfigured (email vars missing)" },
        { status: 500 }
      );
    }

    console.log("API key exists:", true);
    console.log("Sending from:", process.env.LEADS_FROM_EMAIL);
    console.log("Sending to:", process.env.LEADS_TO_EMAIL);

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: `OmnixAI Leads <${process.env.LEADS_FROM_EMAIL}>`,
      to: [process.env.LEADS_TO_EMAIL],
      subject: "🔥 New OmnixAI Demo Request",
      html: `
        <h2>New demo request</h2>
        <p><strong>Email:</strong> ${email ?? "Not provided"}</p>
        <p><strong>Phone:</strong> ${phone ?? "Not provided"}</p>
        <p><strong>Page:</strong> ${page}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("Resend result:", result);

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("Lead route error:", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}