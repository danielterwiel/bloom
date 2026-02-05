import type { APIRoute } from "astro";
import { companies } from "@repo/data";

// Pre-serialize once at module load instead of on every request
const serialized = JSON.stringify({
  data: companies,
  total: companies.length,
});

export const GET: APIRoute = () => {
  return new Response(serialized, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
};
