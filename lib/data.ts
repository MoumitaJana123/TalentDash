
 import { MOCK_SALARIES } from "./mock-data";

export async function getFilteredSalaries(filters: any) {
  // 1. Filter Logic
  let filtered = MOCK_SALARIES.filter((s) => {
    const matchComp = filters.company
      ? s.company.toLowerCase().includes(filters.company.toLowerCase())
      : true;

    const matchLevel = filters.level
      ? filters.level.split(",").includes(s.level)
      : true;

    const matchLoc = filters.location
      ? s.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const matchRole = filters.role
      ? s.role.toLowerCase().includes(filters.role.toLowerCase())
      : true;

    return matchComp && matchLevel && matchLoc && matchRole;
  });

  // 2. Sorting Logic
  const sortMap: Record<string, string> = {
    company: "company",
    role: "role",
    level: "level",
    location: "location",
    experience: "experienceYears",
    basesalary: "baseSalary",
    stock: "stock",
    totalcomp: "totalComp",
  };

  const rawSortKey = filters.sort || "totalcomp";
  const sortKey = (sortMap[rawSortKey] ||
    "totalComp") as keyof (typeof MOCK_SALARIES)[0];

  const order = filters.order || "desc";

  filtered.sort((a, b) => {
    let valA: any = a[sortKey] ?? 0;
    let valB: any = b[sortKey] ?? 0;

    if (typeof valA === "string") valA = valA.toLowerCase();
    if (typeof valB === "string") valB = valB.toLowerCase();

    if (valA < valB) return order === "asc" ? -1 : 1;
    if (valA > valB) return order === "asc" ? 1 : -1;

    return 0;
  });

  // 3. Pagination Logic
  const page = parseInt(filters.page) || 1;
  const limit = 25;
  const startIndex = (page - 1) * limit;

  const paginatedData = filtered.slice(startIndex, startIndex + limit);

  return {
    data: paginatedData,
    meta: {
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    },
  };
}