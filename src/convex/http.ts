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

http.route({
  path: "/api/telegram",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(JSON.stringify({ ok: false, error: "Unsupported content type" }), {
        status: 415,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Optional secret verification
    const configuredSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
    if (configuredSecret) {
      const incomingSecret = req.headers.get("x-telegram-bot-api-secret-token");
      if (incomingSecret !== configuredSecret) {
        return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    let update: any;
    try {
      update = await req.json();
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const message = update?.message;
    const text: string = String(message?.text ?? "").trim();
    const from = message?.from;
    const fromId = from?.id ? String(from.id) : null;
    const fromName: string | undefined = [from?.first_name, from?.last_name].filter(Boolean).join(" ") || from?.username;

    if (!fromId || !text) {
      return new Response(JSON.stringify({ ok: true, result: "ignored" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const result = await ctx.runMutation(internal.telegram.ingest, {
        fromId,
        fromName,
        text,
      });
      return new Response(JSON.stringify({ ok: true, result }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error("Telegram ingest error:", e);
      return new Response(JSON.stringify({ ok: false, error: "Failed to log trip" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  }),
});

export default http;