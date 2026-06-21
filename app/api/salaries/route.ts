import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Level } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const company = searchParams.get('company');
    const levels = searchParams.get('level');
    const role = searchParams.get('role');
    const location = searchParams.get('location');
    
    // Pagination & Sorting
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '25');
    const skip = (page - 1) * limit;
    
    // Get the sort parameter from the filter
    const sortParam = searchParams.get('sort') || 'newest';

    const where: any = {};
    
    // Filters
    if (company?.trim()) where.company = { name: { contains: company.trim(), mode: 'insensitive' } };
    if (levels) {
      const validLevels = levels.split(',').filter(l => Object.values(Level).includes(l as Level));
      if (validLevels.length > 0) where.level = { in: validLevels as Level[] };
    }
    if (role?.trim()) where.role = { equals: role.trim(), mode: 'insensitive' };
    if (location?.trim()) where.location = { equals: location.trim(), mode: 'insensitive' };

    // Map URL sort parameter to Prisma orderBy object
    let orderBy: any = { submitted_at: 'desc' }; // default
    if (sortParam === 'comp-desc') {
      orderBy = { total_compensation: 'desc' };
    } else if (sortParam === 'comp-asc') {
      orderBy = { total_compensation: 'asc' };
    }

    // Fetch count and paginated, sorted data
    const [total, salaries] = await Promise.all([
      prisma.salary.count({ where }),
      prisma.salary.findMany({
        where,
        include: { company: true },
        orderBy: orderBy, 
        take: limit,
        skip: skip,
      })
    ]);

    const serializedSalaries = salaries.map(s => ({
      ...s,
      base_salary: s.base_salary?.toString(),
      bonus: s.bonus?.toString(),
      stock: s.stock?.toString(),
      total_compensation: s.total_compensation?.toString(),
    }));

    return NextResponse.json({ 
      data: serializedSalaries, 
      meta: { total, page, limit } 
    });
    
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ data: [], meta: { total: 0, page: 1, limit: 25 } }, { status: 500 });
  }
}