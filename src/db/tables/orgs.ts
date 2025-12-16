import { pgTable, text, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, updatedAt } from "../utils/columns";

export const orgs = pgTable(
    "orgs",
    {
        orgId: uuid("id").primaryKey().defaultRandom(),
        name: text("name").unique().notNull(),
        slug: text("slug").unique().notNull(),
        createdAt: createdAt,
        updatedAt: updatedAt,
        deletedAt: deletedAt,
    },
    (table) => [uniqueIndex("slug_idx").on(table.slug)]
);
