import { NextRequest, NextResponse } from "next/server";

// Minimal, dependency-free contact endpoint. In production this would
// validate input server-side and forward to a CRM or email service; for
// now it logs the submission so the form has a real endpoint to call.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.name || !body?.email || !body?.company) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // eslint-disable-next-line no-console
    console.log("[NicoMach contact submission]", {
      ...body,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
