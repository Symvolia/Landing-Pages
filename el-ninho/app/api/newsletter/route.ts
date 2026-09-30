import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/schemas";
import { mailConfigured, sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (parsed.data.company) {
    return NextResponse.json({ ok: true, emailed: false });
  }

  const messages = (await import(`@/messages/${parsed.data.locale}.json`)).default as {
    email: { newsletterSubject: string };
  };

  let emailed = false;
  if (mailConfigured() && process.env.BOOKING_TO_EMAIL) {
    await sendMail({
      to: process.env.BOOKING_TO_EMAIL,
      replyTo: parsed.data.email,
      subject: messages.email.newsletterSubject,
      text: `${parsed.data.email}\n${parsed.data.locale}`,
    });
    emailed = true;
  }

  return NextResponse.json({ ok: true, emailed });
}
