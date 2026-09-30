import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Velvet Table",
    template: "%s · The Velvet Table",
  },
  description: "The Velvet Table, ristorante gastronomico nel Chiado, a Lisbona.",
  applicationName: "The Velvet Table",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
