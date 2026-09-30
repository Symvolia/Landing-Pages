import { NextResponse } from "next/server";
import { insertReview, listStoredReviews, parseReview, reviewsReady, toPublic } from "@/lib/reviews";

export async function GET() {
  if (!reviewsReady()) return NextResponse.json({ reviews: [] });
  try {
    const reviews = (await listStoredReviews()).filter((review) => review.status === "approved").slice(0, 24).map(toPublic);
    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!reviewsReady()) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = parseReview(payload);
  if (parsed.honeypot) return NextResponse.json({ ok: true });
  if (!("review" in parsed) || !parsed.review) {
    return NextResponse.json({ error: "invalid", fields: "fields" in parsed ? parsed.fields : [] }, { status: 400 });
  }
  const review = parsed.review;

  try {
    const since = Date.now() - 60 * 60 * 1000;
    const recent = (await listStoredReviews()).filter(
      (item) => item.email === review.email && Date.parse(item.created_at) >= since,
    );
    if (recent.length >= 3) return NextResponse.json({ error: "limit" }, { status: 429 });
    await insertReview(review);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
