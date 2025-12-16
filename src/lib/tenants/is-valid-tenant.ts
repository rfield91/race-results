import { db } from "@/db";
import { eq, isNull } from "drizzle-orm";

export async function isValidTenant(slug: string) {
    const tenant = await db.query.orgs.findFirst({
        where: (orgs, { and }) =>
            and(isNull(orgs.deletedAt), eq(orgs.slug, slug)),
    });

    return typeof tenant !== "undefined";
}
