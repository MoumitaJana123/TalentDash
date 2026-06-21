import { PrismaClient, Level, Currency, Source } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning up existing data...");
  // Clear tables in correct order to avoid foreign key constraints
  await prisma.salary.deleteMany({});
  await prisma.company.deleteMany({});

  const upsertCompany = async (name: string) => {
    // Normalization logic as per B2 requirements
    const normalized = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    
    return await prisma.company.upsert({
      where: { normalized_name: normalized },
      update: {},
      create: { 
        name, 
        slug, 
        normalized_name: normalized, 
        industry: "Tech", 
        headquarters: "Bengaluru" 
      },
    });
  };

  const companyNames = ["Google", "Amazon", "Meta", "Microsoft", "Flipkart", "Meesho", "NVIDIA", "Razorpay"];
  
  for (const name of companyNames) {
    const company = await upsertCompany(name);

    await prisma.salary.createMany({
      data: [
        {
          company_id: company.id,
          role: "Software Engineer",
          level: Level.L4,
          location: "Bengaluru",
          currency: Currency.INR,
          experience_years: 3,
          base_salary: BigInt(2500000),
          bonus: BigInt(200000),
          stock: BigInt(500000),
          total_compensation: BigInt(3200000),
          source: Source.CONTRIBUTOR,
        },
        {
          company_id: company.id,
          role: "Principal Engineer",
          level: Level.PRINCIPAL,
          location: "San Francisco",
          currency: Currency.USD,
          experience_years: 15,
          base_salary: BigInt(250000),
          bonus: BigInt(50000),
          stock: BigInt(200000),
          total_compensation: BigInt(500000),
          source: Source.AI_INFERRED,
        },
        {
          company_id: company.id,
          role: "Junior Dev",
          level: Level.L3,
          location: "Pune",
          currency: Currency.INR,
          experience_years: 1,
          base_salary: BigInt(1200000),
          bonus: BigInt(0),
          stock: BigInt(0),
          total_compensation: BigInt(1200000), // Ensures base = TC edge case
          source: Source.CONTRIBUTOR,
        }
      ],
    });
  }
  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });