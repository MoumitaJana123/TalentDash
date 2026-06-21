// prisma/run-seed.js
require('dotenv').config({ path: '../.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.company.createMany({
    data: [
      { name: 'Microsoft', slug: 'microsoft' },
      { name: 'Amazon', slug: 'amazon' },
      { name: 'Google', slug: 'google' },
      { name: 'Meta', slug: 'meta' }
    ],
    skipDuplicates: true,
  });
  console.log("Seed data created successfully!");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });