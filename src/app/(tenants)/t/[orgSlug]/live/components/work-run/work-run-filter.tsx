"use client";

import { Button } from "@/components/library/ui/button";

interface WorkRunFilterProps {
    classes: string[];
    selectedClass: string;
    handleSelectClass: (c: string) => void;
}

export const WorkRunFilter = ({
    classes,
    selectedClass,
    handleSelectClass,
}: WorkRunFilterProps) => {
    const classLinks = classes.map((c) => {
        return (
            <Button
                key={c}
                variant={selectedClass === c ? "default" : "outline"}
                size="sm"
                onClick={() => handleSelectClass(c)}
            >
                {c}
            </Button>
        );
    });

    return (
        <div className="mt-2 flex flex-wrap items-center gap-2">
            {classLinks}
        </div>
    );
};

