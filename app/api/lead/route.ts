import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  console.log("=== LEAD ROUTE START ===");

  try {
    const body = await req.json();
    console.log("Payload received:", body);

let leadType = "General";


const body = await req.json();

const email = body.email || null;
const phone = body.phone || null;
const message = body.message || "No message provided";
const page = body.page || "unknown";

if (message.toLowerCase().includes("website") ||
    message.toLowerCase().includes("build") ||
    message.toLowerCase().includes("scratch")) {
  leadType = "WebDev";
} else if (
  message.toLowerCase().includes("price") ||
  message.toLowerCase().includes("cost") ||
  message.toLowerCase().includes("premium")
) {
  leadType = "Premium";
}

    if (!email && !phone) {
      console.log("No contact info provided");
      return NextResponse.json(
        { ok: false, error: "No contact provided" },
        { status: 400 }
      );
    }

    // ENV DEBUGGING
    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
    console.log("LEADS_FROM_EMAIL:", process.env.LEADS_FROM_EMAIL);
    console.log("LEADS_TO_EMAIL:", process.env.LEADS_TO_EMAIL);

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is missing in Production");
    }

    if (!process.env.LEADS_FROM_EMAIL || !process.env.LEADS_TO_EMAIL) {
      throw new Error("Lead email environment variables missing");
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log("About to send email...");

    const result = await resend.emails.send({
      from: `OmnixAI Leads <${process.env.LEADS_FROM_EMAIL}>`,
      to: [process.env.LEADS_TO_EMAIL],
      subject: `New Lead | ${page} | ${email ?? phone}`,
      html: `
        <h2>New demo request</h2>
        <p><strong>Email:</strong> ${email ?? "Not provided"}</p>
        <p><strong>Phone:</strong> ${phone ?? "Not provided"}</p>
        <p><strong>Page:</strong> ${page}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("EMAIL SENT RESULT:", result);
    console.log("=== LEAD ROUTE SUCCESS ===");

    return NextResponse.json({ ok: true, result });
  } catch (error: any) {
    console.error("=== LEAD ROUTE ERROR ===");
    console.error(error);

    return NextResponse.json(
      { ok: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}