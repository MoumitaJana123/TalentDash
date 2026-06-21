export async function getSalaries(queryParams?: Record<string, string | number | undefined>) {
  // 1. Clean the params: remove undefined or empty string values
  const cleanParams: Record<string, string> = {};
  
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        cleanParams[key] = String(value);
      }
    });
  }

  // 2. Build the query string correctly
  const params = new URLSearchParams(cleanParams);
  const queryString = params.toString();
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const url = `${baseUrl}/api/salaries${queryString ? `?${queryString}` : ''}`;
  
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store' // Ensures fresh data for filters
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch salaries: ${res.statusText}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Salary Fetch Failed:", error);
    // Return a default empty structure so the UI doesn't crash
    return { data: [], meta: { total: 0 } };
  }
}