import { db, orgs } from "@/db";
import { eq } from "drizzle-orm";
import { OrganizationDTO } from "../../dto/organizations";

interface IOrganizationsRepository {
    findAll(): Promise<OrganizationDTO[]>;
    findBySlug(slug: string): Promise<OrganizationDTO | null>;
}

export class OrganizationsRepository implements IOrganizationsRepository {
    async findAll() {
        return await db.query.orgs.findMany({
            with: {
                roles: true,
            },
        });
    }

    async findBySlug(slug: string): Promise<typeof orgs.$inferSelect | null> {
        const org = await db.query.orgs.findFirst({
            with: {
                roles: true,
            },
            where: eq(orgs.slug, slug),
        });

        return org ?? null;
    }
}

export const organizationsRepository = new OrganizationsRepository();
