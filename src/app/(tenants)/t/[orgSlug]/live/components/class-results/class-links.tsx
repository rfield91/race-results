"use client";

import { Button } from "@/components/library/ui/button";

interface ClassLinksProps {
    classes: string[];
    filteredClasses: string[];
    toggleFilter: (c: string) => void;
    clearFilters: () => void;
}

export const ClassLinks = ({
    classes,
    filteredClasses,
    toggleFilter,
    clearFilters,
}: ClassLinksProps) => {
    const noSelected = !filteredClasses.length;

    const classLinks = classes.map((c) => {
        const selected = filteredClasses.includes(c);
        return (
            <Button
                key={c}
                variant={selected || noSelected ? "default" : "outline"}
                size="sm"
                onClick={() => toggleFilter(c)}
            >
                {c}
            </Button>
        );
    });

    return (
        <div className="mt-2 flex flex-wrap items-center gap-2">
            {classLinks}
            {!noSelected && (
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={clearFilters}
                >
                    Clear
                </Button>
            )}
        </div>
    );
};

