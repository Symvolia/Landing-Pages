import { Instrument_Serif, Inter } from "next/font/google";

// Display serif: high contrast, tight, with a true italic for the editorial words ("Reservado.").
export const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});
