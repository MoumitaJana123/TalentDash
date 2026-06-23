"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Briefcase } from "lucide-react";
import Link from "next/link";

// Now that "use client" is at the top, this export works correctly
export const dynamic = "force-dynamic";

export default function HomePage() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Guard Clause: If both fields are empty, do nothing
    if (!company.trim() && !role.trim()) {
      return; 
    }

    // Only add parameters to the URL if they have content
    const params = new URLSearchParams();
    if (company.trim()) params.set("company", company.trim());
    if (role.trim()) params.set("role", role.trim());

    // Navigate to /salaries?company=...&role=...
    router.push(`/salaries?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
            Compensation Intelligence
          </h1>
          <p className="text-xl text-slate-600 mb-12">
            Access thousands of verified salary reports. Make decision-ready career moves.
          </p>

          {/* Search Engine */}
          <form 
            onSubmit={handleSearch}
            className="bg-white p-3 rounded-2xl shadow-2xl border border-slate-200 flex flex-col md:flex-row gap-2"
          >
            <div className="flex-1 flex items-center px-4">
              <Building2 className="text-slate-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Company (e.g. Amazon)" 
                className="w-full p-3 outline-none text-lg" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="flex-1 flex items-center px-4 border-l border-slate-100">
              <Briefcase className="text-slate-400 mr-3" size={20} />
              <input 
                type="text" 
                placeholder="Role (e.g. Software Engineer)" 
                className="w-full p-3 outline-none text-lg" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <button 
              type="submit"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Contribution Hook */}
      <section className="py-16 bg-slate-50 text-center">
        <h2 className="text-2xl font-bold mb-4">Help the community</h2>
        <p className="text-slate-600 mb-8">Share your salary anonymously to unlock full platform insights.</p>
        <Link 
          href="/submit" 
          className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition"
        >
          Share your salary
        </Link>
      </section>
    </main>
  );
}