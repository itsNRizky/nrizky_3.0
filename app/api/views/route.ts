import { NextRequest, NextResponse } from "next/server";
import { getViewCount, recordView } from "@/lib/views";
import { hashIP } from "@/lib/hash";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "path is required" }, { status: 400 });
  }

  const count = await getViewCount(path);
  return NextResponse.json({ count });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, ref } = body;

    if (!path) {
      return NextResponse.json({ error: "path is required" }, { status: 400 });
    }

    const referrerUrl = request.headers.get("referer");
    const userAgent = request.headers.get("user-agent");
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0].trim() ?? null;
    const ipHash = ip ? hashIP(ip) : null;

    const count = await recordView({
      path,
      refParam: ref ?? null,
      referrerUrl,
      userAgent,
      ipHash,
    });

    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
