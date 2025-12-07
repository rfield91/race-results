import { getTenant } from "@/lib/getTenant";

export default async function Page() {
    const { slug } = await getTenant();

    return <div>Tenant, {slug}</div>;
}