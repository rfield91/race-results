"use server";

import { Organization } from "@/dto/organizations";
import { nameof } from "@/lib/utils";
import { organizationService } from "@/services/organizations/organization.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ActionState = {
    isError: boolean;
    message: string;
};

export async function createOrganization(
    _: ActionState,
    formData: FormData
): Promise<ActionState> {
    const name = formData.get(nameof<Organization>("name"))?.toString().trim();

    if (!name) {
        return { isError: true, message: "Name cannot be empty" };
    }

    let org = null;

    try {
        org = await organizationService.createOrganization({ name });
    } catch (error) {
        return {
            isError: true,
            message:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        };
    }

    if (org === null) {
        return {
            isError: true,
            message: "Organization could not be found after save",
        };
    }

    revalidatePath("/admin/organizations/");
    redirect(`/admin/organizations/${org.slug}`);
}

export async function updateOrganization(
    _: ActionState,
    formData: FormData
): Promise<ActionState> {
    const orgId = formData.get(nameof<Organization>("orgId"))?.toString();
    const name = formData.get(nameof<Organization>("name"))?.toString().trim();
    const description =
        formData.get(nameof<Organization>("description"))?.toString().trim() ||
        null;
    const isPublic = formData.get(nameof<Organization>("isPublic")) === "on";

    if (!orgId) {
        return { isError: true, message: "Organization ID is required" };
    }

    if (!name) {
        return { isError: true, message: "Name cannot be empty" };
    }

    let org = null;

    try {
        org = await organizationService.updateOrganization({
            orgId,
            name,
            description,
            isPublic,
        });
    } catch (error) {
        return {
            isError: true,
            message:
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred",
        };
    }

    if (org === null) {
        return {
            isError: true,
            message: "Organization could not be found after save",
        };
    }

    revalidatePath("/admin/organizations/");
    redirect(`/admin/organizations/${org.slug}`);
}
