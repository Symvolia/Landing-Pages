import type { Metadata } from "next";
import type { ReactNode } from "react";
import { inter, jetbrains, outfit } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Recensioni",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className={`${outfit.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-full bg-mist font-sans text-ink">{children}</body>
    </html>
  );
}
