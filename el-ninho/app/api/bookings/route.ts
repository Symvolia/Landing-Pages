import { NextResponse } from "next/server";
import { fillTemplate } from "@/lib/utils";
import { bookingSchema } from "@/lib/schemas";
import { mailConfigured, sendMail } from "@/lib/mail";
import { site } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const data = parsed.data;
  if (data.company) {
    return NextResponse.json({ ok: true, emailed: false });
  }

  const chosen = new Date(`${data.date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (chosen < today) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const messages = (await import(`@/messages/${data.locale}.json`)).default as {
    email: { bookingSubject: string; bookingGuestSubject: string; bookingGuestBody: string };
    reservations: { guestCount: string };
  };

  const guests = String(data.guests);
  const staffText = [
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    `Data: ${data.date}`,
    `Ora: ${data.time}`,
    `Persone: ${guests}`,
    `Note: ${data.notes || "—"}`,
    `Lingua: ${data.locale}`,
  ].join("\n");

  let emailed = false;
  if (mailConfigured() && process.env.BOOKING_TO_EMAIL) {
    await sendMail({
      to: process.env.BOOKING_TO_EMAIL,
      replyTo: data.email,
      subject: messages.email.bookingSubject,
      text: staffText,
    });
    await sendMail({
      to: data.email,
      subject: messages.email.bookingGuestSubject,
      text: fillTemplate(messages.email.bookingGuestBody, {
        name: data.name,
        guests,
        date: data.date,
        time: data.time,
      }),
      replyTo: site.email,
    });
    emailed = true;
  }

  return NextResponse.json({ ok: true, emailed });
}
