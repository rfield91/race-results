import { tenantService } from "@/services/tenants/tenant.service";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
    const tenant = await tenantService.getTenant();

    if (!tenant.isValid || tenant.isGlobal) {
        redirect("/");
    }

    return (
        <div className="mx-auto mt-8 lg:w-1/2">
            <Link
                href={"/"}
                className="rounded border border-gray-200 p-2 shadow hover:border-gray-300"
            >
                Go Back
            </Link>
            <h1 className="mt-8 text-xl font-bold">{tenant.org.name}</h1>
        </div>
    );
}
