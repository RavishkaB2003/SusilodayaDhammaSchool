import { db } from "./index";
import { users, classes, enrollments, exams, attendance, examMarks, resources, studentProgressHistory, cmsContent } from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("🌱 Seeding database...");

  try {
    // 1. Seed CMS default content
    console.log("CMS Content...");
    await db.insert(cmsContent).values([
      {
        sectionKey: "hero",
        contentData: {
          title: "Nurturing Wisdom & Virtue",
          subtext: "Susilodaya Dhamma School has guided generations of students in the path of Dhamma, cultivating compassionate hearts and clear minds.",
          buttonText: "Enroll Journey",
          imageUrl: "/assets/coverPage/Cover Photo.jpg",
        },
      },
      {
        sectionKey: "about_us",
        contentData: {
          title: "Our Heritage & Vision",
          historyText: "Established with the blessings of the monastic community, Susilodaya Dhamma School stands as a pillar of Buddhist education in the region, conducting weekly lessons in Dhamma, Sutta, Abhidhamma, and traditional history.",
          milestones: [
            { year: "1998", event: "Dhamma School founded with 45 students." },
            { year: "2010", event: "First batch of students completed the YMBA Diploma." },
            { year: "2020", event: "Initiation of digital resource library for remote study." }
          ]
        },
      },
      {
        sectionKey: "collage_gallery",
        contentData: {
          images: [
            "/assets/gallery/sil_program.jpg",
            "/assets/gallery/prize_giving.jpg",
            "/assets/gallery/classroom.jpg"
          ]
        },
      },
      {
        sectionKey: "map",
        contentData: {
          address: "Susilodaya Temple, Temple Road, Colombo, Sri Lanka",
          lat: 6.9271,
          lng: 79.8612,
          zoom: 15
        }
      }
    ]).onConflictDoNothing();

    // 2. Seed classes
    console.log("Classes...");
    const insertedClasses = await db.insert(classes).values([
      { name: "Grade 3 Junior Part 1", grade: "Grade 3", academicYear: 2024, teacherId: "teacher-1" },
      { name: "Grade 4 Junior Part 2", grade: "Grade 4", academicYear: 2025, teacherId: "teacher-1" },
      { name: "Grade 5 Senior Part 1", grade: "Grade 5", academicYear: 2026, teacherId: "teacher-1" }
    ]).returning();

    const classG3Id = insertedClasses[0].id;
    const classG4Id = insertedClasses[1].id;
    const classG5Id = insertedClasses[2].id;

    // 3. Seed users (Admins, Teachers, Students)
    console.log("Users...");
    await db.insert(users).values([
      {
        id: "admin-1",
        fullName: "Venerable Ananda Thero",
        email: "ananda.admin@susilodaya.lk",
        role: "admin",
        status: "active",
      },
      {
        id: "teacher-1",
        fullName: "Mr. Ravindra Perera",
        email: "ravindra.teacher@susilodaya.lk",
        role: "teacher",
        status: "active",
        phone: "+94771234567"
      },
      {
        id: "student-1",
        indexNumber: "S-2024-0042",
        fullName: "Kavindu Perera",
        email: "kavindu.student@susilodaya.lk",
        role: "student",
        status: "active",
        classId: classG5Id,
        dob: "2013-05-15",
        gender: "Male",
        parentName: "Sunil Perera",
        parentPhone: "+94779876543"
      }
    ]).onConflictDoNothing();

    // 4. Seed Exams
    console.log("Exams...");
    const insertedExams = await db.insert(exams).values([
      { name: "Spot Test 1 (Dhamma)", date: "2026-03-10", startTime: "08:30 AM", endTime: "10:30 AM", description: "First assessment of Dhamma concepts." },
      { name: "Spot Test 2 (Sutta)", date: "2026-06-15", startTime: "08:30 AM", endTime: "10:30 AM", description: "Assessment of Sutta recitations." },
      { name: "Term Final (Abhidhamma)", date: "2026-11-20", startTime: "08:30 AM", endTime: "11:30 AM", description: "Year-end final examination." }
    ]).returning();

    const exam1Id = insertedExams[0].id;
    const exam2Id = insertedExams[1].id;
    const exam3Id = insertedExams[2].id;

    // 5. Seed Attendance Logs
    console.log("Attendance...");
    await db.insert(attendance).values([
      { date: "2026-06-01", studentId: "student-1", classId: classG5Id, status: "present", markedBy: "teacher-1" },
      { date: "2026-06-08", studentId: "student-1", classId: classG5Id, status: "present", markedBy: "teacher-1" },
      { date: "2026-06-15", studentId: "student-1", classId: classG5Id, status: "late", markedBy: "teacher-1" },
      { date: "2026-06-22", studentId: "student-1", classId: classG5Id, status: "present", markedBy: "teacher-1" }
    ]);

    // 6. Seed Exam Marks
    console.log("Exam Marks...");
    await db.insert(examMarks).values([
      { studentId: "student-1", examId: exam1Id, marks: "88.00", enteredBy: "teacher-1" },
      { studentId: "student-1", examId: exam2Id, marks: "92.00", enteredBy: "teacher-1" }
    ]);

    // 7. Seed Resources
    console.log("Resources...");
    await db.insert(resources).values([
      { title: "YMBA Grade 5 Syllabus.pdf", fileUrl: "/assets/resources/YMBA-Grade-5-Syllabus.pdf", classId: classG5Id, uploadedBy: "teacher-1" },
      { title: "Buddhist History Guide.pdf", fileUrl: "/assets/resources/Buddhist-History-Guide.pdf", classId: classG5Id, uploadedBy: "teacher-1" }
    ]);

    // 8. Seed Continuous Student Progress History (Kavindu Perera's timeline)
    console.log("Student Progress History...");
    await db.insert(studentProgressHistory).values([
      {
        studentId: "student-1",
        classId: classG3Id,
        overallMarksAverage: "88.00",
        overallAttendanceRate: "98.00",
        teacherComment: "Outstanding performance, excellent grasp of Buddhist concepts.",
        completedAt: "2024-11-30"
      },
      {
        studentId: "student-1",
        classId: classG4Id,
        overallMarksAverage: "82.50",
        overallAttendanceRate: "94.00",
        teacherComment: "Active participant in classroom discussions, very respectful.",
        completedAt: "2025-11-30"
      }
    ]);

    // 9. Seed Enrollments
    console.log("Enrollments...");
    await db.insert(enrollments).values([
      {
        fullName: "Nimal Silva",
        dob: "2014-08-20",
        gender: "Male",
        email: "nimal@gmail.com",
        phone: "+94773456789",
        parentName: "Gunapala Silva",
        parentPhone: "+94776543210",
        targetGrade: "Grade 4",
        status: "pending",
        notes: "Keen to learn Abhidhamma"
      }
    ]);

    console.log("🌱 Database seeded successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
  process.exit(0);
}

main();
