"use server";

import { db } from "@/lib/db";
import { enrollments } from "@/lib/db/schema";

export interface EnrollmentInput {
  fullName: string;
  dob: string;
  gender: string;
  email: string | null;
  phone: string | null;
  parentName: string;
  parentPhone: string;
  targetGrade: string;
  notes: string | null;
}

export async function submitEnrollment(input: EnrollmentInput) {
  try {
    // 1. Basic server validation
    if (!input.fullName.trim()) return { error: "Student full name is required." };
    if (!input.dob) return { error: "Student date of birth is required." };
    if (!input.gender) return { error: "Student gender is required." };
    if (!input.parentName.trim()) return { error: "Parent name is required." };
    if (!input.parentPhone.trim()) return { error: "Parent contact number is required." };
    if (!input.targetGrade) return { error: "Target grade selection is required." };

    // 2. Insert record
    const [inserted] = await db.insert(enrollments).values({
      fullName: input.fullName.trim(),
      dob: input.dob,
      gender: input.gender,
      email: input.email ? input.email.trim() : "",
      phone: input.phone ? input.phone.trim() : "",
      parentName: input.parentName.trim(),
      parentPhone: input.parentPhone.trim(),
      targetGrade: input.targetGrade,
      status: "pending", // Always pending initially, awaits office cash clearance
      notes: input.notes ? input.notes.trim() : null
    }).returning();

    const currentYear = new Date().getFullYear();
    const refCode = `ENR-${currentYear}-${String(inserted.id).padStart(4, "0")}`;

    return {
      success: true,
      refCode,
      studentName: inserted.fullName,
      parentName: inserted.parentName,
      targetGrade: inserted.targetGrade,
      parentPhone: inserted.parentPhone,
      createdAt: inserted.createdAt
    };
  } catch (error) {
    console.error("Enrollment Server Action error:", error);
    return { error: "Failed to submit enrollment request. Please try again." };
  }
}
