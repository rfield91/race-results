export type NavItem = {
    text: string;
    href: string;
    roles: string[];
};

export type NavGroup = {
    name: string;
    items: NavItem[];
};

export const filterNavForRoles = (navItems: NavGroup[], roles: string[]) => {
    for (const group of navItems) {
        group.items = group.items.filter((item) =>
            item.roles.some((role) => roles.includes(role))
        );
    }

    return navItems;
};
