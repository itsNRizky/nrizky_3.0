import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  refParam: text("ref_param"),
  referrerUrl: text("referrer_url"),
  userAgent: text("user_agent"),
  ipHash: text("ip_hash"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
