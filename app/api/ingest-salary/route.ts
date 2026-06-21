import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Currency, Level, Source } from '@prisma/client'; // Import Enums

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      companyName, 
      role, 
      base_salary, 
      level, 
      location, 
      currency,        // Added
      bonus = 0, 
      stock = 0, 
      experience_years = 0, 
      confidence_score = 0 
    } = body;

    // 1. Validation
    if (!companyName || !role || !base_salary) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 2. Normalization & Company Upsert
    const normalizedName = companyName.toString().toLowerCase().replace(/[^a-z0-9]/g, '');
    const company = await prisma.company.upsert({
      where: { normalized_name: normalizedName },
      update: {},
      create: {
        name: companyName,
        normalized_name: normalizedName,
        slug: companyName.toString().toLowerCase().replace(/\s+/g, '-'),
        industry: "Technology",
        headquarters: "Unknown"
      }
    });

    // 3. Computation
    const base = BigInt(base_salary || 0);
    const bns = BigInt(bonus || 0);
    const stck = BigInt(stock || 0);
    const total_compensation = base + bns + stck;

    // 4. Creation
    const newSalary = await prisma.salary.create({
      data: {
        company_id: company.id,
        role,
        level: level as Level,          // Use Enum
        location,
        currency: currency as Currency, // Use dynamic currency
        base_salary: base,
        bonus: bns,
        stock: stck,
        total_compensation,
        experience_years: parseInt(experience_years.toString()) || 0,
        confidence_score: parseFloat(confidence_score.toString()) || 0,
        source: Source.CONTRIBUTOR,
        is_verified: false
      }
    });

    revalidatePath('/salaries');
    
    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: any) {
    console.error("Ingestion API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}