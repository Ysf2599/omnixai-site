import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({ text: "Server missing API key." }, { status: 500 });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const systemPrompt = `
You are the OmnixAI website assistant.
Explain OmnixAI, pricing, and guide users to request a demo.

Pricing:
- Standard Chatbox: £99 setup + £49/month
- Premium AI Assistant: £399 setup + £149/month

Be concise, friendly, and sales-oriented.
`;

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        { role: "developer", content: systemPrompt },
        ...messages,
      ],
    });

    const text =
      response.output_text ||
      "Thanks for your message! How can I help you with OmnixAI?";

    return Response.json({ text });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { text: "Assistant temporarily unavailable. Try again shortly." },
      { status: 500 }
    );
  }
}