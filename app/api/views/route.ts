import { NextRequest, NextResponse } from "next/server";
import { getViewCount, incrementView } from "@/lib/views";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const count = getViewCount(slug);
  return NextResponse.json({ count });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    const count = incrementView(slug);
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
