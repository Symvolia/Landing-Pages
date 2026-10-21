import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE_URL, site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
