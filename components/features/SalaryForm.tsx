
'use client';

import { submitSalary } from "@/app/actions/submitSalary";
import { useActionState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SalaryForm() {
  const [state, action, pending] = useActionState(submitSalary, null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      
      setTimeout(() => {
        router.push('/salaries');
      }, 1500);
    }
  }, [state, router]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Build a Fairer Future</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Your anonymous data helps thousands of peers negotiate better pay
        </p>
      </div>

      {/* Form Section */}
      <form ref={formRef} action={action} className="bg-white p-8 md:p-10 border border-gray-100 rounded-2xl shadow-lg shadow-gray-100 space-y-8">
        
        <div className="border-b border-gray-100 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Salary Details</h2>
          {/* <p className="text-sm text-gray-500 mt-1">Please provide accurate 
            information for your current role.</p> */}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Column 1 */}
          <div className="space-y-5">
            <InputField label="Company Name" name="companyId" placeholder="e.g. NVIDIA, Google" required />
            <SelectField label="Career Level" name="level" required>
              <option value="" >Select your level</option>
              <option value="L3">L3 </option>
              <option value="L4">L4 </option>
              <option value="L5">L5 </option>
              <option value="L6">L6 </option>
              <option value="SDE-I">SDE I </option>
              <option value="SDE-II">SDE II </option>
              <option value="SDE-III">SDE III </option>
              <option value="Staff">Staff </option>
              <option value="PRINCIPAL">Principal </option>
              <option value="IC4">IC4 </option>
              <option value="IC5">IC5 </option>
            </SelectField>
            <InputField label="Years of Experience" name="experience" type="number" placeholder="e.g. 5" required />
          </div>

          {/* Column 2 */}
          <div className="space-y-5">
            <InputField label="Job Title" name="role" placeholder="e.g. Frontend Developer" required />
            <InputField label="Location" name="location" placeholder="e.g. Bengaluru, Remote" required />
            <SelectField label="Currency" name="currency">
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
              
            </SelectField>
          </div>
        </div>

        {/* Compensation Section */}
        <div className="pt-6 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Total Compensation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="Base Salary" name="salary" type="number" placeholder="2500000" required />
            <InputField label="Yearly Bonus" name="bonus" type="number" placeholder="500000" />
            <InputField label="Yearly Stock" name="stock" type="number" placeholder="1000000" />
          </div>
        </div>

        {/* Submit Section */}
        <div className="pt-4">
          <button 
            type="submit" 
            disabled={pending} 
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all disabled:opacity-50 shadow-md shadow-blue-200"
          >
            {pending ? "Submitting Data..." : "Submit Salary Entry"}
          </button>

          {/* Feedback Messages */}
          {state?.success && (
            <div className="mt-6 p-4 text-center bg-green-50 text-green-700 font-medium rounded-xl border border-green-200 animate-in fade-in">
              Successfully submitted.....
            </div>
          )}
          {state?.success === false && (
            <div className="mt-6 p-4 text-center bg-red-50 text-red-700 font-medium rounded-xl border border-red-200">
            Something went wrong. Please check your inputs and try again.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

// Reusable Input Component
function InputField({ label, name, type = "text", placeholder, required = false }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label} {required && "*"}</label>
      <input name={name} type={type} placeholder={placeholder} required={required} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" />
    </div>
  );
}

// Reusable Select Component
function SelectField({ label, name, children, required = false }: any) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label} {required && "*"}</label>
      <select name={name} required={required} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition">
        {children}
      </select>
    </div>
  );
}


//
{/* Compensation Section - Remove 'required' here */}
<div className="pt-6 border-t border-gray-100">
  <h3 className="text-lg font-bold text-gray-900 mb-6">Total Compensation</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <InputField label="Base Salary" name="salary" type="number" placeholder="2500000" required />
    {/* No 'required' prop here: */}
    <InputField label="Yearly Bonus" name="bonus" type="number" placeholder="500000" />
    {/* No 'required' prop here: */}
    <InputField label="Yearly Stock" name="stock" type="number" placeholder="1000000" />
  </div>
</div>