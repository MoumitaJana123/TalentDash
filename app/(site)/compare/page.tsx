import { Suspense } from "react";
import { MOCK_SALARIES } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import RecordSelect from "@/components/features/RecordSelect";

export default async function ComparePage({ 
  searchParams 
}: { 
  searchParams: Promise<{ s1?: string; s2?: string }> 
}) {
  const { s1, s2 } = await searchParams;
  const rec1 = MOCK_SALARIES.find(r => r.id === s1);
  const rec2 = MOCK_SALARIES.find(r => r.id === s2);

  // Helper to calculate and format the delta
  const getDelta = (valA: number, valB: number) => {
    const diff = valA - valB;
    const sign = diff > 0 ? "+" : "";
    const color = diff > 0 ? "text-green-600" : diff < 0 ? "text-red-600" : "text-gray-500";
    return { text: `${sign}${formatCurrency(diff, 'INR')}`, color };
  };

  return (
    <main className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Compare Salary Records</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <RecordSelect records={MOCK_SALARIES} paramKey="s1" currentId={s1} />
        <RecordSelect records={MOCK_SALARIES} paramKey="s2" currentId={s2} />
      </div>

      {s1 && s2 && s1 === s2 ? (
        <div className="p-8 text-center bg-red-50 text-red-700 font-bold rounded-xl border border-red-200">
          ⚠️ Please select two different salary records to compare.
        </div>
      ) : (rec1 && rec2) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[rec1, rec2].map((record, index) => {
            const isWinner = index === 0 ? (rec1.totalComp > rec2.totalComp) : (rec2.totalComp > rec1.totalComp);
            const other = index === 0 ? rec2 : rec1;

            return (
              <div key={record.id} className="border rounded-xl bg-white shadow-sm overflow-hidden">
                <div className="bg-gray-50 p-4 border-b font-bold flex justify-between items-center">
                  {record.company}
                  {isWinner && <span className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded-full">Higher TC</span>}
                </div>
                
                <table className="w-full text-sm">
                  <tbody className="divide-y">
                    {[
                      { label: "Role", value: record.role },
                      { label: "Level", value: record.level },
                      { label: "Experience", value: `${record.experienceYears}y` },
                      { label: "Base", value: record.baseSalary, compare: other.baseSalary },
                      { label: "Bonus", value: record.bonus || 0, compare: other.bonus || 0 },
                      { label: "Stock", value: record.stock || 0, compare: other.stock || 0 },
                      { label: "Total Comp", value: record.totalComp, compare: other.totalComp, isTotal: true },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="p-3 font-semibold text-gray-500">{row.label}</td>
                        <td className="p-3 text-right">
                          <div className={row.isTotal ? "font-bold text-blue-700" : ""}>
                            {typeof row.value === 'number' ? formatCurrency(row.value, 'INR') : row.value}
                          </div>
                          {row.compare !== undefined && typeof row.value === 'number' && (
                            <div className={`text-[10px] font-bold ${getDelta(row.value, row.compare).color}`}>
                              {getDelta(row.value, row.compare).text}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center p-12 text-gray-400">Select two records above to compare details.</div>
      )}
    </main>
  );
}