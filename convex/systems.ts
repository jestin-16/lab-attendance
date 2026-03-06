import { mutation } from "./_generated/server";

export const createSystems = mutation({
  handler: async (ctx) => {

    for (let i = 1; i <= 46; i++) {
      await ctx.db.insert("systems", {
        systemNo: i,
        status: "free",
      });
    }

    return "46 systems created";
  },
});