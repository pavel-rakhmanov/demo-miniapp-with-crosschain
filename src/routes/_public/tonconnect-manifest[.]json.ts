import { createFileRoute } from "@tanstack/react-router";

const RESPONSE_CACHE_MAX_AGE = 24 * 60 * 60; // 24 hour

export const Route = createFileRoute("/_public/tonconnect-manifest.json")({
  server: {
    handlers: {
      GET: async (ctx) => {
        const requestOrigin = new URL(ctx.request.url).origin;

        const content = JSON.stringify({
          url: requestOrigin,
          name: "STON.fi Demo MiniApp",
          iconUrl: "https://static.ston.fi/logo/external-logo.jpg",
        });

        return new Response(content, {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": `public, max-age=${RESPONSE_CACHE_MAX_AGE}`,
          },
        });
      },
    },
  },
});
