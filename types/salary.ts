// types/salary.ts
export type Level = "L3" | "L4" | "L5" | "L6" | "Principal";

export interface SalaryRecord {
  id: string;
  company: string; // e.g., "Amazon"
  slug: string;    // e.g., "amazon"
  role: string;
  level: Level;
  location: string;
  experienceYears: number;
  baseSalary: number;
  bonus?: number; // Optional as per F2
  stock?: number; // Optional as per F2
  totalComp: number; // Base + Bonus + Stock
  currency: "INR" | "USD";
  createdAt: string;
}