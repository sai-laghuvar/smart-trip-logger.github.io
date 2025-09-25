"use node";

import { action } from "./_generated/server";

export const setWebhook = action({
  args: {},
  handler: async (ctx) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const siteUrl = process.env.SITE_URL; // Should be your public Convex deployment URL
    const secret = process.env.TELEGRAM_WEBHOOK_SECRET; // Optional extra security

    if (!token) {
      throw new Error("Missing TELEGRAM_BOT_TOKEN environment variable.");
    }
    if (!siteUrl) {
      throw new Error("Missing SITE_URL environment variable.");
    }

    const webhookUrl = `${siteUrl.replace(/\/$/, "")}/api/telegram`;

    const res = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: webhookUrl,
        // only include secret_token if provided
        ...(secret ? { secret_token: secret } : {}),
        allowed_updates: ["message"],
        drop_pending_updates: false,
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(
        `Failed to set webhook. HTTP ${res.status}. Telegram: ${JSON.stringify(
          data,
        )}`,
      );
    }

    return {
      ok: true,
      result: data,
      webhookUrl,
      usedSecret: Boolean(secret),
    };
  },
});

export const getWebhookInfo = action({
  args: {},
  handler: async () => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error("Missing TELEGRAM_BOT_TOKEN environment variable.");
    }
    const res = await fetch(
      `https://api.telegram.org/bot${token}/getWebhookInfo`,
      { method: "GET" },
    );
    const data = await res.json();
    if (!res.ok || !data.ok) {
      throw new Error(
        `Failed to get webhook info. HTTP ${res.status}. Telegram: ${JSON.stringify(
          data,
        )}`,
      );
    }
    return data.result;
  },
});
