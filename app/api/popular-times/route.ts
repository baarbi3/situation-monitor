import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("[api] incoming request");

    const body = await req.json();
    console.log("[api] body:", body);

    const { url } = body;
    if (!url) {
      console.error("[api] missing url");
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    console.log("[api] calling puppeteer API");

    const res = await fetch(
      "https://situation-monitor-api.vercel.app/run",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      }
    );

    console.log("[api] puppeteer status:", res.status);

    const text = await res.text();
    console.log("[api] puppeteer raw response:", text);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Upstream failed", upstream: text },
        { status: 500 }
      );
    }

    return NextResponse.json(JSON.parse(text));
  } catch (err: any) {
    console.error("[api] fatal error:", err);
    return NextResponse.json(
      { error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
