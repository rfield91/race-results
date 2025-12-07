import { headers } from "next/headers";

export async function getTenant() {
    const h = await headers();
    const slug = h.get("x-tenant-slug") || "global";

    return {
        slug,
        isGlobal: slug === "global"
    };
}