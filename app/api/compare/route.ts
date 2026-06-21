

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const s1Id = searchParams.get("s1");
  const s2Id = searchParams.get("s2");

  if (!s1Id || !s2Id) {
    return NextResponse.json({ error: true, message: "Two IDs are required" }, { status: 400 });
  }

  if (s1Id === s2Id) {
    return NextResponse.json({ error: true, message: "IDs must be different" }, { status: 400 });
  }

  const [record1, record2] = await Promise.all([
    prisma.salary.findUnique({ where: { id: s1Id } }),
    prisma.salary.findUnique({ where: { id: s2Id } })
  ]);

  if (!record1 || !record2) {
    return NextResponse.json({ error: true, message: "One or both records not found" }, { status: 404 });
  }

  // Helper to safely convert BigInt/null to Number
  const n = (val: bigint | number | null | undefined) => Number(val ?? 0);

  const delta = {
    base_delta: n(record1.base_salary) - n(record2.base_salary),
    bonus_delta: n(record1.bonus) - n(record2.bonus),
    stock_delta: n(record1.stock) - n(record2.stock),
    tc_delta: n(record1.total_compensation) - n(record2.total_compensation),
    experience_delta: n(record1.experience_years) - n(record2.experience_years)
  };

  return NextResponse.json({
    // Serialize records so the client receives numbers instead of BigInts
    record_1: { ...record1, base_salary: n(record1.base_salary), bonus: n(record1.bonus), stock: n(record1.stock), total_compensation: n(record1.total_compensation) },
    record_2: { ...record2, base_salary: n(record2.base_salary), bonus: n(record2.bonus), stock: n(record2.stock), total_compensation: n(record2.total_compensation) },
    delta
  });
}