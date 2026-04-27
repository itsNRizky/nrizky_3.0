"use client";

import { useEffect, useRef } from "react";
import { sendClientEvent } from "@/lib/clientEvents";

interface ArticleReadTrackerProps {
  slug: string;
  threshold?: number;
}

const ArticleReadTracker = ({
  slug,
  threshold = 0.9,
}: ArticleReadTrackerProps) => {
  const firedRef = useRef(false);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    firedRef.current = false;
    startTimeRef.current = Date.now();

    const onScroll = () => {
      if (firedRef.current) return;

      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const viewport = window.innerHeight;
      const fullHeight = doc.scrollHeight;
      const scrollable = fullHeight - viewport;
      if (scrollable <= 0) return;

      const progress = scrollTop / scrollable;
      if (progress >= threshold) {
        firedRef.current = true;
        sendClientEvent({
          eventType: "article.read_complete",
          resource: { type: "article", id: slug },
          metadata: {
            timeOnPageMs: Date.now() - startTimeRef.current,
            threshold,
          },
        });
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug, threshold]);

  return null;
};

export default ArticleReadTracker;
