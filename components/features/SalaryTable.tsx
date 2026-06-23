
'use client';

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function SalaryTable({ 
  data = [], 
  meta = { total: 0, page: 1, limit: 25 }, 
  currency = 'INR' 
}: { 
  data: any[], 
  meta: { total: number, page: number, limit: number }, 
  currency: 'INR' | 'USD' 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const COLUMN_MAP: Record<string, string> = {
    "Company": "company",
    "Role": "role",
    "Level": "level",
    "Location": "location",
    "Experience": "experience_years",
    "Base Salary": "base_salary",
    "Stock": "stock",
    "Total Comp": "total_compensation"
  };

  const handleSort = (header: string) => {
    const sortKey = COLUMN_MAP[header];
    const params = new URLSearchParams(searchParams.toString());
    const currentSort = params.get("sort");
    const currentOrder = params.get("order");
    
    const newOrder = (currentSort === sortKey && currentOrder === "desc") ? "asc" : "desc";
    
    params.set("sort", sortKey);
    params.set("order", newOrder);
    params.set("page", "1");
    router.push(`/salaries?${params.toString()}`);
  };

  // Improved formatter: returns "—" if the value is missing or 0
  const formatOptional = (val: string | number | null | undefined) => {
    const num = Number(val);
    return (val === null || val === undefined || num === 0) ? "—" : formatCurrency(num, currency);
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            {Object.keys(COLUMN_MAP).map((header) => (
              <th 
                key={header} 
                className="p-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors" 
                onClick={() => handleSort(header)}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={row.id || index} className="border-t hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-blue-600 hover:underline">
                  <Link href={`/companies/${row.company?.slug || (row.company?.name || 'unknown').toLowerCase().replace(/\s+/g, '-')}`}>
                    {row.company?.name || "Company Not Found"}
                  </Link>
                </td>
                <td className="p-4">{row.role}</td>
                <td className="p-4 text-xs font-semibold text-gray-500">{row.level}</td>
                <td className="p-4 text-gray-600">{row.location}</td>
                <td className="p-4">{row.experience_years} yrs</td>
                <td className="p-4 font-medium">{formatOptional(row.base_salary)}</td>
                <td className="p-4 text-gray-500">{formatOptional(row.stock)}</td>
                <td className="p-4 text-lg font-bold text-[#0369A1]">
                  {formatOptional(row.total_compensation)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="p-12 text-center text-gray-500">
                No salary records found matching your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}



// 'use client';

// import { useSearchParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { formatCurrency } from "@/lib/utils";

// export default function SalaryTable({ 
//   data = [], 
//   meta = { total: 0, page: 1, limit: 25 }, 
//   currency = 'INR' 
// }: { 
//   data: any[], 
//   meta: { total: number, page: number, limit: number }, 
//   currency: 'INR' | 'USD' 
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const COLUMN_MAP: Record<string, string> = {
//     "Company": "company",
//     "Role": "role",
//     "Level": "level",
//     "Location": "location",
//     "Experience": "experience_years",
//     "Base Salary": "base_salary",
//     "Stock": "stock",
//     "Total Comp": "total_compensation"
//   };

//   const handleSort = (header: string) => {
//     const sortKey = COLUMN_MAP[header];
//     const params = new URLSearchParams(searchParams.toString());
//     const currentSort = params.get("sort");
//     const currentOrder = params.get("order");
//     
//     const newOrder = (currentSort === sortKey && currentOrder === "desc") ? "asc" : "desc";
//     
//     params.set("sort", sortKey);
//     params.set("order", newOrder);
//     params.set("page", "1");
//     router.push(`/salaries?${params.toString()}`);
//   };

//   const formatOptional = (val: string | number | undefined) => {
//     const num = Number(val);
//     return (!val || num === 0) ? "—" : formatCurrency(num, currency);
//   };

//   return (
//     <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
//       <table className="w-full text-left border-collapse">
//         <thead className="bg-gray-50 border-b">
//           <tr>
//             {Object.keys(COLUMN_MAP).map((header) => (
//               <th key={header} className="p-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-200" onClick={() => handleSort(header)}>
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((row, index) => (
//               <tr key={row.id || index} className="border-t hover:bg-gray-50">
//                 <td className="p-4 font-medium text-blue-600 hover:underline">
//                   {/* Safety check: Use slug if available, fallback to computed slug */}
//                   <Link href={`/companies/${row.company?.slug || (row.company?.name || 'unknown').toLowerCase().replace(/\s+/g, '-')}`}>
//                     {row.company?.name || "Company Not Found"}
//                   </Link>
//                 </td>
//                 <td className="p-4">{row.role}</td>
//                 <td className="p-4 text-xs font-semibold">{row.level}</td>
//                 <td className="p-4 text-gray-600">{row.location}</td>
//                 <td className="p-4">{row.experience_years} yrs</td>
//                 <td className="p-4">{formatOptional(row.base_salary)}</td>
//                 <td className="p-4">{formatOptional(row.stock)}</td>
//                 <td className="p-4 text-lg font-bold text-[#0369A1]">
//                   {formatOptional(row.total_compensation)}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr><td colSpan={8} className="p-8 text-center text-gray-500">No records found</td></tr>
//           )}
//         </tbody>
//       </table>
//       
//     </div>
//   );
// }