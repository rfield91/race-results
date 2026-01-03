"use client";

import { useState, useEffect } from "react";
import { useLiveData } from "../../hooks/useLiveData";
import { ClassLinks } from "./class-links";
import { IndividualClassResults } from "./individual-class-results";
import { EmptyState } from "../shared/empty-state";

const STORAGE_KEY = "class-filter-selection";

export const ClassResults = () => {
    const { classResults, classNames, displayMode } = useLiveData();
    const [filteredClasses, setFilteredClasses] = useState<string[]>([]);

    // Load filtered classes from localStorage on mount
    useEffect(() => {
        if (typeof window !== "undefined" && classNames.length > 0) {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored) as string[];
                    // Only restore filters that still exist in current classNames
                    const validFilters = parsed.filter((c) => classNames.includes(c));
                    if (validFilters.length > 0) {
                        setFilteredClasses(validFilters);
                    }
                } catch (e) {
                    // Invalid JSON, ignore
                }
            }
        }
    }, [classNames]);

    // Save to localStorage when filteredClasses changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (filteredClasses.length > 0) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredClasses));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, [filteredClasses]);

    if (!classResults) {
        return <EmptyState message="No results available" />;
    }

    const handleFilteredClasses = (toggleClass: string) => {
        setFilteredClasses((prev) => {
            const index = prev.indexOf(toggleClass);
            if (index === -1) {
                return [...prev, toggleClass];
            }
            return prev.filter((c) => c !== toggleClass);
        });
    };

    const clearFilteredClasses = () => {
        setFilteredClasses([]);
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
