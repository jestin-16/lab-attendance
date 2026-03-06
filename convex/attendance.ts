import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const markAttendance = mutation({
  args: { barcode: v.string() },

  handler: async (ctx, args) => {

    // Find student using barcode
    const student = await ctx.db
      .query("students")
      .filter((q) => q.eq(q.field("barcode"), args.barcode))
      .first();

    if (!student) {
      throw new Error("Student not found");
    }

    const today = new Date().toISOString().split("T")[0];
    const time = new Date().toLocaleTimeString();

    // Check if student already has an open IN (without OUT)
    const openRecord = await ctx.db
      .query("attendance")
      .filter((q) =>
        q.and(
          q.eq(q.field("studentId"), student._id),
          q.eq(q.field("date"), today),
          q.eq(q.field("outTime"), undefined)
        )
      )
      .first();

    // =========================
    // SECOND SCAN → OUT
    // =========================
    if (openRecord) {

      await ctx.db.patch(openRecord._id, {
        outTime: time,
      });

      // Release system
      if (openRecord.systemNo) {
        const system = await ctx.db
          .query("systems")
          .filter((q) =>
            q.eq(q.field("systemNo"), openRecord.systemNo)
          )
          .first();

        if (system) {
          await ctx.db.patch(system._id, {
            status: "free",
          });
        }
      }

      return "OUT recorded";
    }

    // =========================
    // FIRST SCAN → IN
    // =========================

    const freeSystem = await ctx.db
      .query("systems")
      .filter((q) => q.eq(q.field("status"), "free"))
      .first();

    if (!freeSystem) {
      throw new Error("No free systems available");
    }

    // Mark system occupied
    await ctx.db.patch(freeSystem._id, {
      status: "occupied",
    });

    // Insert attendance
    await ctx.db.insert("attendance", {
      studentId: student._id,
      date: today,
      inTime: time,
      systemNo: freeSystem.systemNo,
    });

    return `IN recorded — System ${freeSystem.systemNo}`;
  },
});