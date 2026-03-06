import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addStudent = mutation({
  args: {
    name: v.string(),
    barcode: v.string(),
    course: v.string(),
    semester: v.number(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("students", args);
  },
});