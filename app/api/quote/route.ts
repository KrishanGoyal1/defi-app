import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const res = await fetch(
    `https://polygon.api.0x.org/swap/v1/quote?${searchParams}`,
    {
      headers: {
        "0x-api-key": "c9f13c84-9fcb-4f42-aa30-a11b0d016aa5",
      },
    }
  );
  const data = await res.json();

  return Response.json(data);
}