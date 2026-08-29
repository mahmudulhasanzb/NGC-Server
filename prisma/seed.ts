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

const initialTeachers = [
  {
    name: 'Prof. Md. Safiqul Islam',
    designation: 'Principal & Professor of Economics',
    department: 'Economics',
    qualification: 'M.Sc (Econ, DU) • 14th BCS (General Education)',
    email: 'principal@ngc.edu.bd',
    phone: '+880 1711-000001',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Distinguished educator with over 28 years of academic leadership in government colleges across Sylhet division.',
    orderIndex: 1,
  },
  {
    name: 'Nazmun Nahar',
    designation: 'Associate Professor & Head of Bangla',
    department: 'Bangla',
    qualification: 'M.A in Bangla (DU) • 21st BCS (General Education)',
    email: 'nazmun.nahar@ngc.edu.bd',
    phone: '+880 1711-000002',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Dedicated scholar of Bengali literature and cultural coordinator for Nabiganj Government College.',
    orderIndex: 2,
  },
  {
    name: 'Mohammad Kabir Hossain',
    designation: 'Assistant Professor of English',
    department: 'English',
    qualification: 'M.A in English (CU) • 28th BCS (General Education)',
    email: 'kabir.hossain@ngc.edu.bd',
    phone: '+880 1711-000003',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Passionate ELT specialist guiding students in communicative English and literature appreciation.',
    orderIndex: 3,
  },
  {
    name: 'Dr. Farhana Akter',
    designation: 'Assistant Professor of Chemistry',
    department: 'Chemistry',
    qualification: 'Ph.D & M.Sc (SUST) • 31st BCS (General Education)',
    email: 'farhana.chem@ngc.edu.bd',
    phone: '+880 1711-000004',
    photoUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Active researcher with multiple publications in environmental and organic chemistry.',
    orderIndex: 4,
  },
  {
    name: 'Md. Tariqul Islam',
    designation: 'Lecturer in Physics',
    department: 'Physics',
    qualification: 'M.Sc in Applied Physics (DU) • 36th BCS (General Education)',
    email: 'tariqul.phys@ngc.edu.bd',
    phone: '+880 1711-000005',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Head of Physics Laboratory supervising experimental mechanics and modern optics.',
    orderIndex: 5,
  },
  {
    name: 'Abu Sayed Chowdhury',
    designation: 'Lecturer in Mathematics',
    department: 'Mathematics',
    qualification: 'M.Sc in Applied Mathematics (RU) • 37th BCS',
    email: 'sayed.math@ngc.edu.bd',
    phone: '+880 1711-000006',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Inspiring mathematics instructor focused on analytical calculus and algebra mastery.',
    orderIndex: 6,
  },
  {
    name: 'Md. Enamul Haque',
    designation: 'Assistant Professor of Accounting',
    department: 'Business Studies',
    qualification: 'M.Com in Accounting (CU) • 30th BCS',
    email: 'enamul.acc@ngc.edu.bd',
    phone: '+880 1711-000007',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Senior faculty in Business Studies preparing students for corporate finance and commercial accounting.',
    orderIndex: 7,
  },
  {
    name: 'Tanjim Ahmed',
    designation: 'Lecturer in ICT',
    department: 'ICT & Computer Science',
    qualification: 'B.Sc & M.Sc in CSE (SUST) • 38th BCS',
    email: 'tanjim.ict@ngc.edu.bd',
    phone: '+880 1711-000008',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&h=400&q=80',
    bio: 'Chief IT advisor managing college computer lab network and digital literacy programs.',
    orderIndex: 8,
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

  // 3. Sync Notices (Check by unique slug)
  for (const n of initialNotices) {
    const existingNotice = await prisma.notice.findUnique({
      where: { slug: n.slug },
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

  // 4. Sync Teachers
  for (const t of initialTeachers) {
    const existingTeacher = await prisma.teacher.findFirst({
      where: { name: t.name, isDeleted: false },
    });

    if (!existingTeacher) {
      await prisma.teacher.create({
        data: t,
      });
      console.log(`+ Created faculty: ${t.name}`);
    } else {
      await prisma.teacher.update({
        where: { id: existingTeacher.id },
        data: {
          designation: t.designation,
          department: t.department,
          qualification: t.qualification,
          email: t.email,
          phone: t.phone,
          photoUrl: t.photoUrl,
          bio: t.bio,
          orderIndex: t.orderIndex,
        },
      });
      console.log(`✓ Updated faculty: ${t.name}`);
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
