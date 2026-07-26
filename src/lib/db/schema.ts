import { pgTable, serial, text, integer, date, timestamp, decimal, jsonb, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const userRoleEnum = pgEnum("user_role", ["admin", "teacher", "student"]);
export const userStatusEnum = pgEnum("user_status", ["active", "suspended"]);
export const enrollmentStatusEnum = pgEnum("enrollment_status", ["pending", "approved", "rejected"]);
export const attendanceStatusEnum = pgEnum("attendance_status", ["present", "absent", "late", "excused"]);

// 1. Classes Table (must be declared before users to allow references if needed, but they reference each other. 
// We will resolve references in Drizzle Relations to avoid circular dependencies in SQL table creation.)
export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  grade: text("grade").notNull(),
  academicYear: integer("academic_year").notNull(),
  teacherId: text("teacher_id"), // References users.id (assigned class teacher)
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Users Table
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Supabase Auth UID
  indexNumber: text("index_number").unique(), // Nullable for teachers/admins
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").$type<"admin" | "teacher" | "student">().notNull(),
  profileImageUrl: text("profile_image_url"),
  classId: integer("class_id").references(() => classes.id), // For students
  phone: text("phone"),
  dob: date("dob"),
  gender: text("gender"),
  parentName: text("parent_name"),
  parentPhone: text("parent_phone"),
  status: text("status").$type<"active" | "suspended">().default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 3. Enrollments Table (for public registration)
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  dob: date("dob").notNull(),
  gender: text("gender").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  parentName: text("parent_name").notNull(),
  parentPhone: text("parent_phone").notNull(),
  targetGrade: text("target_grade").notNull(),
  status: text("status").$type<"pending" | "approved" | "rejected">().default("pending").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 4. Exams Table
export const exams = pgTable("exams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  date: date("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 5. Attendance Table
export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  date: date("date").notNull(),
  studentId: text("student_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  classId: integer("class_id").references(() => classes.id, { onDelete: "cascade" }).notNull(),
  status: text("status").$type<"present" | "absent" | "late" | "excused">().notNull(),
  markedBy: text("marked_by").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 6. Exam Marks Table
export const examMarks = pgTable("exam_marks", {
  id: serial("id").primaryKey(),
  studentId: text("student_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  examId: integer("exam_id").references(() => exams.id, { onDelete: "cascade" }).notNull(),
  marks: decimal("marks", { precision: 5, scale: 2 }).notNull(),
  enteredBy: text("entered_by").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 7. Study Resources Table
export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  fileUrl: text("file_url").notNull(),
  classId: integer("class_id").references(() => classes.id, { onDelete: "cascade" }).notNull(),
  uploadedBy: text("uploaded_by").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 8. Student Progress History (Continuous Tracking Across Classes)
export const studentProgressHistory = pgTable("student_progress_history", {
  id: serial("id").primaryKey(),
  studentId: text("student_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  classId: integer("class_id").references(() => classes.id, { onDelete: "cascade" }).notNull(),
  overallMarksAverage: decimal("overall_marks_average", { precision: 5, scale: 2 }),
  overallAttendanceRate: decimal("overall_attendance_rate", { precision: 5, scale: 2 }),
  teacherComment: text("teacher_comment"),
  completedAt: date("completed_at").notNull(),
});

// 9. Website CMS Content
export const cmsContent = pgTable("cms_content", {
  id: serial("id").primaryKey(),
  sectionKey: text("section_key").unique().notNull(),
  contentData: jsonb("content_data").notNull(),
  updatedBy: text("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relationships
export const usersRelations = relations(users, ({ one, many }) => ({
  class: one(classes, {
    fields: [users.classId],
    references: [classes.id],
  }),
  attendanceLogs: many(attendance),
  examMarks: many(examMarks),
  progressHistory: many(studentProgressHistory),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  teacher: one(users, {
    fields: [classes.teacherId],
    references: [users.id],
  }),
  students: many(users),
  resources: many(resources),
  attendanceRecords: many(attendance),
  progressRecords: many(studentProgressHistory),
}));

export const examsRelations = relations(exams, ({ many }) => ({
  marks: many(examMarks),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  student: one(users, {
    fields: [attendance.studentId],
    references: [users.id],
  }),
  class: one(classes, {
    fields: [attendance.classId],
    references: [classes.id],
  }),
}));

export const examMarksRelations = relations(examMarks, ({ one }) => ({
  student: one(users, {
    fields: [examMarks.studentId],
    references: [users.id],
  }),
  exam: one(exams, {
    fields: [examMarks.examId],
    references: [exams.id],
  }),
}));

export const resourcesRelations = relations(resources, ({ one }) => ({
  class: one(classes, {
    fields: [resources.classId],
    references: [classes.id],
  }),
  uploader: one(users, {
    fields: [resources.uploadedBy],
    references: [users.id],
  }),
}));

export const studentProgressHistoryRelations = relations(studentProgressHistory, ({ one }) => ({
  student: one(users, {
    fields: [studentProgressHistory.studentId],
    references: [users.id],
  }),
  class: one(classes, {
    fields: [studentProgressHistory.classId],
    references: [classes.id],
  }),
}));
