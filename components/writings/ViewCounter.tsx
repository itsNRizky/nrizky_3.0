"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface ViewCounterProps {
  path: string;
}

const ViewCounter = ({ path }: ViewCounterProps) => {
  const [views, setViews] = useState<number | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");

    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, ref }),
    })
      .then((res) => res.json())
      .then((data) => setViews(data.count))
      .catch(() => setViews(0));
  }, [path, searchParams]);

  if (views === null) {
    return <span className="text-text-faded">...</span>;
  }

  return (
    <span className="text-text-faded">
      {views.toLocaleString()} view{views !== 1 ? "s" : ""}
    </span>
  );
};

export default ViewCounter;
