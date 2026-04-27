import { NextRequest, NextResponse } from "next/server";
import { logEvent } from "@/lib/eventLog";
import { hashIP } from "@/lib/hash";

const ALLOWED_EVENT_TYPES = new Set([
  "external_link.clicked",
  "article.read_complete",
]);

interface ClientEventBody {
  eventType?: string;
  resource?: { type: string; id: string };
  metadata?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ClientEventBody;
    const { eventType, resource, metadata } = body;

    if (!eventType || !ALLOWED_EVENT_TYPES.has(eventType)) {
      return NextResponse.json(
        { error: "invalid eventType" },
        { status: 400 },
      );
    }

    const referrerUrl = request.headers.get("referer");
    const userAgent = request.headers.get("user-agent");
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0].trim() ?? null;
    const ipHash = ip ? hashIP(ip) : null;

    const enrichedMetadata: Record<string, unknown> = { ...(metadata ?? {}) };
    if (referrerUrl && enrichedMetadata.referrer === undefined) {
      enrichedMetadata.referrer = referrerUrl;
    }
    if (userAgent && enrichedMetadata.userAgent === undefined) {
      enrichedMetadata.userAgent = userAgent;
    }

    void logEvent({
      eventType,
      actor: ipHash ? { type: "anonymous", id: ipHash } : undefined,
      resource,
      metadata: enrichedMetadata,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
}
