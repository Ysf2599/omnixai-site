import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `
You are the OmnixAI website assistant.
Explain OmnixAI, its pricing, and guide users to request a demo.

Pricing:
- Standard Chatbox: £99 setup + £49/month
- Premium AI Assistant: £399 setup + £149/month

Be concise, friendly, and sales-oriented.
If the user shows interest, suggest requesting a demo.
`;

  const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "low" },
    input: [
      { role: "developer", content: systemPrompt },
      ...messages,
    ],
  });

  const text = response.output_text || "Sorry, I couldn’t respond.";
  return Response.json({ text });
}