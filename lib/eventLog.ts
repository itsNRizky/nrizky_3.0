const SERVICE_NAME = "portfolio";

type ActorOrResource = { type: string; id: string };

export interface LogEventParams {
  eventType: string;
  actor?: ActorOrResource;
  resource?: ActorOrResource;
  metadata?: Record<string, unknown>;
  requestId?: string;
  eventTimestamp?: string;
}

export async function logEvent(params: LogEventParams): Promise<void> {
  const baseUrl = process.env.EVENT_LOG_URL;
  const apiKey = process.env.EVENT_LOG_API_KEY;

  if (!baseUrl || !apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[eventLog] EVENT_LOG_URL or EVENT_LOG_API_KEY not set; skipping",
        params.eventType,
      );
    }
    return;
  }

  const body = {
    eventType: params.eventType,
    service: SERVICE_NAME,
    eventTimestamp: params.eventTimestamp ?? new Date().toISOString(),
    ...(params.requestId ? { requestId: params.requestId } : {}),
    ...(params.actor ? { actor: params.actor } : {}),
    ...(params.resource ? { resource: params.resource } : {}),
    ...(params.metadata ? { metadata: params.metadata } : {}),
  };

  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, "")}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!res.ok && process.env.NODE_ENV !== "production") {
      const text = await res.text().catch(() => "");
      console.warn(
        `[eventLog] ${params.eventType} failed: ${res.status} ${text}`,
      );
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[eventLog] ${params.eventType} threw`, err);
    }
  }
}
