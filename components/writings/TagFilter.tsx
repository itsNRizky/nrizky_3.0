"use client";

import Link from "next/link";

interface TagFilterProps {
  tags: string[];
  activeTag?: string;
}

const TagFilter = ({ tags, activeTag }: TagFilterProps) => {
  return (
    <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
      <Link
        href="/writings"
        className={`text-[13px] transition-colors duration-200 ${
          !activeTag
            ? "font-medium text-accent"
            : "text-text-faded hover:text-text-primary"
        }`}
      >
        All
      </Link>
      <span className="text-text-ghost">/</span>
      {tags.map((tag, index) => {
        const isActive = activeTag?.toLowerCase() === tag.toLowerCase();
        return (
          <span key={tag} className="flex items-center gap-x-4">
            <Link
              href={`/writings?tag=${encodeURIComponent(tag)}`}
              className={`text-[13px] transition-colors duration-200 ${
                isActive
                  ? "font-medium text-accent"
                  : "text-text-faded hover:text-text-primary"
              }`}
            >
              {tag}
            </Link>
            {index < tags.length - 1 && (
              <span className="text-text-ghost">/</span>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default TagFilter;
