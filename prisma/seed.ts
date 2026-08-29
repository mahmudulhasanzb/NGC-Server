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

const initialNotices = [
  {
    title: 'HSC Admission 2025–2026: Application & Document Verification Guidelines',
    slug: 'hsc-admission-2025-2026-guidelines',
    content: 'All candidates selected for admission to Nabiganj Government College (College Code: 1301, EIIN: 129524) for the academic session 2025-2026 are hereby instructed to complete their physical verification and document submission at the college campus by September 15, 2025. Please bring original SSC transcript, testimonial, and 4 passport size photos.',
    category: 'ADMISSION',
    isFeatured: true,
  },
  {
    title: 'HSC 1st Year Pre-Test Examination Schedule & Seat Plan Announced',
    slug: 'hsc-1st-year-pre-test-exam-schedule',
    content: 'The Pre-Test Examination for HSC 1st Year (Science, Humanities, and Business Studies) will commence from October 5, 2025. Students must collect their admit cards from their respective department heads. Detailed routine and room allocations are posted on the notice board.',
    category: 'EXAM',
    isFeatured: true,
  },
  {
    title: 'National Mourning Day & Independence Observance Cultural Program',
    slug: 'national-observance-cultural-program',
    content: 'Nabiganj Government College will observe the national commemorative program with solemn respect. A discussion session, essay competition, and cultural gathering will be held in the college auditorium starting at 10:00 AM.',
    category: 'EVENT',
    isFeatured: false,
  },
  {
    title: 'Degree (Pass) 2nd Year Form Fill-Up & Registration Deadlines',
    slug: 'degree-pass-2nd-year-form-fillup',
    content: 'Under National University (College Code: 1706), regular and irregular students of Degree (Pass) 2nd Year are notified that the online form fill-up window is now active. All fees must be deposited through the designated bank branch.',
    category: 'ACADEMIC',
    isFeatured: false,
  },
  {
    title: 'Distribution of Free Government Textbooks & Digital Student ID Cards',
    slug: 'free-textbooks-student-id-distribution',
    content: 'Newly enrolled students can collect their government-issued curriculum textbooks and biometric smart identity cards from the central library counter between 10:00 AM and 2:00 PM on weekdays.',
    category: 'GENERAL',
    isFeatured: false,
  },
];

async function main() {
  console.log('Synchronizing initial Data into PostgreSQL...');

  // 1. Ensure Admin Author User exists
  let admin = await prisma.user.findFirst({
    where: { isDeleted: false },
  });

  if (!admin) {
    admin = await prisma.user.create({
      data: {
        name: 'Principal / Admin',
        email: 'admin@ngc.edu.bd',
        password: 'hashed_system_pw',
        role: 'ADMIN',
      },
    });
    console.log('+ Created default Admin user');
  }

  // 2. Sync Stats
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

  // 3. Sync Notices
  for (const n of initialNotices) {
    const existingNotice = await prisma.notice.findFirst({
      where: { slug: n.slug, isDeleted: false },
    });

    if (!existingNotice) {
      await prisma.notice.create({
        data: {
          title: n.title,
          slug: n.slug,
          content: n.content,
          category: n.category as any,
          isFeatured: n.isFeatured,
          authorId: admin.id,
        },
      });
      console.log(`+ Created notice: ${n.title}`);
    }
  }

  console.log('✅ PostgreSQL database seeded successfully with realistic NGC data!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
