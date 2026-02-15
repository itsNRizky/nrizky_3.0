import Link from "next/link";
import { Metadata } from "next";
import WritingCard from "@/components/writings/WritingCard";
import TagFilter from "@/components/writings/TagFilter";
import { getAllArticles, getAllTags } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Writings",
  description:
    "Thoughts on frontend development, performance optimization, and career growth in software engineering.",
  openGraph: {
    title: "Writings | NRizky",
    description:
      "Thoughts on frontend development, performance optimization, and career growth in software engineering.",
  },
  twitter: {
    title: "Writings | NRizky",
    description:
      "Thoughts on frontend development, performance optimization, and career growth in software engineering.",
  },
};

interface WritingsPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function WritingsPage({
  searchParams,
}: WritingsPageProps) {
  const { tag: activeTag } = await searchParams;

  // Get all articles from MDX files
  const allArticles = getAllArticles();
  const allTags = getAllTags();

  // Filter writings by tag if query param exists
  const filteredWritings = activeTag
    ? allArticles.filter((w) =>
        w.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
      )
    : allArticles;

  const featured = filteredWritings.find((w) => w.featured);
  const others = filteredWritings.filter((w) => !w.featured);

  return (
    <main>
      {/* Header */}
      <div className="mb-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-[14px] text-text-faded transition-colors duration-200 hover:text-accent"
        >
          ← Back to home
        </Link>
        <h1 className="mb-3 font-[family-name:var(--font-fraunces)] text-[32px] font-semibold text-text-primary">
          {activeTag ? `Writings: ${activeTag}` : "All Writings"}
        </h1>
        <p className="text-[15px] text-text-subtle">
          Thoughts on frontend development, performance, and career growth.
        </p>
      </div>

      {/* Tag Filters */}
      <TagFilter tags={allTags} activeTag={activeTag} />

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Featured Card - Full Width (only show if in filtered results) */}
        {featured && <WritingCard writing={featured} featured />}

        {/* Other Cards */}
        {others.map((writing) => (
          <WritingCard key={writing.slug} writing={writing} />
        ))}

        {/* Empty state */}
        {filteredWritings.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-text-faded">
              {activeTag
                ? `No writings found for "${activeTag}"`
                : "No writings yet. Check back soon!"}
            </p>
            {activeTag && (
              <Link
                href="/writings"
                className="mt-2 inline-block text-[14px] text-accent hover:underline"
              >
                View all writings
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
