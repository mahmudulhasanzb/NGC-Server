import prisma from '../src/lib/prisma';

const initialStats = [
  {
    label: 'Enrolled Students',
    value: '4500+',
    icon: 'Users',
    description: 'Pursuing HSC & Degree academic programs',
    orderIndex: 1,
  },
  {
    label: 'Expert Faculty',
    value: '55+',
    icon: 'GraduationCap',
    description: 'Experienced government BCS cadre educators',
    orderIndex: 2,
  },
  {
    label: 'Academic Success',
    value: '98%',
    icon: 'Award',
    description: 'Consistent high pass rate in board exams',
    orderIndex: 3,
  },
  {
    label: 'Years of Heritage',
    value: '40+',
    icon: 'Building2',
    description: 'Serving the nation with pride since 1984',
    orderIndex: 4,
  },
];

async function main() {
  console.log('Synchronizing initial College Stats into PostgreSQL...');

  for (const stat of initialStats) {
    const existing = await prisma.collegeStat.findFirst({
      where: { label: stat.label, isDeleted: false },
    });

    if (!existing) {
      await prisma.collegeStat.create({ data: stat });
      console.log(`+ Created stat: ${stat.label}`);
    } else {
      await prisma.collegeStat.update({
        where: { id: existing.id },
        data: {
          value: stat.value,
          icon: stat.icon,
          description: stat.description,
          orderIndex: stat.orderIndex,
        },
      });
      console.log(`✓ Updated stat: ${stat.label}`);
    }
  }
  console.log('✅ All 4 College Stats synchronized!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
