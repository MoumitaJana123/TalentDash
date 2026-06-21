
import SalaryTable from "@/components/features/SalaryTable";
import SalaryFilters from "@/components/features/SalaryFilters";

export const dynamic = 'force-dynamic';

export default async function SalariesPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ [key: string]: string | undefined }> 
}) {
  const params = await searchParams;
  const query = new URLSearchParams(params as Record<string, string>).toString();

  let data = [];
  let meta = { total: 0, page: 1, limit: 25 };

  try {
    const res = await fetch(`http://localhost:3000/api/salaries?${query}`, {
      cache: 'no-store'
    });
    
    if (res.ok) {
      const json = await res.json();
      data = json.data;
      meta = json.meta;
    }
  } catch (error) {
    console.error("Failed to fetch salaries:", error);
  }

  return (
    <main className="p-8 max-w-7xl mx-auto">
      {/* Updated Heading */}
      <h1 className="text-2xl font-bold mb-6">Tech Industry Salaries</h1>
      
      <SalaryFilters />
      
      <SalaryTable 
        data={data} 
        meta={meta}
        currency={(params.currency as 'INR' | 'USD') || "INR"} 
      />
    </main>
  );
}
