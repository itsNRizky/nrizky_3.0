interface SendClientEventParams {
  eventType: "external_link.clicked" | "article.read_complete";
  resource?: { type: string; id: string };
  metadata?: Record<string, unknown>;
}

export function sendClientEvent(params: SendClientEventParams): void {
  const body = JSON.stringify(params);
  try {
    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      const ok = navigator.sendBeacon("/api/events", blob);
      if (ok) return;
    }
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // swallow — telemetry must never break the UI
  }
}
