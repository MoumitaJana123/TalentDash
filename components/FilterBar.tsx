
'use client';
import { useRouter } from 'next/navigation';

export default function FilterBar() {
  const router = useRouter();

  const handleFilterChange = (companyName: string) => {
    // This updates the URL, which triggers the Server Component (page.tsx) to re-run
    router.push(`/salaries?company=${companyName}`);
  };

  return <input onChange={(e) => handleFilterChange(e.target.value)} />;
}