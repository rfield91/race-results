"use client";

import { useLiveData } from "../../hooks/useLiveData";
import { PaxEntry } from "./pax-entry";
import { EmptyState } from "../shared/empty-state";

export const PaxResults = () => {
    const { paxResults, getPaxGapBehind } = useLiveData();
    const results = paxResults;

    if (!results) {
        return <EmptyState message="No results available" />;
    }

    const entries = results.map((entry, index) => {
        const gapBehind = getPaxGapBehind(entry, results);
        // Use position, number, and name to create unique key
        const uniqueKey = `${entry.paxPosition}-${entry.position}-${entry.number}-${entry.name}`;
        return <PaxEntry key={uniqueKey} entry={entry} gapBehind={gapBehind} />;
    });

    return <div className="space-y-2">{entries}</div>;
};

