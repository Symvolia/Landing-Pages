import https from "node:https";
import { NextResponse } from "next/server";
import { site } from "@/lib/site";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function postJson(url: string, body: string) {
  return new Promise<{ status: number; body: string }>((resolve, reject) => {
    const request = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: site.url,
          Referer: `${site.url}/`,
          "Content-Length": Buffer.byteLength(body),
          "User-Agent": "nicoloperuzzidevelopment",
        },
      },
      (response) => {
        const chunks: Buffer[] = [];
        response.on("data", (chunk: Buffer) => chunks.push(chunk));
        response.on("end", () => {
          resolve({ status: response.statusCode ?? 0, body: Buffer.concat(chunks).toString("utf8") });
        });
      },
    );
    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (String(body.company ?? "").trim()) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const type = String(body.type ?? "").trim();
  const message = String(body.message ?? "").trim();
  const fields: string[] = [];
  if (name.length < 2 || name.length > 80) fields.push("name");
  if (!emailPattern.test(email) || email.length > 160) fields.push("email");
  if (type.length < 2 || type.length > 80) fields.push("type");
  if (message.length < 12 || message.length > 4000) fields.push("message");
  if (fields.length) return NextResponse.json({ error: "invalid", fields }, { status: 400 });

  let upstream: { status: number; body: string };
  try {
    upstream = await postJson(
      `https://formsubmit.co/ajax/${site.email}`,
      JSON.stringify({
        name,
        email,
        message: `${type}\n\n${message}`,
        _subject: `${type} - ${name}`,
        _replyto: email,
        _captcha: "false",
        _template: "box",
      }),
    );
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  let result: { success?: string } = {};
  try {
    result = JSON.parse(upstream.body) as { success?: string };
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  if (result.success !== "true") return NextResponse.json({ error: "unavailable" }, { status: 503 });
  return NextResponse.json({ ok: true });
}
