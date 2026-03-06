import { mutation } from "./_generated/server";

export const resetSystems = mutation({
  handler: async (ctx) => {

    const systems = await ctx.db.query("systems").collect();

    for (const system of systems) {
      await ctx.db.patch(system._id, {
        status: "free"
      });
    }

    return "All systems reset successfully";
  },
});