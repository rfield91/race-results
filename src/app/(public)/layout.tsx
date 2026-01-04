import { TenantProvider } from "@/context/TenantContext";
import { tenantService } from "@/services/tenants/tenant.service";
import { AppHeader } from "@/app/components/shared/layout/app-header";
import { AppFooter } from "@/app/components/shared/layout/app-footer";

export default async function GlobalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tenant = await tenantService.getTenant();

    return (
        <TenantProvider tenant={tenant}>
            <div className="flex min-h-screen flex-col">
                <AppHeader />
                <main className="flex-1">{children}</main>
                <AppFooter />
            </div>
        </TenantProvider>
    );
}
