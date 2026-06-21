

import SalaryForm from "@/components/features/SalaryForm";
import { prisma } from "@/lib/prisma";

export default async function SubmitPage() {
  // Fetch companies for the form dropdown
  const companies = await prisma.company.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <main className="p-8 max-w-xl mx-auto">
      <header className="mb-8 text-center">
        {/* <h1 className="text-3xl font-extrabold text-gray-900">Contribute a Salary</h1>
        <p className="text-gray-600 mt-2">
          Help others negotiate better by anonymously sharing your compensation data.
        </p> */}
      </header>
      
      <SalaryForm companies={companies} />
    </main>
  );
}


  