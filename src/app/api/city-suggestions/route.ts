import { searchCities } from "@/lib/weather";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return Response.json([]);
  }

  const results = await searchCities(q);
  return Response.json(results);
}
