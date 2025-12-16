import { ConfigurationLayout } from "@/components/shared/layout/configuration-layout";
import { filterNavForRoles } from "@/lib/shared/layout/configuration/navigation";
import { getUser } from "@/lib/users/get-user";
import { ROLES } from "@/types/users";
import { redirect } from "next/navigation";
import React from "react";

const ADMIN_NAVIGATION = [
    {
        name: "Config",
        items: [
            {
                text: "Organizations",
                href: "/admin/organizations",
                roles: [ROLES.admin],
            },
            {
                text: "Users",
                href: "/admin/users",
                roles: [ROLES.admin],
            },
        ],
    },
];

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUser();

    if (
        !user?.assignedRoles.some(
            (r) => r.role === ROLES.admin || r.role === ROLES.tenantOwner
        )
    ) {
        redirect("/");
    }

    const navItems = filterNavForRoles(
        ADMIN_NAVIGATION,
        user?.assignedRoles.map((r) => r.role) || []
    );

    return (
        <ConfigurationLayout navigationData={navItems}>
            {children}
        </ConfigurationLayout>
    );
}
