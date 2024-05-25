import { db } from "@/lib/db";
function toJson(data: any) {
  return JSON.stringify(data, (_, v) =>
    typeof v === "bigint" ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a);
}

export async function POST(req: Request) {
  const { sqlQuery } = await req.json();

  console.log("query", sqlQuery);

  const res = await db.$queryRawUnsafe(sqlQuery);
  return new Response(toJson(res));
}
