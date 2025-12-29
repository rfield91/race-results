"use client";

import { useLiveData } from "../../hooks/useLiveData";
import { RawEntry } from "./raw-entry";
import { EmptyState } from "../shared/empty-state";

export const RawResults = () => {
    const { rawResults, getRawGapBehind } = useLiveData();
    const results = rawResults;

    if (!results) {
        return <EmptyState message="No results available" />;
    }

    const entries = results.map((entry, index) => {
        const gapBehind = getRawGapBehind(entry, results);
        // Use position and number to create unique key
        const uniqueKey = `${entry.position}-${entry.entryInfo.number}-${entry.entryInfo.name}`;
        return (
            <RawEntry key={uniqueKey} entry={entry} gapBehind={gapBehind} />
        );
    });
    return <div className="space-y-2">{entries}</div>;
};

