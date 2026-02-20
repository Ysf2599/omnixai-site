import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Resend } from "resend";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const resend = new Resend(process.env.RESEND_API_KEY!);

function extractContact(text: string) {
  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const phoneMatch = text.match(/(\+?\d[\d\s().-]{7,}\d)/);
  return {
    email: emailMatch?.[0],
    phone: phoneMatch?.[0],
  };
}

export async function POST(req: Request) {
  const { message, history } = await req.json();

  const { email, phone } = extractContact(message);

  if (email || phone) {
    await resend.emails.send({
      from: "OmnixAI Leads <leads@omnixai.ai>",
      to: [process.env.LEADS_TO_EMAIL!],
      subject: "🔥 New OmnixAI website lead",
      html: `
        <h2>New lead from your website</h2>
        <p><strong>Email:</strong> ${email || "Not provided"}</p>
        <p><strong>Phone/WhatsApp:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content: `
You are OmnixAI, a high-converting AI sales assistant.
Goals:
- Understand visitor intent
- Explain OmnixAI benefits
- When user shows interest, politely ask for email or WhatsApp to send a demo
- Be concise, professional, and helpful
Plans:
- Standard: £99 setup + £49/month
- Premium: £399 setup + £149/month
Never claim to be human. No guarantees.
        `,
      },
      ...(history || []),
      { role: "user", content: message },
    ],
  });

  const reply =
    completion.choices[0]?.message?.content ||
    "Would you like me to send you a quick demo? You can leave your email or WhatsApp number.";

  return NextResponse.json({ reply });
}