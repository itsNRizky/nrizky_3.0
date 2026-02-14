import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getArticle } from "@/lib/articles";
import { rehypePrettyCode, rehypePrettyCodeOptions, remarkGfm } from "@/lib/mdx";
import ViewCounter from "@/components/writings/ViewCounter";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <article className="py-6 md:py-12">
      {/* Back Link */}
      <Link
        href="/writings"
        className="mb-12 inline-flex items-center gap-1.5 text-[14px] text-text-faded transition-colors duration-200 hover:text-accent"
      >
        ← Back to writings
      </Link>

      {/* Article Header */}
      <header className="mb-10">
        {/* Primary Tag */}
        <span className="mb-5 inline-block rounded bg-accent/10 px-3 py-1 text-[12px] font-medium uppercase tracking-[0.05em] text-accent">
          {article.tags[0]}
        </span>

        {/* Title */}
        <h1 className="mb-4 font-[family-name:var(--font-fraunces)] text-[36px] font-semibold leading-[1.25] text-text-primary">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-2 text-[14px] text-text-faded">
          <span>{formatDate(article.date)}</span>
          <span>·</span>
          <span>{article.readTime}</span>
          <span>·</span>
          <ViewCounter slug={slug} />
        </div>
      </header>

      {/* Hero Image/Video */}
      {article.thumbnail && (
        <>
          {article.thumbnail.endsWith(".mp4") ||
          article.thumbnail.endsWith(".webm") ||
          article.thumbnail.endsWith(".mov") ? (
            <div className="mb-12 overflow-hidden rounded-xl">
              <video
                src={article.thumbnail}
                autoPlay
                loop
                muted
                playsInline
                className="h-auto w-full"
              />
            </div>
          ) : (
            <div
              className="mb-12 flex h-[320px] w-full items-center justify-center rounded-xl text-[14px] text-white/40"
              style={{
                background: article.thumbnail.startsWith("linear-gradient")
                  ? article.thumbnail
                  : `url(${article.thumbnail}) center/cover`,
              }}
            >
              {article.thumbnail.startsWith("linear-gradient") &&
                "Hero Image / Video"}
            </div>
          )}
        </>
      )}

      {/* Article Content */}
      <div className="prose-custom">
        <MDXRemote
          source={article.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
            },
          }}
        />
      </div>

    </article>
  );
}
