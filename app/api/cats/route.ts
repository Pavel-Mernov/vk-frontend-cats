import { NextRequest, NextResponse } from "next/server";

const CAT_API_URL = "https://api.thecatapi.com/v1/images/search";

type CatApiItem = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export async function GET(request: NextRequest) {
  const apiKey = process.env.CAT_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "CAT_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(Number(searchParams.get("page") ?? "0"), 0);
  const limit = Math.min(Math.max(Number(searchParams.get("limit") ?? "10"), 1), 20);

  const upstreamUrl = new URL(CAT_API_URL);
  upstreamUrl.searchParams.set("limit", String(limit));
  upstreamUrl.searchParams.set("page", String(page));
  upstreamUrl.searchParams.set("order", "DESC");
  upstreamUrl.searchParams.set("size", "small");
  upstreamUrl.searchParams.set("has_breeds", "0");

  try {
    const response = await fetch(upstreamUrl, {
      headers: {
        "x-api-key": apiKey
      },
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch cats from external API." },
        { status: response.status }
      );
    }

    const cats = (await response.json()) as CatApiItem[];

    return NextResponse.json(
      cats.map((cat) => ({
        id: cat.id,
        url: cat.url,
        width: cat.width,
        height: cat.height
      })),
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Unexpected error while fetching cats." },
      { status: 500 }
    );
  }
}
