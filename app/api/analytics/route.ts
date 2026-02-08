export const runtime = "nodejs";

let counters = {
  opened: 0,
  messages: 0,
  demos: 0,
};

export async function POST(req: Request) {
  const { event } = await req.json();
  if (event && event in counters) {
    // @ts-ignore
    counters[event] += 1;
  }
  console.log("Analytics event:", event, counters);
  return Response.json({ ok: true, counters });
}