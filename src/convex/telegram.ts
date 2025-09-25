import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

type ParsedTrip = {
  origin: string;
  destination: string;
  transportMode: string;
  date: string;
  time: string;
  coTravelers: number;
  notes?: string;
};

function toDateYYYYMMDD(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function toTimeHHMM(d: Date): string {
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

// Simple parser for "key: value" comma-separated pairs.
// Example: origin: Downtown, destination: Airport, mode: Bus, date: 2025-01-05, time: 14:30, co: 2, notes: quick hop
function parseStructured(body: string): Partial<ParsedTrip> {
  const result: Partial<ParsedTrip> = {};
  const parts = body.split(",").map((p) => p.trim());
  for (const p of parts) {
    const [kRaw, ...rest] = p.split(":");
    if (!kRaw || rest.length === 0) continue;
    const key = kRaw.trim().toLowerCase();
    const value = rest.join(":").trim();
    if (!value) continue;
    switch (key) {
      case "origin":
        result.origin = value;
        break;
      case "destination":
      case "to":
        result.destination = value;
        break;
      case "mode":
      case "transport":
      case "transportmode":
        result.transportMode = value;
        break;
      case "date":
        result.date = value;
        break;
      case "time":
        result.time = value;
        break;
      case "co":
      case "cotravellers":
      case "co-travelers":
      case "co_travelers":
      case "cotravelers":
        result.coTravelers = Number.parseInt(value) || 0;
        break;
      case "notes":
        result.notes = value;
        break;
      default:
        break;
    }
  }
  return result;
}

export const ingest = internalMutation({
  args: {
    // Telegram update payload minimal fields we need
    fromId: v.string(), // Telegram user id as string
    fromName: v.optional(v.string()),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const now = new Date();
    const defaults: ParsedTrip = {
      origin: "Unknown",
      destination: "Unknown",
      transportMode: "Unknown",
      date: toDateYYYYMMDD(now),
      time: toTimeHHMM(now),
      coTravelers: 0,
      notes: undefined,
    };

    const parsed = parseStructured(args.text);
    const trip: ParsedTrip = {
      origin: parsed.origin ?? defaults.origin,
      destination: parsed.destination ?? defaults.destination,
      transportMode: parsed.transportMode ?? defaults.transportMode,
      date: parsed.date ?? defaults.date,
      time: parsed.time ?? defaults.time,
      coTravelers: parsed.coTravelers ?? defaults.coTravelers,
      notes: parsed.notes ?? defaults.notes,
    };

    // Create or find a user associated with this Telegram sender
    const emailAlias = `tg_${args.fromId}@tg.local`;

    const existing = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", emailAlias))
      .unique();

    const userId =
      existing?._id ??
      (await ctx.db.insert("users", {
        email: emailAlias,
        name: args.fromName ?? `Telegram User ${args.fromId}`,
        image: undefined,
        emailVerificationTime: undefined,
        isAnonymous: true,
        role: undefined,
      }));

    await ctx.db.insert("trips", {
      userId,
      origin: trip.origin,
      destination: trip.destination,
      transportMode: trip.transportMode,
      date: trip.date,
      time: trip.time,
      coTravelers: trip.coTravelers,
      notes: trip.notes,
    });

    const summary = `Trip logged: ${trip.origin} → ${trip.destination} via ${trip.transportMode} at ${trip.time} on ${trip.date}${
      trip.coTravelers ? ` with ${trip.coTravelers}` : ""
    }`;
    return summary;
  },
});
