import { SidebarInset, SidebarProvider } from "@/components/library/ui/sidebar";
import { NavGroup } from "@/lib/shared/layout/configuration/navigation";
import React from "react";
import { SidebarNavigation } from "./sidebar-navigation";

export const ConfigurationLayout = ({
    navigationData,
    children,
}: {
    navigationData: NavGroup[];
    children: React.ReactNode;
}) => {
    return (
        <SidebarProvider>
            <SidebarNavigation navItems={navigationData} />
            <SidebarInset>
                <main className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};
