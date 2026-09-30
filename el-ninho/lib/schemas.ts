import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().max(120),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  guests: z.coerce.number().int().min(1).max(12),
  notes: z.string().trim().max(500).optional().default(""),
  locale: z.enum(["it", "en", "pt", "es"]),
  company: z.string().optional().default(""),
});

export const newsletterSchema = z.object({
  email: z.email().max(120),
  locale: z.enum(["it", "en", "pt", "es"]),
  company: z.string().optional().default(""),
});
