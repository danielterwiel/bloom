import type { APIRoute } from "astro";
import { companies } from "@repo/data";

export const GET: APIRoute = () => {
  const data = companies;

  return new Response(
    JSON.stringify({
      data,
      total: data.length,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    },
  );
};
