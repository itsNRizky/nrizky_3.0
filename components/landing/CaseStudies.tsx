import CaseStudyCard from "@/components/landing/cards/CaseStudyCard";
import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

const CaseStudies = () => {
  const allArticles = getAllArticles();

  // Take the first 3 articles for the landing page
  const articles = allArticles.slice(0, 3);

  const featured = articles.find((a) => a.featured);
  const secondary = featured
    ? articles.filter((a) => a.slug !== featured.slug)
    : articles.slice(1);

  // If no featured, use first as featured
  const displayFeatured = featured || articles[0];
  const displaySecondary = featured ? secondary : articles.slice(1);

  return (
    <section id="case-studies" className="mb-20">
      {/* Section header */}
      <div className="mb-8 flex items-center gap-3">
        <h2 className="text-text-faded text-[12px] font-semibold tracking-widest uppercase">
          Case Studies
        </h2>
        <div className="bg-border h-px flex-1" />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Featured Card - Full Width */}
        {displayFeatured && <CaseStudyCard study={displayFeatured} featured />}

        {/* Secondary Cards */}
        {displaySecondary.map((article) => (
          <CaseStudyCard key={article.slug} study={article} />
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-8 text-center">
        <Link
          href="/writings"
          className="text-text-faded hover:text-accent text-[14px] transition-colors duration-200"
        >
          View all writings →
        </Link>
      </div>
    </section>
  );
};

export default CaseStudies;
