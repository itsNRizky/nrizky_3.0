import { getDb } from "@/lib/db";
import { pageViews } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

interface RecordViewParams {
  path: string;
  refParam: string | null;
  referrerUrl: string | null;
  userAgent: string | null;
  ipHash: string | null;
}

export async function recordView(params: RecordViewParams): Promise<number> {
  await getDb().insert(pageViews).values({
    path: params.path,
    refParam: params.refParam,
    referrerUrl: params.referrerUrl,
    userAgent: params.userAgent,
    ipHash: params.ipHash,
  });

  const result = await getDb()
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(pageViews)
    .where(eq(pageViews.path, params.path));

  return result[0].count;
}

export async function getViewCount(path: string): Promise<number> {
  const result = await getDb()
    .select({ count: sql<number>`cast(count(*) as int)` })
    .from(pageViews)
    .where(eq(pageViews.path, path));

  return result[0].count;
}
