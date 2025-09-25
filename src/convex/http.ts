import { httpRouter } from "convex/server";
import { auth } from "./auth";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

auth.addHttpRoutes(http);

http.route({
  path: "/api/whatsapp",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    // Twilio sends application/x-www-form-urlencoded
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/x-www-form-urlencoded")) {
      return new Response("Unsupported content type", { status: 415 });
    }

    const form = await req.formData();
    // Common Twilio fields for WhatsApp:
    // Body: message text, From: sender (e.g., "whatsapp:+15551234567")
    const body = String(form.get("Body") ?? "").trim();
    const from = String(form.get("From") ?? "").trim();

    if (!from || !body) {
      const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Missing required fields.</Message></Response>`;
      return new Response(xml, { status: 200, headers: { "Content-Type": "text/xml" } });
    }

    try {
      const result = await ctx.runMutation(internal.whatsapp.ingest, { from, body });
      const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${result}</Message></Response>`;
      return new Response(xml, { status: 200, headers: { "Content-Type": "text/xml" } });
    } catch (e) {
      console.error("WhatsApp ingest error:", e);
      const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>Sorry, we couldn't log that trip. Please try again.</Message></Response>`;
      return new Response(xml, { status: 200, headers: { "Content-Type": "text/xml" } });
    }
  }),
});

export default http;