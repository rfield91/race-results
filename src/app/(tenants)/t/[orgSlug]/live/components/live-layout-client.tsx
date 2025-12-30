"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Button } from "@/components/library/ui/button";
import { getNavigationPages } from "../lib/navigation";

export function LiveLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const params = useParams();
    const orgSlug = params.orgSlug as string;
    const basePath = `/t/${orgSlug}/live`;
    const navigationPages = getNavigationPages(basePath);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="my-4 flex flex-row items-center gap-2 text-2xl font-bold">
                <span className="text-orange-500">🏁</span>
                Live Timing
            </div>
            <nav className="mb-4 flex flex-wrap items-center justify-center gap-2">
                {navigationPages.map((page) => {
                    const isActive =
                        pathname === page.link ||
                        (page.link === basePath && pathname === basePath);
                    return (
                        <Button
                            key={page.link}
                            variant={isActive ? "default" : "outline"}
                            size="sm"
                            asChild
                        >
                            <Link href={page.link}>{page.name}</Link>
                        </Button>
                    );
                })}
            </nav>
            <div className="w-full max-w-7xl px-4">{children}</div>
        </div>
    );
}

