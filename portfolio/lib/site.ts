export const site = {
  name: "Nicolò Peruzzi",
  role: "Web Designer & Developer",
  email: "hello@nicoloperuzzi.com",
  /** E.164 digits, no plus sign. Replace before publishing. */
  whatsapp: "390000000000",
  linkedin: "https://www.linkedin.com/in/nicolo-peruzzi",
  github: "https://github.com/nicoloperuzzi",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nicoloperuzzidevelopment.vercel.app",
};

export const localeTags: Record<string, string> = {
  it: "it_IT",
  en: "en_US",
  de: "de_DE",
  pt: "pt_PT",
  es: "es_ES",
};
