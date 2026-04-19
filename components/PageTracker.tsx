"use client";

import { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

const PageTracker = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const ref = searchParams.get("ref");

    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, ref }),
    }).catch(() => {});
  }, [pathname, searchParams]);

  return null;
};

export default PageTracker;
