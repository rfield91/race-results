import { db, orgs } from "@/db";
import { Organization } from "@/types/organizations";
import { eq } from "drizzle-orm/sql/expressions/conditions";

export const getOrganization = async (
    slug: string
): Promise<Organization | null> => {
    const org = await db.query.orgs.findFirst({ where: eq(orgs.slug, slug) });

    return org ?? null;
};
