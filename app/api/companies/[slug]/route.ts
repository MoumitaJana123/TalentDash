

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Await params as per Next.js 15+ requirements
  const { slug } = await params;

  try {
    // 1. Fetch Company + Salaries
    const company = await prisma.company.findUnique({
      where: { slug },
      include: {
        salaries: {
          orderBy: { total_compensation: "desc" },
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: true, message: "Company not found" },
        { status: 404 }
      );
    }

    // 2. Serialize Data: Convert BigInt/Decimal to Number
    const serializedSalaries = company.salaries.map((s) => ({
      ...s,
      base_salary: Number(s.base_salary),
      bonus: Number(s.bonus),
      stock: Number(s.stock),
      total_compensation: Number(s.total_compensation),
      // Ensure confidence_score is included if it exists in your schema
      confidence_score: Number(s.confidence_score || 0),
    }));

    // 3. Compute Statistical Median
    const sortedTC = serializedSalaries
      .map((s) => s.total_compensation)
      .sort((a, b) => a - b);

    const mid = Math.floor(sortedTC.length / 2);
    const medianTotalCompensation = sortedTC.length === 0
      ? 0
      : sortedTC.length % 2 !== 0
      ? sortedTC[mid]
      : (sortedTC[mid - 1] + sortedTC[mid]) / 2;

    // 4. Compute Level Distribution
    const levelDistribution = serializedSalaries.reduce((acc, curr) => {
      const level = curr.level || "Unknown";
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // 5. Final Response Structure
    return NextResponse.json(
      {
        company: {
          id: company.id,
          name: company.name,
          slug: company.slug,
          logo_url: company.logo_url,
          website: company.website,
          industry: company.industry,
          headquarters: company.headquarters,
        },
        salaries: serializedSalaries,
        stats: {
          median_total_compensation: medianTotalCompensation,
          level_distribution: levelDistribution,
          total_submissions: serializedSalaries.length,
        },
      },
      {
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: true, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}