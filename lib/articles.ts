import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[]; // Changed from tag to tags (array)
  thumbnail?: string;
  featured?: boolean;
  readTime?: string;
}

export interface Article extends ArticleMeta {
  content: string; // Raw MDX content string
}

/**
 * Parse tags from frontmatter - supports both string and array format
 */
function parseTags(tagData: string | string[] | undefined): string[] {
  if (!tagData) return [];
  if (Array.isArray(tagData)) return tagData;
  // Support comma-separated string format
  return tagData.split(",").map((t) => t.trim());
}

/**
 * Get all article slugs (filename without .mdx)
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const files = fs.readdirSync(articlesDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get all articles metadata (sorted by date descending)
 */
export function getAllArticles(): ArticleMeta[] {
  const slugs = getAllSlugs();

  const articles = slugs.map((slug) => {
    const filePath = path.join(articlesDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      tags: parseTags(data.tags || data.tag), // Support both 'tags' and 'tag' for backwards compatibility
      thumbnail: data.thumbnail,
      featured: data.featured || false,
      readTime: data.readTime,
    } as ArticleMeta;
  });

  // Sort by date descending (newest first)
  return articles.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get a single article by slug (includes content)
 */
export function getArticle(slug: string): Article | null {
  const filePath = path.join(articlesDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    tags: parseTags(data.tags || data.tag),
    thumbnail: data.thumbnail,
    featured: data.featured || false,
    readTime: data.readTime,
    content,
  };
}

/**
 * Get unique tags from all articles
 */
export function getAllTags(): string[] {
  const articles = getAllArticles();
  const tags = new Set<string>();
  articles.forEach((article) => {
    article.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
}
