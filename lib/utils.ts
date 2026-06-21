

/**
 * Serializes Prisma BigInt fields to Numbers for JSON compatibility.
 */
export const serializeSalary = (record: any) => {
  return {
    ...record,
    base_salary: record.base_salary ? Number(record.base_salary) : 0,
    bonus: record.bonus ? Number(record.bonus) : 0,
    stock: record.stock ? Number(record.stock) : 0,
    total_compensation: record.total_compensation ? Number(record.total_compensation) : 0,
  };
};

/**
 * Computes the statistical median of an array of numbers.
 */
export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  return sorted.length % 2 !== 0 
    ? sorted[mid] 
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

/**
 * Formats numbers into Indian currency string.
 */
export function formatCurrency(amount: number, currency: 'INR' | 'USD' = 'INR') {
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}