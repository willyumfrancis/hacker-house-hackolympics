import { mutation } from './_generated/server';
import { internal } from './_generated/api';
import { getOrCreateDefaultWorld } from './init';

/**
 * Admin function to reset the world.
 * This will delete the current default world and create a new one with the simple map.
 */
export const resetWorld = mutation({
  args: {},
  handler: async (ctx) => {
    // Find the current default world
    const currentWorld = await ctx.db
      .query('worldStatus')
      .filter((q) => q.eq(q.field('isDefault'), true))
      .unique();
    
    if (currentWorld) {
      // Delete the current world and its related entities
      await ctx.db.delete(currentWorld._id);
      
      if (currentWorld.worldId) {
        // Delete the world
        await ctx.db.delete(currentWorld.worldId);
        
        // Delete all maps related to this world
        const maps = await ctx.db
          .query('maps')
          .filter((q) => q.eq(q.field('worldId'), currentWorld.worldId))
          .collect();
        
        for (const map of maps) {
          await ctx.db.delete(map._id);
        }
      }
    }
    
    // Create a new world with the simple map
    const { worldStatus } = await getOrCreateDefaultWorld(ctx);
    
    return {
      success: true,
      message: "World has been reset. A new world with the simple map has been created.",
      worldId: worldStatus.worldId
    };
  },
});
