import fs from "fs";
import path from "path";

const viewsFilePath = path.join(process.cwd(), "data/views.json");

type ViewsData = Record<string, number>;

/**
 * Read views data from JSON file
 */
function readViewsData(): ViewsData {
  if (!fs.existsSync(viewsFilePath)) {
    // Create the file with empty object if it doesn't exist
    fs.writeFileSync(viewsFilePath, JSON.stringify({}, null, 2));
    return {};
  }

  try {
    const fileContents = fs.readFileSync(viewsFilePath, "utf8");
    return JSON.parse(fileContents);
  } catch {
    return {};
  }
}

/**
 * Write views data to JSON file
 */
function writeViewsData(data: ViewsData): void {
  fs.writeFileSync(viewsFilePath, JSON.stringify(data, null, 2));
}

/**
 * Get view count for a specific article
 */
export function getViewCount(slug: string): number {
  const views = readViewsData();
  return views[slug] || 0;
}

/**
 * Increment view count for an article and return the new count
 */
export function incrementView(slug: string): number {
  const views = readViewsData();
  const newCount = (views[slug] || 0) + 1;
  views[slug] = newCount;
  writeViewsData(views);
  return newCount;
}

/**
 * Get all view counts
 */
export function getAllViews(): ViewsData {
  return readViewsData();
}
