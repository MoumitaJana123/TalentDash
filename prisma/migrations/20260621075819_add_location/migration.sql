-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "industry" SET DEFAULT 'Technology',
ALTER COLUMN "headquarters" SET DEFAULT 'Unknown';

-- AlterTable
ALTER TABLE "Salary" ALTER COLUMN "currency" SET DEFAULT 'INR',
ALTER COLUMN "experience_years" SET DEFAULT 0,
ALTER COLUMN "source" SET DEFAULT 'CONTRIBUTOR';
