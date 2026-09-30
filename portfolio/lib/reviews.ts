import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { projects } from "@/lib/projects";

export const projectTitles = projects.map((project) => project.title);
export const adminCookie = "reviews_admin";

export type ReviewStatus = "pending" | "approved" | "rejected";

export type PublicReview = {
  id: string;
  name: string;
  rating: number;
  content: string;
  project: string;
  created_at: string;
};

export type StoredReview = PublicReview & {
  email: string;
  status: ReviewStatus;
  updated_at: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function reviewsDb(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function reviewsReady() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function parseReview(input: unknown) {
  const body = typeof input === "object" && input !== null ? (input as Record<string, unknown>) : {};
  if (String(body.company ?? "").trim()) return { honeypot: true as const };

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const content = String(body.content ?? "").trim();
  const project = String(body.project ?? "").trim();
  const rating = Number(body.rating);
  const fields: string[] = [];

  if (name.length < 2 || name.length > 80) fields.push("name");
  if (!emailPattern.test(email) || email.length > 160) fields.push("email");
  if (!projectTitles.includes(project as (typeof projectTitles)[number])) fields.push("project");
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) fields.push("rating");
  if (content.length < 12 || content.length > 800) fields.push("content");

  if (fields.length) return { honeypot: false as const, fields };
  return { honeypot: false as const, review: { name, email, content, project, rating } };
}

export function adminToken(secret: string) {
  return createHmac("sha256", secret).update("reviews-admin").digest("hex");
}

export function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isAdmin(cookieValue: string | undefined) {
  const secret = process.env.REVIEWS_ADMIN_SECRET;
  if (!secret || !cookieValue) return false;
  return safeEqual(cookieValue, adminToken(secret));
}

export function toPublic(review: StoredReview): PublicReview {
  return {
    id: review.id,
    name: review.name,
    rating: review.rating,
    content: review.content,
    project: review.project,
    created_at: review.created_at,
  };
}

export async function listStoredReviews() {
  const db = reviewsDb();
  if (!db) throw new Error("unavailable");
  const { data, error } = await db.from("reviews").select("*").order("created_at", { ascending: false }).limit(200);
  if (error) throw error;
  return (data ?? []) as StoredReview[];
}

export async function insertReview(input: {
  name: string;
  email: string;
  content: string;
  project: string;
  rating: number;
}) {
  const db = reviewsDb();
  if (!db) throw new Error("unavailable");
  const { error } = await db.from("reviews").insert({ ...input, status: "pending" });
  if (error) throw error;
}

export async function updateReviewStatus(id: string, status: ReviewStatus) {
  const db = reviewsDb();
  if (!db) throw new Error("unavailable");
  const { data, error } = await db
    .from("reviews")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("id");
  if (error) throw error;
  return Boolean(data?.length);
}
