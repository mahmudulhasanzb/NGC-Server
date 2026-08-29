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
    qualification: 'B.Sc (Hons), M.Sc in Economics (DU) • 14th BCS (General Education)',
    presentAddress: 'College Quarter, Nabiganj Govt. College Campus, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Shibpasha, Post: Nabiganj, Upazila: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N406889',
    joiningDate: '1994-07-30',
    experience: '30+ Years of Academic Administration & Teaching',
    interest: 'Macroeconomics, Educational Leadership, Academic Policy',
    phone: '+880 1711-000001',
    email: 'principal@ngc.edu.bd',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=80',
    orderIndex: 1,
  },
  {
    name: 'Nazmun Nahar',
    designation: 'Associate Professor & Head of Bangla',
    department: 'Bangla',
    qualification: 'B.A. (Hons), M.A. in Bangla (DU) • 21st BCS (General Education)',
    presentAddress: 'Teacher Residential Area, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Gujakhail, Post: Goplarbazar, Nabiganj, Habiganj',
    mpoIndexNo: 'N512304',
    joiningDate: '2001-03-15',
    experience: '24 Years of Teaching & Literary Research',
    interest: 'Modern Bengali Literature, Folklore Studies, Cultural History',
    phone: '+880 1711-000002',
    email: 'nazmun.nahar@ngc.edu.bd',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=600&q=80',
    orderIndex: 2,
  },
  {
    name: 'Mohammad Kabir Hossain',
    designation: 'Assistant Professor of English',
    department: 'English',
    qualification: 'B.A. (Hons), M.A. in English (CU) • 28th BCS (General Education)',
    presentAddress: 'Main Road, Nabiganj Sadar, Habiganj',
    permanentAddress: 'Vill: Kargaon, Post: Nabiganj, Upazila: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N628491',
    joiningDate: '2008-09-12',
    experience: '17 Years of Teaching & Applied Linguistics',
    interest: 'Romantic Poetry, Post-colonial Literature, Communicative English',
    phone: '+880 1711-000003',
    email: 'kabir.hossain@ngc.edu.bd',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=80',
    orderIndex: 3,
  },
  {
    name: 'Dr. Farhana Akter',
    designation: 'Assistant Professor of Chemistry',
    department: 'Chemistry',
    qualification: 'B.Sc (Hons), M.Sc, Ph.D in Chemistry (SUST) • 31st BCS',
    presentAddress: 'Hospital Road, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Shibpasha, Post: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N789230',
    joiningDate: '2017-11-18',
    experience: '8 Years of Chemistry Teaching & Research',
    interest: 'Organic Synthesis, Environmental Chemistry, Laboratory Methods',
    phone: '+880 1711-000004',
    email: 'farhana.chem@ngc.edu.bd',
    photoUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&h=600&q=80',
    orderIndex: 4,
  },
  {
    name: 'Md. Tariqul Islam',
    designation: 'Lecturer in Physics',
    department: 'Physics',
    qualification: 'B.Sc (Hons), M.Sc in Physics (DU) • 36th BCS (General Education)',
    presentAddress: 'College Staff Quarter, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Bausi, Post: Nabiganj, Upazila: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N674201',
    joiningDate: '2011-06-01',
    experience: '14 Years in Classical & Modern Physics Instruction',
    interest: 'Optics, Solid State Physics, Laboratory Instrumentation',
    phone: '+880 1711-000005',
    email: 'tariqul.phys@ngc.edu.bd',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=600&q=80',
    orderIndex: 5,
  },
  {
    name: 'Abu Sayed Chowdhury',
    designation: 'Lecturer in Mathematics',
    department: 'Mathematics',
    qualification: 'B.Sc (Hons), M.Sc in Applied Mathematics (RU) • 37th BCS',
    presentAddress: 'College Road, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Dinarpur, Post: Goplarbazar, Nabiganj, Habiganj',
    mpoIndexNo: 'N812340',
    joiningDate: '2019-01-04',
    experience: '6 Years in Higher Secondary Mathematics',
    interest: 'Differential Calculus, Complex Analysis, Mathematical Modeling',
    phone: '+880 1711-000006',
    email: 'sayed.math@ngc.edu.bd',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=600&q=80',
    orderIndex: 6,
  },
  {
    name: 'Md. Enamul Haque',
    designation: 'Assistant Professor of Accounting',
    department: 'Business Studies',
    qualification: 'B.B.A (Hons), M.B.A in Accounting (CU) • 30th BCS',
    presentAddress: 'Station Road, Nabiganj, Habiganj',
    permanentAddress: 'Vill: Shibpasha, Post: Nabiganj, Dist: Habiganj',
    mpoIndexNo: 'N890123',
    joiningDate: '2021-08-15',
    experience: '4 Years in Financial & Management Accounting',
    interest: 'Auditing, Corporate Taxation, International Financial Reporting',
    phone: '+880 1711-000007',
    email: 'enamul.acc@ngc.edu.bd',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=600&q=80',
    orderIndex: 7,
  },
  {
    name: 'Tanjim Ahmed',
    designation: 'Lecturer in ICT',
    department: 'ICT & Computer Science',
    qualification: 'B.Sc & M.Sc in CSE (SUST) • 38th BCS (General Education)',
    presentAddress: 'Teacher Quarter, Nabiganj Govt. College, Habiganj',
    permanentAddress: 'Vill: Auskandi, Post: Auskandi, Nabiganj, Habiganj',
    mpoIndexNo: 'N901245',
    joiningDate: '2022-03-01',
    experience: '3+ Years in ICT & Programming Education',
    interest: 'Algorithms, Web Development, Database Management Systems',
    phone: '+880 1711-000008',
    email: 'tanjim.ict@ngc.edu.bd',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&h=600&q=80',
    orderIndex: 8,
  },
];

const initialGallery = [
  {
    title: 'Annual Prize Distribution & Merit Award Ceremony',
    imageUrl: 'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    caption: 'Celebrating high academic achievers and board distinction holders with honorable guests and college faculty.',
    category: 'Ceremony',
    isFeatured: true,
  },
  {
    title: 'District Science Fair & Student Innovation Projects',
    imageUrl: 'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    caption: 'Science faculty students presenting renewable energy prototypes, solar setups, and automation models.',
    category: 'Academic',
    isFeatured: true,
  },
  {
    title: 'Weekly Morning Assembly & Physical Discipline Drill',
    imageUrl: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    caption: 'Fostering discipline, punctuality, and fitness during assembly at the central college grounds.',
    category: 'Campus',
    isFeatured: true,
  },
  {
    title: 'Serene Sunset View of Nabiganj College Academic Building',
    imageUrl: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    caption: 'The peaceful academic atmosphere of Nabiganj Government College campus at dusk.',
    category: 'Campus',
    isFeatured: true,
  },
  {
    title: 'Faculty Reception & Welcome Ceremony for New Educators',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    caption: 'Warm felicitations for newly posted BCS cadre professors and lecturers by the college administration.',
    category: 'Faculty',
    isFeatured: true,
  },
  {
    title: 'Digital Skills & Computer Programming Workshop',
    imageUrl: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    caption: 'Hands-on ICT workshop equipping students with modern web and software problem-solving skills.',
    category: 'Workshop',
    isFeatured: true,
  },
  {
    title: 'Inter-Department Annual Football Championship Final',
    imageUrl: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    caption: 'Thrilling final match between Science and Business Studies departments at the college sports ground.',
    category: 'Sports',
    isFeatured: false,
  },
  {
    title: 'Central Library Study & Academic Reference Counter',
    imageUrl: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    caption: 'Students utilizing the extensive institutional collection of textbooks, research journals, and quiet study bays.',
    category: 'Academic',
    isFeatured: false,
  },
  {
    title: 'Cultural Program & Observance of International Mother Language Day',
    imageUrl: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop',
    caption: 'Poetry recitations, patriotic songs, and drama staged by college cultural club members in the auditorium.',
    category: 'Cultural',
    isFeatured: false,
  },
];

async function main() {
  console.log('Synchronizing full Data into PostgreSQL...');

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
          presentAddress: t.presentAddress,
          permanentAddress: t.permanentAddress,
          mpoIndexNo: t.mpoIndexNo,
          joiningDate: t.joiningDate,
          experience: t.experience,
          interest: t.interest,
          email: t.email,
          phone: t.phone,
          photoUrl: t.photoUrl,
          orderIndex: t.orderIndex,
        },
      });
      console.log(`✓ Updated faculty: ${t.name}`);
    }
  }

  // 5. Sync Gallery
  for (const g of initialGallery) {
    const existing = await prisma.galleryItem.findFirst({
      where: { title: g.title, isDeleted: false },
    });

    if (!existing) {
      await prisma.galleryItem.create({ data: g });
      console.log(`+ Created gallery item: ${g.title}`);
    } else {
      await prisma.galleryItem.update({
        where: { id: existing.id },
        data: {
          imageUrl: g.imageUrl,
          caption: g.caption,
          category: g.category,
          isFeatured: g.isFeatured,
        },
      });
      console.log(`✓ Updated gallery item: ${g.title}`);
    }
  }

  console.log('✅ PostgreSQL database seeded with full realistic faculty, notices, and gallery info!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
