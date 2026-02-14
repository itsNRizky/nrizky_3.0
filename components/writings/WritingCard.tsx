"use client";

import { useState } from "react";
import Link from "next/link";
import { ArticleMeta } from "@/lib/articles";

interface WritingCardProps {
  writing: ArticleMeta;
  featured?: boolean;
}

const WritingCard = ({ writing, featured = false }: WritingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get primary tag (first tag) for top display
  const primaryTag = writing.tags[0] || "";

  if (featured) {
    return (
      <Link
        href={`/writings/${writing.slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group col-span-full block rounded-xl bg-background p-8 transition-all duration-300 ease-out ${
          isHovered
            ? "-translate-y-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.05)]"
            : "shadow-[0_1px_2px_rgba(0,0,0,0.01),0_2px_8px_rgba(0,0,0,0.02)]"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-block rounded bg-accent/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-accent">
                {primaryTag}
              </span>
              <span className="text-[12px] text-text-faded">
                {formatDate(writing.date)}
              </span>
            </div>
            <h3 className="mb-3 font-[family-name:var(--font-fraunces)] text-[24px] font-semibold leading-tight text-text-primary">
              {writing.title}
            </h3>
            <p className="mb-4 max-w-[600px] text-[15px] leading-relaxed text-text-subtle">
              {writing.description}
            </p>
            {/* All tags at bottom */}
            <div className="mb-4 flex flex-wrap gap-2">
              {writing.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-tag-bg px-2 py-0.5 text-[11px] text-text-faded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-text-faded">
                {writing.readTime || "Read more"}
              </span>
            </div>
          </div>
          <span
            className={`mt-2 text-[20px] text-accent transition-all duration-200 ${
              isHovered
                ? "translate-x-0 opacity-100"
                : "-translate-x-1 opacity-0"
            }`}
          >
            →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/writings/${writing.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group flex h-full flex-col rounded-xl bg-background p-6 transition-all duration-300 ease-out ${
        isHovered
          ? "-translate-y-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.05)]"
          : "shadow-[0_1px_2px_rgba(0,0,0,0.01),0_2px_8px_rgba(0,0,0,0.02)]"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-block rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-accent">
          {primaryTag}
        </span>
        <span className="text-[11px] text-text-faded">
          {formatDate(writing.date)}
        </span>
      </div>
      <h3 className="mb-2 font-[family-name:var(--font-fraunces)] text-[18px] font-semibold leading-snug text-text-primary">
        {writing.title}
      </h3>
      <p className="mb-4 line-clamp-2 flex-1 text-[13px] leading-relaxed text-text-subtle">
        {writing.description}
      </p>
      {/* All tags at bottom */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {writing.tags.map((tag) => (
          <span
            key={tag}
            className="rounded bg-tag-bg px-2 py-0.5 text-[10px] text-text-faded"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-text-faded">
          {writing.readTime || "Read more"}
        </span>
        <span
          className={`text-[16px] text-accent transition-all duration-200 ${
            isHovered ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
          }`}
        >
          →
        </span>
      </div>
    </Link>
  );
};

export default WritingCard;
