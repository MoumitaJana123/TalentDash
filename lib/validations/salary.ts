import { z } from "zod";
import { Level, Currency, Source } from "@prisma/client";

export const SalaryIngestSchema = z.object({
  companyName: z.string().min(1).trim(),
  role: z.string().min(1),
  level: z.nativeEnum(Level),
  location: z.string().min(1),
  currency: z.nativeEnum(Currency),
  experience_years: z.number().int().gt(0).lt(51),
  base_salary: z.number().gt(0),
  bonus: z.number().default(0),
  stock: z.number().default(0),
  confidence_score: z.number().min(0.0).max(1.0),
  source: z.nativeEnum(Source).default("CONTRIBUTOR"),
});