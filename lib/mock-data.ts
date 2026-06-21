// lib/mock-data.ts
import { SalaryRecord } from "@/types/salary";

export const MOCK_SALARIES: SalaryRecord[] = [
  // Amazon
  { id: "1", company: "Amazon", slug: "amazon", role: "SDE-I", level: "L3", location: "Bengaluru", experienceYears: 1, baseSalary: 2200000, bonus: 200000, stock: 1000000, totalComp: 3400000, currency: "INR", createdAt: "2026-01-10" },
  { id: "2", company: "Amazon", slug: "amazon", role: "SDE-II", level: "L4", location: "Bengaluru", experienceYears: 4, baseSalary: 3500000, bonus: 500000, stock: 2000000, totalComp: 6000000, currency: "INR", createdAt: "2026-02-15" },
  { id: "3", company: "Amazon", slug: "amazon", role: "SDE-III", level: "L5", location: "Hyderabad", experienceYears: 7, baseSalary: 4500000, bonus: 800000, stock: 4000000, totalComp: 9300000, currency: "INR", createdAt: "2026-03-01" },
  { id: "4", company: "Amazon", slug: "amazon", role: "Staff Engineer", level: "L6", location: "Bengaluru", experienceYears: 10, baseSalary: 6000000, bonus: 1000000, stock: 8000000, totalComp: 15000000, currency: "INR", createdAt: "2026-01-20" },
  
  // Google
  { id: "5", company: "Google", slug: "google", role: "Software Engineer", level: "L4", location: "Bengaluru", experienceYears: 3, baseSalary: 3200000, bonus: 400000, stock: 2500000, totalComp: 6100000, currency: "INR", createdAt: "2026-04-12" },
  { id: "6", company: "Google", slug: "google", role: "Senior SE", level: "L5", location: "Hyderabad", experienceYears: 6, baseSalary: 4800000, bonus: 600000, stock: 5000000, totalComp: 10400000, currency: "INR", createdAt: "2026-02-20" },
  { id: "7", company: "Google", slug: "google", role: "Staff Engineer", level: "L6", location: "Bengaluru", experienceYears: 9, baseSalary: 6500000, bonus: 1200000, stock: 9000000, totalComp: 16700000, currency: "INR", createdAt: "2026-03-15" },
  
  // Microsoft
  { id: "8", company: "Microsoft", slug: "microsoft", role: "SDE-I", level: "L3", location: "Hyderabad", experienceYears: 2, baseSalary: 2000000, bonus: 300000, stock: 800000, totalComp: 3100000, currency: "INR", createdAt: "2026-01-05" },
  { id: "9", company: "Microsoft", slug: "microsoft", role: "SDE-II", level: "L4", location: "Bengaluru", experienceYears: 5, baseSalary: 3100000, bonus: 400000, stock: 1500000, totalComp: 5000000, currency: "INR", createdAt: "2026-02-28" },
  { id: "10", company: "Microsoft", slug: "microsoft", role: "Principal Engineer", level: "Principal", location: "Hyderabad", experienceYears: 15, baseSalary: 8000000, bonus: 2000000, stock: 12000000, totalComp: 22000000, currency: "INR", createdAt: "2026-04-01" },

  // Add more entries to reach 50+
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `${i + 11}`,
    company: i % 2 === 0 ? "Walmart" : "Adobe",
    slug: i % 2 === 0 ? "walmart" : "adobe",
    role: "Software Engineer",
    level: (["L3", "L4", "L5"] as const)[i % 3],
    location: "Bengaluru",
    experienceYears: Math.floor(Math.random() * 8) + 1,
    baseSalary: 2000000 + Math.random() * 3000000,
    bonus: Math.random() > 0.5 ? 300000 : undefined,
    stock: Math.random() > 0.5 ? 500000 : undefined,
    totalComp: 2500000 + Math.random() * 5000000,
    currency: "INR" as const,
    createdAt: "2026-05-01",
  })),
];