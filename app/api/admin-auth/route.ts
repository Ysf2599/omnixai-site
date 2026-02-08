export const runtime = "nodejs";

export async function POST(req: Request) {
  const { password } = await req.json();

  console.log("ADMIN_PASSWORD loaded:", Boolean(process.env.ADMIN_PASSWORD));

  if (!process.env.ADMIN_PASSWORD) {
    return Response.json({ ok: false, error: "Missing ADMIN_PASSWORD" }, { status: 500 });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false }, { status: 401 });
}