"use client";

import { useEffect, useState } from "react";

interface ViewCounterProps {
  slug: string;
}

const ViewCounter = ({ slug }: ViewCounterProps) => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    // Increment and get count
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    })
      .then((res) => res.json())
      .then((data) => setViews(data.count))
      .catch(() => setViews(0));
  }, [slug]);

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
