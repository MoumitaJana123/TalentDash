
'use client';

import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const activeClass = "text-blue-600 font-bold";
  const inactiveClass = "text-slate-600 hover:text-blue-600";

  return (
    <nav className="sticky top-0 z-50 grid grid-cols-3 items-center px-6 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200"> 
      {/* 1. LOGO SECTION (Left Column) */}
      <div className="flex justify-start">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <TrendingUp size={20} strokeWidth={3} />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            TalentDash
          </span>
        </Link>
      </div>

      {/* 2. NAV LINKS (Center Column) */}
      <div className="flex items-center justify-center gap-8">
        <Link 
          href="/salaries" 
          className={`transition ${isActive('/salaries') ? activeClass : inactiveClass}`}
        >
          Salaries
        </Link>
        <Link 
          href="/compare" 
          className={`transition ${isActive('/compare') ? activeClass : inactiveClass}`}
        >
          Compare
        </Link>
      </div>

      {/* 3. CTA BUTTON (Right Column) */}
      <div className="flex justify-end">
        <Link 
          href="/submit" 
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
        >
          Submit Data
        </Link>
      </div>
    </nav>
  );
}