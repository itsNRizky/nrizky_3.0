import { NextRequest, NextResponse } from "next/server";
import { getViewCount, recordView } from "@/lib/views";
import { hashIP } from "@/lib/hash";
import { logEvent } from "@/lib/eventLog";

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

    const isArticle = typeof path === "string" && path.startsWith("/writings/");
    const eventType = isArticle ? "article.viewed" : "page.viewed";
    const resource = isArticle
      ? { type: "article", id: path.replace(/^\/writings\//, "") }
      : { type: "page", id: path };
    const actor = ipHash ? { type: "anonymous", id: ipHash } : undefined;
    const metadata: Record<string, unknown> = { path };
    if (ref) metadata.ref = ref;
    if (referrerUrl) metadata.referrer = referrerUrl;
    if (userAgent) metadata.userAgent = userAgent;

    void logEvent({ eventType, actor, resource, metadata });

    if (ref) {
      void logEvent({
        eventType: "referral.landed",
        actor,
        resource,
        metadata: { ref, path, referrer: referrerUrl ?? undefined },
      });
    }

    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
