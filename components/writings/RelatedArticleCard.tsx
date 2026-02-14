"use client";

import { useState } from "react";
import Link from "next/link";

interface RelatedArticle {
  slug: string;
  title: string;
  tags: string[];
  readTime: string;
}

interface RelatedArticleCardProps {
  article: RelatedArticle;
}

const RelatedArticleCard = ({ article }: RelatedArticleCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Get primary tag (first tag)
  const primaryTag = article.tags[0] || "";

  return (
    <Link
      href={`/writings/${article.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`block rounded-xl bg-background p-5 transition-all duration-300 ${
        isHovered
          ? "translate-x-1 border border-black/[0.03] shadow-[0_1px_4px_rgba(0,0,0,0.02),0_4px_16px_rgba(0,0,0,0.04)]"
          : "border border-transparent"
      }`}
    >
      <span className="mb-2 block text-[11px] uppercase tracking-[0.05em] text-accent">
        {primaryTag}
      </span>
      <h3
        className={`mb-2 font-[family-name:var(--font-fraunces)] text-[15px] font-semibold leading-[1.4] transition-colors duration-200 ${
          isHovered ? "text-accent" : "text-text-primary"
        }`}
      >
        {article.title}
      </h3>
      <p className="text-[13px] text-text-faded">{article.readTime} read</p>
    </Link>
  );
};

export default RelatedArticleCard;
