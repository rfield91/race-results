/**
 * Navigation configuration for live timing pages
 */
export type NavigationPage = {
    name: string;
    link: string;
};

export function getNavigationPages(basePath: string): NavigationPage[] {
    return [
        {
            name: "Class",
            link: basePath,
        },
        {
            name: "PAX",
            link: `${basePath}/pax`,
        },
        {
            name: "Raw",
            link: `${basePath}/raw`,
        },
        {
            name: "Work/Run",
            link: `${basePath}/workrun`,
        },
    ];
}

