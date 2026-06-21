


import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import SalaryTable from "@/components/features/SalaryTable";
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch data
  const company = await prisma.company.findUnique({
    where: { slug },
    include: { salaries: { orderBy: { submitted_at: 'desc' } } },
  });

  if (!company || company.salaries.length === 0) notFound();

  // 2. Calculations
  const tcs = company.salaries.map(s => Number(s.total_compensation)).sort((a, b) => a - b);
  const medianTC = tcs[Math.floor(tcs.length / 2)];
  const minTC = Math.min(...tcs);
  const maxTC = Math.max(...tcs);

  // 3. Level Distribution
  const levels = ['L3', 'L4', 'L5', 'L6', 'PRINCIPAL'];
  const distribution = levels.map(lvl => ({
    level: lvl,
    percentage: (company.salaries.filter(s => s.level === lvl).length / company.salaries.length) * 100
  }));

  // 4. Sanitize data for the SalaryTable component
  const sanitizedSalaries = company.salaries.map(s => ({
    ...s,
    base_salary: s.base_salary.toString(),
    total_compensation: s.total_compensation.toString(),
    stock: s.stock.toString(),
    bonus: s.bonus.toString(),
    confidence_score: s.confidence_score.toString(),
    submitted_at: s.submitted_at.toISOString(),
    company: { name: company.name }
  }));

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <header className="mb-8 border-b pb-6 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">{company.name}</h1>
          <div className="flex flex-wrap gap-4 mt-4 text-gray-600">
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              {company.industry}
            </span>
            {company.founded_year && <span className="flex items-center gap-1">📅 Founded: {company.founded_year}</span>}
            {company.headcount_range && <span className="flex items-center gap-1">👥 {company.headcount_range}</span>}
            {company.headquarters && company.headquarters !== "Unknown" && <span className="flex items-center gap-1">📍 {company.headquarters}</span>}
          </div>
        </div>

        {/* Compare Button */}
        <Link 
          href={`/compare?company=${company.slug}`} 
          className="bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition shadow-md"
        >
          Compare
        </Link>
      </header>

      {/* Compensation Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <p className="text-sm text-gray-500">Median Total Comp</p>
          <p className="text-2xl font-bold text-[#0369A1]">₹{(medianTC / 100000).toFixed(1)}L</p>
        </div>
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <p className="text-sm text-gray-500">Range (Min–Max)</p>
          <p className="text-lg font-semibold">{formatCurrency(minTC, 'INR')} – {formatCurrency(maxTC, 'INR')}</p>
        </div>
        <div className="p-4 border rounded-xl bg-white shadow-sm flex flex-col justify-center">
            <p className="text-sm text-gray-500">Data Points</p>
            <p className="text-lg font-semibold">{company.salaries.length} total records</p>
        </div>
      </section>

      {/* Level Distribution */}
      <section className="mb-12">
        <h2 className="text-lg font-semibold mb-3">Level Distribution</h2>
        <div className="flex h-8 rounded-lg overflow-hidden border bg-gray-100">
          {distribution.map(d => d.percentage > 0 && (
            <div 
              key={d.level} 
              style={{ width: `${d.percentage}%` }} 
              className={`h-full flex items-center justify-center text-[10px] text-white ${getBarColor(d.level)}`}
              title={`${d.level}: ${d.percentage.toFixed(0)}%`}
            >
              {d.percentage > 10 ? d.level : ''}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Salary Records</h2>
        <SalaryTable 
          data={sanitizedSalaries} 
          meta={{ total: company.salaries.length, page: 1, limit: 25 }} 
          currency="INR" 
        />
      </section>
    </main>
  );
}

function getBarColor(level: string) {
    const map: Record<string, string> = { 
      'L3': 'bg-slate-400', 
      'L4': 'bg-blue-500', 
      'L5': 'bg-indigo-500', 
      'L6': 'bg-purple-600', 
      'PRINCIPAL': 'bg-black' 
    };
    return map[level] || 'bg-gray-300';
}