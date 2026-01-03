"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useLiveData } from "../../hooks/useLiveData";
import { ClassLinks } from "./class-links";
import { IndividualClassResults } from "./individual-class-results";
import { EmptyState } from "../shared/empty-state";

export const ClassResults = () => {
    const { classResults, classNames, displayMode } = useLiveData();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    // Get filtered classes from URL search params
    const filteredClasses = searchParams.get("classes")
        ? searchParams.get("classes")!.split(",").filter((c) => classNames.includes(c))
        : [];

    // Update URL when filters change
    const updateFilters = (newFilters: string[]) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newFilters.length > 0) {
            params.set("classes", newFilters.join(","));
        } else {
            params.delete("classes");
        }
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    if (!classResults) {
        return <EmptyState message="No results available" />;
    }

    const handleFilteredClasses = (toggleClass: string) => {
        const index = filteredClasses.indexOf(toggleClass);
        if (index === -1) {
            updateFilters([...filteredClasses, toggleClass]);
        } else {
            updateFilters(filteredClasses.filter((c) => c !== toggleClass));
        }
    };

    const clearFilteredClasses = () => {
        updateFilters([]);
    };

    const classResultsElements = classNames
        .filter((classKey) => {
            // Hide elements that are not selected filters
            return filteredClasses.length === 0 || filteredClasses.includes(classKey);
        })
        .map((classKey) => (
            <IndividualClassResults
                key={classKey}
                className={classKey}
                displayMode={displayMode}
            />
        ));

    return (
        <div>
            <ClassLinks
                classes={classNames}
                filteredClasses={filteredClasses}
                toggleFilter={handleFilteredClasses}
                clearFilters={clearFilteredClasses}
            />
            <div className="mt-4 space-y-4">{classResultsElements}</div>
        </div>
    );
};
