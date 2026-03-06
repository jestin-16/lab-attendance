import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  students: defineTable({
    name: v.string(),
    barcode: v.string(),
    course: v.string(),
    semester: v.number(),
  }),

  attendance: defineTable({
    studentId: v.id("students"),
    date: v.string(),
    inTime: v.string(),
    outTime: v.optional(v.string()),
    systemNo: v.optional(v.number()),
  }),

  systems: defineTable({
    systemNo: v.number(),
    status: v.string(),
  }),
});