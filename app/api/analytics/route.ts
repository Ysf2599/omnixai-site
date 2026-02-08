export const runtime = "nodejs";

let counters = {
  opened: 0,
  messages: 0,
  demos: 0,
};

export async function POST(req: Request) {
  try {
    const { event } = await req.json();

    if (event === "opened") counters.opened += 1;
    if (event === "messages") counters.messages += 1;
    if (event === "demos") counters.demos += 1;

    console.log("Analytics:", counters);
    return Response.json({ ok: true, counters });
  } catch (e) {
    console.error("Analytics error:", e);
    return Response.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ counters });
}