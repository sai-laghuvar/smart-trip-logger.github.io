import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const createTrip = mutation({
  args: {
    origin: v.string(),
    destination: v.string(),
    transportMode: v.string(),
    date: v.string(),
    time: v.string(),
    coTravelers: v.number(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("User must be authenticated to create trips");
    }

    return await ctx.db.insert("trips", {
      userId: user._id,
      origin: args.origin,
      destination: args.destination,
      transportMode: args.transportMode,
      date: args.date,
      time: args.time,
      coTravelers: args.coTravelers,
      notes: args.notes,
    });
  },
});

export const getUserTrips = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return [];
    }

    return await ctx.db
      .query("trips")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

export const getTripStats = query({
  args: {},
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      return {
        totalTrips: 0,
        mostUsedTransport: "None",
        totalCoTravelers: 0,
      };
    }

    const trips = await ctx.db
      .query("trips")
      .withIndex("by_user_id", (q) => q.eq("userId", user._id))
      .collect();

    const totalTrips = trips.length;
    const totalCoTravelers = trips.reduce((sum, trip) => sum + trip.coTravelers, 0);

    // Calculate most used transport mode
    const transportCounts: Record<string, number> = {};
    trips.forEach((trip) => {
      transportCounts[trip.transportMode] = (transportCounts[trip.transportMode] || 0) + 1;
    });

    const mostUsedTransport = Object.entries(transportCounts).reduce(
      (max, [mode, count]) => (count > max.count ? { mode, count } : max),
      { mode: "None", count: 0 }
    ).mode;

    return {
      totalTrips,
      mostUsedTransport,
      totalCoTravelers,
    };
  },
});
