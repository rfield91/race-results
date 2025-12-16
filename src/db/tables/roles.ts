import { boolean, pgTable, text } from "drizzle-orm/pg-core";
import { effectiveAt } from "../utils/columns";

export const roles = pgTable("roles", {
    role: text("role").notNull().primaryKey(),
    name: text("name").notNull().unique(),
    effectiveAt: effectiveAt,
    isEnabled: boolean("is_enabled").notNull().default(true),
});
