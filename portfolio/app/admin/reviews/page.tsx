"use client";

import { FormEvent, useEffect, useState } from "react";

type Review = {
  id: string;
  name: string;
  email: string;
  rating: number;
  content: string;
  project: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export default function AdminReviewsPage() {
  const [password, setPassword] = useState("");
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  async function load() {
    const response = await fetch("/api/reviews/admin");
    if (!response.ok) {
      setReady(false);
      return;
    }
    const data = (await response.json()) as { reviews: Review[] };
    setReviews(data.reviews);
    setReady(true);
  }

  useEffect(() => {
    void load();
  }, []);

  async function onLogin(event: FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/reviews/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      setError("Accesso rifiutato.");
      return;
    }
    setPassword("");
    await load();
  }

  async function setStatus(id: string, status: Review["status"]) {
    const response = await fetch("/api/reviews/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (response.ok) await load();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-purple">Moderazione</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-navy">Recensioni</h1>
      {!ready ? (
        <form onSubmit={onLogin} className="mt-8 max-w-sm">
          <label className="text-sm font-medium text-purple" htmlFor="password">
            Chiave
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 h-12 w-full rounded-2xl border-2 border-navy/15 bg-white px-4 outline-none focus:border-cyan"
          />
          <button type="submit" className="mt-4 inline-flex h-12 items-center rounded-full bg-lime px-6 text-sm font-semibold text-navy">
            Entra
          </button>
          {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
        </form>
      ) : (
        <ul className="mt-8 grid gap-4">
          {reviews.map((review) => (
            <li key={review.id} className="rounded-3xl border border-line bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-semibold text-navy">
                  {review.name} · {review.project}
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-purple">{review.status}</p>
              </div>
              <p className="mt-2 text-sm text-muted">{review.email}</p>
              <p className="mt-3 leading-relaxed">{review.content}</p>
              <p className="mt-2 text-purple">{"★".repeat(review.rating)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(["approved", "rejected", "pending"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatus(review.id, status)}
                    className="rounded-full border border-navy/15 px-4 py-2 text-sm"
                  >
                    {status}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
