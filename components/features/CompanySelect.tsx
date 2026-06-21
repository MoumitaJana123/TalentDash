

'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CompanySelect({ 
  companies, 
  paramKey, 
  current 
}: { 
  companies: string[], 
  paramKey: string, 
  current: string | undefined 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select 
      className="w-full p-3 border rounded-lg bg-white shadow-sm"
      value={current || ""}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.value) {
            params.set(paramKey, e.target.value.toLowerCase().replace(/\s+/g, '-'));
        } else {
            params.delete(paramKey);
        }
        router.push(`/compare?${params.toString()}`);
      }}
    >
      <option value="">Select a company...</option>
      {companies.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  );
}