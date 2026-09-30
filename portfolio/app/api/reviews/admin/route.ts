import { NextResponse } from "next/server";
import {
  adminCookie,
  adminToken,
  isAdmin,
  listStoredReviews,
  reviewsReady,
  safeEqual,
  updateReviewStatus,
  type ReviewStatus,
} from "@/lib/reviews";

const statuses: ReviewStatus[] = ["pending", "approved", "rejected"];

function unauthorized() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

export async function POST(request: Request) {
  const secret = process.env.REVIEWS_ADMIN_SECRET;
  if (!secret || !reviewsReady()) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = String(body.password ?? "");
  } catch {
    return unauthorized();
  }

  if (!safeEqual(password, secret)) return unauthorized();

  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie, adminToken(secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}

export async function GET(request: Request) {
  if (!reviewsReady()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const cookie = request.headers.get("cookie") ?? "";
  const value = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${adminCookie}=`))
    ?.slice(adminCookie.length + 1);
  if (!isAdmin(value)) return unauthorized();

  try {
    const reviews = (await listStoredReviews()).slice(0, 100);
    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!reviewsReady()) return NextResponse.json({ error: "unavailable" }, { status: 503 });
  const cookie = request.headers.get("cookie") ?? "";
  const value = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${adminCookie}=`))
    ?.slice(adminCookie.length + 1);
  if (!isAdmin(value)) return unauthorized();

  let id = "";
  let status: ReviewStatus = "pending";
  try {
    const body = (await request.json()) as { id?: string; status?: string };
    id = String(body.id ?? "");
    status = body.status as ReviewStatus;
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  if (!/^[0-9a-f-]{36}$/i.test(id) || !statuses.includes(status)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  try {
    const updated = await updateReviewStatus(id, status);
    if (!updated) return NextResponse.json({ error: "invalid" }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
