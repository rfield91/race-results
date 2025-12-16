import { db } from "@/db";
import { Organization } from "@/types/organizations";

export const getOrganizations = async (): Promise<Organization[]> => {
    return await db.query.orgs.findMany();
};
