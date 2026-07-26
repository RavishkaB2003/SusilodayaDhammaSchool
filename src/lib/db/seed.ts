import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config();

const adminId = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";
const teacherId = "b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22";
const studentId = "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33";

async function main() {
  console.log("🌱 Seeding auth schema & public schema...");

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
  }
  const sql = postgres(process.env.DATABASE_URL);

  try {
    // 1. Clean auth tables
    console.log("Cleaning auth tables...");
    await sql`DELETE FROM auth.identities WHERE user_id IN (${adminId}, ${teacherId}, ${studentId})`;
    await sql`DELETE FROM auth.users WHERE id IN (${adminId}, ${teacherId}, ${studentId})`;

    // 2. Insert into auth.users with empty strings for Go-unsupported NULL columns
    console.log("Inserting auth.users...");
    await sql`
      INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, 
        email_confirmed_at, raw_app_meta_data, raw_user_meta_data, 
        is_sso_user, is_anonymous, created_at, updated_at,
        confirmation_token, recovery_token, email_change_token_new, email_change,
        phone_change, phone_change_token, reauthentication_token, email_change_token_current
      )
      VALUES 
        (
          ${adminId}, '00000000-0000-0000-0000-000000000000'::uuid, 'authenticated', 'authenticated', 
          'ananda.admin@susilodaya.lk', crypt('admin123', gen_salt('bf', 10)), 
          now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, 
          false, false, now(), now(),
          '', '', '', '',
          '', '', '', ''
        ),
        (
          ${teacherId}, '00000000-0000-0000-0000-000000000000'::uuid, 'authenticated', 'authenticated', 
          'ravindra.teacher@susilodaya.lk', crypt('teacher123', gen_salt('bf', 10)), 
          now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, 
          false, false, now(), now(),
          '', '', '', '',
          '', '', '', ''
        ),
        (
          ${studentId}, '00000000-0000-0000-0000-000000000000'::uuid, 'authenticated', 'authenticated', 
          's-2024-0042@susilodaya.lk', crypt('student123', gen_salt('bf', 10)), 
          now(), '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb, 
          false, false, now(), now(),
          '', '', '', '',
          '', '', '', ''
        )
    `;

    // 3. Insert into auth.identities
    console.log("Inserting auth.identities...");
    await sql`
      INSERT INTO auth.identities (
        id, user_id, provider_id, provider, identity_data, created_at, updated_at
      )
      VALUES
        (
          gen_random_uuid(), ${adminId}, 'ananda.admin@susilodaya.lk', 'email', 
          ${sql.json({ sub: adminId, email: 'ananda.admin@susilodaya.lk', email_verified: true })}, 
          now(), now()
        ),
        (
          gen_random_uuid(), ${teacherId}, 'ravindra.teacher@susilodaya.lk', 'email', 
          ${sql.json({ sub: teacherId, email: 'ravindra.teacher@susilodaya.lk', email_verified: true })}, 
          now(), now()
        ),
        (
          gen_random_uuid(), ${studentId}, 's-2024-0042@susilodaya.lk', 'email', 
          ${sql.json({ sub: studentId, email: 's-2024-0042@susilodaya.lk', email_verified: true })}, 
          now(), now()
        )
    `;

    // 4. Seed public tables
    console.log("Cleaning public tables...");
    await sql`TRUNCATE public.cms_content CASCADE`;
    await sql`TRUNCATE public.enrollments CASCADE`;
    await sql`TRUNCATE public.attendance CASCADE`;
    await sql`TRUNCATE public.exam_marks CASCADE`;
    await sql`TRUNCATE public.resources CASCADE`;
    await sql`TRUNCATE public.student_progress_history CASCADE`;
    await sql`TRUNCATE public.users CASCADE`;
    await sql`TRUNCATE public.classes CASCADE`;
    await sql`TRUNCATE public.exams CASCADE`;

    console.log("Seeding CMS Content...");
    await sql`
      INSERT INTO public.cms_content (section_key, content_data, updated_at)
      VALUES 
        ('hero', ${sql.json({
          title: "Nurturing Wisdom & Virtue",
          subtext: "For over 20 years, Susilodaya English Medium Dhamma School has guided generations of students in the path of the Dhamma, cultivating compassionate hearts and clear minds. Join us every Saturday morning from 8:30 AM to 11:30 AM.",
          buttonText: "Enroll Journey",
          imageUrl: "/assets/coverPage/cover_hero.png"
        })}, now()),
        ('about_us', ${sql.json({
          title: "Our Heritage & Vision",
          historyText: "Established in 2006, Susilodaya English Medium Dhamma School stands as a pillar of Buddhist education, conducting weekly lessons in Dhamma, Sutta, and Abhidhamma. Over the past two decades, we have guided more than 2,000 alumni. Today, we continue this noble mission with a dedicated staff of 10 teachers nurturing over 100 active students.",
          scheduleText: "Weekly lessons are held every Saturday morning from 8:30 AM to 11:30 AM.",
          milestones: [
            { year: "2006", event: "Dhamma School founded with 30 students." },
            { year: "2016", event: "Completed 10 years of service, reaching 1,000 cumulative alumni." },
            { year: "2026", event: "Celebrating 20 years of Dhamma education with 10 teachers and 100+ active students." }
          ]
        })}, now()),
        ('collage_gallery', ${sql.json({
          images: [
            { url: "/assets/gallery/sil_program.jpg", tag: "Sil Program", isSelected: true, selectedAt: 1783048240001 },
            { url: "/assets/gallery/prize_giving.jpg", tag: "Prize Giving", isSelected: true, selectedAt: 1783048240002 },
            { url: "/assets/gallery/classroom.jpg", tag: "Classrooms", isSelected: true, selectedAt: 1783048240003 },
            { url: "/assets/gallery/temple_entrance.jpg", tag: "Viharaya", isSelected: true, selectedAt: 1783048240004 },
            { url: "/assets/gallery/sil_program_2.jpg", tag: "Sil Program", isSelected: true, selectedAt: 1783048240005 },
            { url: "/assets/gallery/prize_giving_2.jpg", tag: "Prize Giving", isSelected: true, selectedAt: 1783048240006 }
          ]
        })}, now()),
        ('events', ${sql.json({
          events: [
            {
              id: "seed-event-1",
              title: "Saturday Special Sil Program",
              date: "2026-07-18",
              time: "06:00 AM - 05:00 PM",
              location: "Bodhi Tree Pavilion",
              description: "A full-day mindfulness retreat for pupils, featuring guided meditation, Buddha Puja devotionals, and Dhamma discussions under resident monks.",
              imageUrl: "/assets/gallery/sil_program.jpg"
            },
            {
              id: "seed-event-2",
              title: "Vassana Katina Robe Ceremony",
              date: "2026-10-24",
              time: "08:30 AM - 12:00 PM",
              location: "Main Viharaya Grounds",
              description: "The annual sacred Katina Robe offering ceremony at Susilodaya. Participate in morning alms, chanting devotions, and robe presentation processionals.",
              imageUrl: "/assets/gallery/temple_entrance.jpg"
            },
            {
              id: "seed-event-3",
              title: "Annual Academic Prize Giving",
              date: "2026-12-05",
              time: "09:00 AM - 01:00 PM",
              location: "Main School Auditorium",
              description: "Honoring academic excellence, regular Saturday attendance, and exemplary conduct. Merit plaques will be distributed followed by student cultural recitals.",
              imageUrl: "/assets/gallery/prize_giving.jpg"
            }
          ]
        })}, now()),
        ('map', ${sql.json({
          address: "Susilodaya Viharaya, Temple Junction, Negombo, Sri Lanka",
          lat: 7.2183,
          lng: 79.8558,
          zoom: 16
        })}, now()),
        ('enrollment_setting', ${sql.json({
          enrollmentFee: 1000,
          isEnrollmentOpen: false
        })}, now())
    `;

    console.log("Seeding Classes...");
    const classesResult = await sql`
      INSERT INTO public.classes (name, grade, academic_year, teacher_id, created_at, updated_at)
      VALUES 
        ('Grade 3 Junior Part 1', 'Grade 3', 2024, ${teacherId}, now(), now()),
        ('Grade 4 Junior Part 2', 'Grade 4', 2025, ${teacherId}, now(), now()),
        ('Grade 5 Senior Part 1', 'Grade 5', 2026, ${teacherId}, now(), now())
      RETURNING id, name
    `;

    const classG3Id = classesResult[0].id;
    const classG4Id = classesResult[1].id;
    const classG5Id = classesResult[2].id;

    console.log("Seeding Users...");
    await sql`
      INSERT INTO public.users (id, full_name, email, role, status, phone, class_id, dob, gender, parent_name, parent_phone, created_at, updated_at)
      VALUES 
        (${adminId}, 'Venerable Ananda Thero', 'ananda.admin@susilodaya.lk', 'admin', 'active', null, null, null, null, null, null, now(), now()),
        (${teacherId}, 'Mr. Ravindra Perera', 'ravindra.teacher@susilodaya.lk', 'teacher', 'active', '+94771234567', null, null, null, null, null, now(), now())
    `;

    await sql`
      INSERT INTO public.users (id, index_number, full_name, email, role, status, class_id, dob, gender, parent_name, parent_phone, created_at, updated_at)
      VALUES
        (${studentId}, 'S-2024-0042', 'Kavindu Perera', 's-2024-0042@susilodaya.lk', 'student', 'active', ${classG5Id}, '2013-05-15', 'Male', 'Sunil Perera', '+94779876543', now(), now())
    `;

    console.log("Seeding Exams...");
    const examsResult = await sql`
      INSERT INTO public.exams (name, date, start_time, end_time, description, created_at)
      VALUES
        ('Spot Test 1 (Dhamma)', '2026-03-10', '08:30 AM', '10:30 AM', 'First assessment of Dhamma concepts.', now()),
        ('Spot Test 2 (Sutta)', '2026-06-15', '08:30 AM', '10:30 AM', 'Assessment of Sutta recitations.', now()),
        ('Term Final (Abhidhamma)', '2026-11-20', '08:30 AM', '11:30 AM', 'Year-end final examination.', now())
      RETURNING id
    `;
    const exam1Id = examsResult[0].id;
    const exam2Id = examsResult[1].id;

    console.log("Seeding Attendance...");
    await sql`
      INSERT INTO public.attendance (date, student_id, class_id, status, marked_by, created_at)
      VALUES
        ('2026-06-01', ${studentId}, ${classG5Id}, 'present', ${teacherId}, now()),
        ('2026-06-08', ${studentId}, ${classG5Id}, 'present', ${teacherId}, now()),
        ('2026-06-15', ${studentId}, ${classG5Id}, 'late', ${teacherId}, now()),
        ('2026-06-22', ${studentId}, ${classG5Id}, 'present', ${teacherId}, now())
    `;

    console.log("Seeding Exam Marks...");
    await sql`
      INSERT INTO public.exam_marks (student_id, exam_id, marks, entered_by, created_at)
      VALUES
        (${studentId}, ${exam1Id}, 88.00, ${teacherId}, now()),
        (${studentId}, ${exam2Id}, 92.00, ${teacherId}, now())
    `;

    console.log("Seeding Resources...");
    await sql`
      INSERT INTO public.resources (title, file_url, class_id, uploaded_by, created_at)
      VALUES
        ('YMBA Grade 5 Syllabus.pdf', '/assets/resources/YMBA-Grade-5-Syllabus.pdf', ${classG5Id}, ${teacherId}, now()),
        ('Buddhist History Guide.pdf', '/assets/resources/Buddhist-History-Guide.pdf', ${classG5Id}, ${teacherId}, now())
    `;

    console.log("Seeding Student Progress History...");
    await sql`
      INSERT INTO public.student_progress_history (student_id, class_id, overall_marks_average, overall_attendance_rate, teacher_comment, completed_at)
      VALUES
        (${studentId}, ${classG3Id}, 88.00, 98.00, 'Outstanding performance, excellent grasp of Buddhist concepts.', '2024-11-30'),
        (${studentId}, ${classG4Id}, 82.50, 94.00, 'Active participant in classroom discussions, very respectful.', '2025-11-30')
    `;

    console.log("Seeding Enrollments...");
    await sql`
      INSERT INTO public.enrollments (full_name, dob, gender, email, phone, parent_name, parent_phone, target_grade, status, notes, created_at, updated_at)
      VALUES
        ('Nimal Silva', '2014-08-20', 'Male', 'nimal@gmail.com', '+94773456789', 'Gunapala Silva', '+94776543210', 'Grade 4', 'pending', 'Keen to learn Abhidhamma', now(), now())
    `;

    console.log("🌱 Seeding completed successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await sql.end();
  }
}

main();
