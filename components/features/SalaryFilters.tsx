
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import { useEffect, useState } from 'react';

export default function SalaryFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [company, setCompany] = useState(searchParams.get('company') || '');
  const debouncedCompany = useDebounce(company.trim(), 400);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    params.set('page', '1');
    router.push(`/salaries?${params.toString()}`);
  };

  useEffect(() => {
    const currentCompany = searchParams.get('company') || '';
    if (debouncedCompany !== currentCompany) {
      updateParam('company', debouncedCompany || null);
    }
  }, [debouncedCompany]);

  const currentCurrency = searchParams.get('currency') || 'INR';

  return (
    <div className="p-6 bg-white border rounded-xl shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 items-end">
        
        {/* Company Search */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Company</label>
          <input 
            placeholder="Search..." 
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Role Filter */}
        {/* <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
          <select 
            value={searchParams.get('role') || ''}
            onChange={(e) => updateParam('role', e.target.value || null)} 
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="">All Roles</option>
            <option value="SDE-I">SDE I</option>
            <option value="SDE-II">SDE II</option>
            <option value="Staff Engineer">Staff Engineer</option>
          </select>
        </div> */}

        <div className="relative">
  <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
  
  {/* Dropdown Button */}
  <button
    type="button"
    onClick={(e) => {
      const menu = e.currentTarget.nextElementSibling;
      menu?.classList.toggle('hidden');
    }}
    className="w-full p-2 border rounded-lg bg-white text-left flex justify-between items-center"
  >
    {searchParams.get('role') || 'All Roles'}
    <span>▾</span>
  </button>

  {/* Scrollable Menu */}
  <div className="hidden absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-xl max-h-48 overflow-y-auto">
    <button
      onClick={() => updateParam('role', null)}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
    >
      All Roles
    </button>
    
    {/* Add as many roles as you want here */}
    {['Software Developer', 'Devops Engineer', 'Staff Engineer', 'Frontend Developer', 'Backend Developer','Principal Engineer', 'Software Engineer','Full Stack Developer','AI Engineer',].map((role) => (
      <button
        key={role}
        onClick={() => updateParam('role', role)}
        className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm"
      >
        {role}
      </button>
    ))}
  </div>
</div>

        {/* Location Filter */}
        {/* <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
          <select 
            value={searchParams.get('location') || ''}
            onChange={(e) => updateParam('location', e.target.value || null)} 
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="">All Locations</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Remote">Remote</option>
          </select>
        </div> */}
         {/* Location Filter */}
        <div className="relative">
  <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
  
  {/* Dropdown Button */}
  <button
    type="button"
    onClick={(e) => {
      const menu = e.currentTarget.nextElementSibling;
      menu?.classList.toggle('hidden');
    }}
    className="w-full p-2 border rounded-lg bg-white text-left flex justify-between items-center"
  >
    {searchParams.get('location') || 'All Locations'}
    <span>▾</span>
  </button>

  {/* Scrollable Menu */}
  <div className="hidden absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-xl max-h-48 overflow-y-auto">
    <button
      onClick={() => updateParam('location', null)}
      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
    >
      All Locations
    </button>
    
    {/* Add your locations here - it will scroll if the list is long */}
    {['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Kolkata','Chennai', 'San Francisco','Remote'].map((loc) => (
      <button
        key={loc}
        onClick={() => updateParam('location', loc)}
        className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-sm"
      >
        {loc}
      </button>
    ))}
  </div>
</div>

       
        <div className="relative">
  <label className="block text-sm font-semibold text-gray-700 mb-1">Level</label>
  <div className="relative">
    <button
      type="button"
      onClick={() => {
        const dropdown = document.getElementById('level-dropdown');
        dropdown?.classList.toggle('hidden');
      }}
      className="w-full p-2 border rounded-lg bg-white text-left flex justify-between items-center"
    >
      <span className="truncate">
        {(searchParams.get('level') || 'All Levels').replace(/,/g, ', ')}
      </span>
      <span>▾</span>
    </button>

    <div
      id="level-dropdown"
      className="hidden absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-xl p-2 max-h-60 overflow-y-auto"
    >
      {['L3', 'L4', 'L5', 'L6', 'Principal', 'SDE-I','SDE-II','SDE-III','Staff', 'IC4', 'IC5' ].map((level) => {
        const currentLevels = searchParams.get('level')?.split(',') || [];
        const isChecked = currentLevels.includes(level);

        return (
          <label key={level} className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer rounded">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => {
                const nextLevels = isChecked
                  ? currentLevels.filter((l) => l !== level)
                  : [...currentLevels, level];
                updateParam('level', nextLevels.length > 0 ? nextLevels.join(',') : null);
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{level}</span>
          </label>
        );
      })}
    </div>
  </div>
</div>

        
        {/* Currency Toggle */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Currency</label>
          <div className="flex bg-gray-100 p-1 rounded-full w-fit border">
            <button
              onClick={() => updateParam('currency', 'INR')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                currentCurrency === 'INR' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              ₹ INR
            </button>
            <button
              onClick={() => updateParam('currency', 'USD')}
              className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                currentCurrency === 'USD' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500'
              }`}
            >
              $ USD
            </button>
          </div>
        </div>
        {/* Sort Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Sort</label>
          <select 
            value={searchParams.get('sort') || 'newest'}
            onChange={(e) => updateParam('sort', e.target.value)}
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="comp-desc">Total Comp: High → Low</option>
            <option value="comp-asc">Total Comp: Low → High</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>






      <div className="mt-4 text-right">
        <button 
          onClick={() => router.push('/salaries')}
          className="text-xs text-gray-400 hover:text-red-600 underline"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}