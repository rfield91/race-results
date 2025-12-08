import { pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

export const orgs = pgTable("orgs", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").unique().notNull(),
    slug: text("slug").unique().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true })
}, table => [
    uniqueIndex("slug_idx").on(table.slug)
]);