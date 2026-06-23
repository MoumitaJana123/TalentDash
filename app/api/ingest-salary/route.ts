// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { revalidatePath } from 'next/cache';
// import { Currency, Level, Source } from '@prisma/client'; // Import Enums

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { 
//       companyName, 
//       role, 
//       base_salary, 
//       level, 
//       location, 
//       currency,        // Added
//       bonus = 0, 
//       stock = 0, 
//       experience_years = 0, 
//       confidence_score = 0 
//     } = body;

//     // 1. Validation
//     if (!companyName || !role || !base_salary) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     // 2. Normalization & Company Upsert
//     const normalizedName = companyName.toString().toLowerCase().replace(/[^a-z0-9]/g, '');
//     const company = await prisma.company.upsert({
//       where: { normalized_name: normalizedName },
//       update: {},
//       create: {
//         name: companyName,
//         normalized_name: normalizedName,
//         slug: companyName.toString().toLowerCase().replace(/\s+/g, '-'),
//         industry: "Technology",
//         headquarters: "Unknown"
//       }
//     });

//     // 3. Computation
//     const base = BigInt(base_salary || 0);
//     const bns = BigInt(bonus || 0);
//     const stck = BigInt(stock || 0);
//     const total_compensation = base + bns + stck;

//     // 4. Creation
//     const newSalary = await prisma.salary.create({
//       data: {
//         company_id: company.id,
//         role,
//         level: level as Level,          // Use Enum
//         location,
//         currency: currency as Currency, // Use dynamic currency
//         base_salary: base,
//         bonus: bns,
//         stock: stck,
//         total_compensation,
//         experience_years: parseInt(experience_years.toString()) || 0,
//         confidence_score: parseFloat(confidence_score.toString()) || 0,
//         source: Source.CONTRIBUTOR,
//         is_verified: false
//       }
//     });

//     revalidatePath('/salaries');
    
//     return NextResponse.json({ success: true }, { status: 201 });

//   } catch (error: any) {
//     console.error("Ingestion API Error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Currency, Level, Source } from '@prisma/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      companyName, 
      role, 
      base_salary, 
      level, 
      location, 
      currency, 
      bonus = 0, 
      stock = 0, 
      experience_years = 0, 
      confidence_score = 0 
    } = body;

    // 1. Validation
    if (!companyName || !role || !base_salary || !level) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // --- FIX: Add Level Mapping ---
    // Maps frontend hyphenated string to Prisma Enum
    const levelMap: Record<string, Level> = {
      "L3": Level.L3,
      "L4": Level.L4,
      "L5": Level.L5,
      "L6": Level.L6,
      "SDE-I": Level.SDE_I,
      "SDE-II": Level.SDE_II,
      "SDE-III": Level.SDE_III,
      "STAFF": Level.STAFF,
      "PRINCIPAL": Level.PRINCIPAL,
      "IC4": Level.IC4,
      "IC5": Level.IC5,
      "OTHER": Level.OTHER,
    };

    const mappedLevel = levelMap[level as string];

    if (!mappedLevel) {
      return NextResponse.json({ error: `Invalid level provided: ${level}` }, { status: 400 });
    }
    // ------------------------------

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
        level: mappedLevel, // Using the validated mapped level
        location,
        currency: (currency as Currency) || Currency.INR,
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
    
    return NextResponse.json({ success: true, id: newSalary.id }, { status: 201 });

  } catch (error: any) {
    console.error("Ingestion API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}