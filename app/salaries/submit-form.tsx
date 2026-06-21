'use client';

import { submitSalary } from "../actions/submitSalary";
import { useActionState } from "react";

// Define the shape of your form state for type safety
type FormState = {
  error?: string;
  success?: boolean;
} | null;

export default function SalaryForm({ companies }: { companies: any[] }) {
  // Initialize with null or an empty object matching FormState
  const [state, action, isPending] = useActionState<FormState, FormData>(submitSalary, null);

  return (
    <form action={action} className="p-6 bg-gray-50 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Add Your Salary</h2>
      
      {/* Display errors if they exist */}
      {state?.error && (
        <div className="p-2 mb-4 text-red-600 bg-red-100 rounded">
          {state.error}
        </div>
      )}

      <div className="space-y-4">
        <select name="companyId" className="block w-full p-2 border rounded" required>
          <option value="">Select a Company</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input name="role" placeholder="Role" className="block w-full p-2 border rounded" required />
        <input name="base_salary" type="number" placeholder="Base Salary" className="block w-full p-2 border rounded" required />
      </div>

      <button type="submit" disabled={isPending} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
        {isPending ? "Submitting..." : "Submit Data"}
      </button>
    </form>
  );
}

