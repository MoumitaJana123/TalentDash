'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function RecordSelect({ 
  records, 
  paramKey, 
  currentId 
}: { 
  records: any[], 
  paramKey: string, 
  currentId: string | undefined 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <select 
      className="w-full p-3 border rounded-lg bg-white shadow-sm"
      value={currentId || ""}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        if (e.target.value) {
            params.set(paramKey, e.target.value); 
        } else {
            params.delete(paramKey);
        }
        router.push(`/compare?${params.toString()}`);
      }}
    >
      <option value="">Select a specific record...</option>
      {records.map(r => (
        <option key={r.id} value={r.id}>
          {r.company} - {r.role} ({r.level})
        </option>
      ))}
    </select>
  );
}