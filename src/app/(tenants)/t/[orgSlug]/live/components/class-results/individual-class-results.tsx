"use client";

import Link from "next/link";
import type { DisplayMode } from "../../types";
import { useLiveData } from "../../hooks/useLiveData";
import { ClassResultsEntry } from "./class-results-entry";

type IndividualClassResultsProps = {
    className: string;
    displayMode: DisplayMode;
};

export const IndividualClassResults = ({
    className,
    displayMode,
}: IndividualClassResultsProps) => {
    const { classResults, getGapBehind } = useLiveData();
    const results = classResults?.[className] ?? null;

    if (!results) {
        return null;
    }

    const isRallycross = displayMode === "rallycross";
    const entries = results.map((entry, index) => {
        const gapBehind = getGapBehind(entry, results, isRallycross);
        // Use position, number, and name to create unique key
        const uniqueKey = `${className}-${entry.position}-${entry.number}-${entry.name}`;
        return (
            <ClassResultsEntry
                entry={entry}
                gapBehind={gapBehind}
                key={uniqueKey}
                displayMode={displayMode}
            />
        );
    });

    return (
        <div key={className} id={className} className="space-y-2">
            <h2 className="cursor-pointer p-2 text-center text-lg font-bold tracking-widest">
                <Link href={`#${className}`} className="hover:underline">
                    {className}
                </Link>
            </h2>
            <div className="space-y-2">{entries}</div>
        </div>
    );
};

