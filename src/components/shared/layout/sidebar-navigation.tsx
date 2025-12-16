"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/lib/shared/layout/configuration/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarNavigation = ({ navItems }: { navItems: NavGroup[] }) => {
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarContent>
                {navItems.map((group) => (
                    <SidebarGroup key={group.name}>
                        <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.href}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={pathname === item.href}
                                        >
                                            <Link href={item.href}>
                                                {item.text}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
};
