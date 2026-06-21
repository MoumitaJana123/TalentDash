/*
  Warnings:

  - Added the required column `updated_at` to the `Company` table without a default value. 
    This is fixed by adding a default of CURRENT_TIMESTAMP.
*/

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "founded_year" INTEGER,
ADD COLUMN     "headcount_range" TEXT,
-- Adding DEFAULT CURRENT_TIMESTAMP ensures existing rows don't violate the NOT NULL constraint
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Salary" ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;