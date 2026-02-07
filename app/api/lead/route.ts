import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { contact, context } = await req.json();

    if (!contact) {
      return Response.json({ ok: false }, { status: 400 });
    }

    // If email isn't configured yet, just log the lead so nothing is lost
    if (!process.env.RESEND_API_KEY || !process.env.LEADS_TO_EMAIL) {
      console.log("New lead (email not configured):", { contact, context });
      return Response.json({ ok: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "OmnixAI <leads@astoarkaap.resend.app>",
      to: process.env.LEADS_TO_EMAIL!,
      subject: "New OmnixAI Demo Lead",
      html: `
        <h3>New demo request</h3>
        <p><strong>Contact:</strong> ${contact}</p>
        <p><strong>Context:</strong> ${context || "N/A"}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}