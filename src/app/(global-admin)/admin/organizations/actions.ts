"use server";

import { db, orgs } from "@/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type ActionState = {
    isError: boolean;
    message: string;
};

export async function upsertOrg(
    _: ActionState,
    formData: FormData
): Promise<ActionState | never> {
    const name = formData.get("org-name")?.toString().trim();
    const id = formData.get("org-id")?.toString();

    if (!name) {
        return { isError: true, message: "Name cannot be empty" };
    }

    const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    try {
        if (id) {
            await db
                .update(orgs)
                .set({ name, slug })
                .where(eq(orgs.org_id, id));
        } else {
            await db.insert(orgs).values({ name, slug });
        }
    } catch {
        return { isError: true, message: "Organization already exists" };
    }

    redirect(`/admin/organizations/${slug}`);
}
