"use client";

import { useLiveResults } from "../context/live-results-context";
import type { ClassResult, RawResult } from "../types";

/**
 * Finds the index of an entry in an array by matching position, number, and name
 */
function findEntryIndex<T extends { position: string | number; number: string | number; name: string }>(
    entry: T,
    allEntries: T[],
    positionKey: keyof T = "position" as keyof T,
): number {
    return allEntries.findIndex(
        (e) =>
            e[positionKey] === entry[positionKey] &&
            e.number === entry.number &&
            e.name === entry.name,
    );
}

/**
 * Finds the index of a PAX entry by matching paxPosition, number, and name
 */
function findPaxEntryIndex(entry: ClassResult, allEntries: ClassResult[]): number {
    return allEntries.findIndex(
        (e) =>
            e.paxPosition === entry.paxPosition &&
            e.number === entry.number &&
            e.name === entry.name,
    );
}

/**
 * Finds the index of a raw entry by matching position, number, and name
 */
function findRawEntryIndex(entry: RawResult, allEntries: RawResult[]): number {
    return allEntries.findIndex(
        (e) =>
            e.position === entry.position &&
            e.entryInfo.number === entry.entryInfo.number &&
            e.entryInfo.name === entry.entryInfo.name,
    );
}

/**
 * Hook to access live results data
 * Returns data directly and provides helper methods for calculations
 */
export function useLiveData() {
    const context = useLiveResults();

    /**
     * Calculate gap to the person behind for a given entry
     * This looks at the next entry's toNext value
     */
    const getGapBehind = (
        entry: ClassResult,
        allEntries: ClassResult[],
        isRallycross = false,
    ): number | null => {
        const currentIndex = findEntryIndex(entry, allEntries);

        if (currentIndex === -1 || currentIndex === allEntries.length - 1) {
            return null;
        }

        const nextEntry = allEntries[currentIndex + 1];
        return isRallycross
            ? nextEntry.runInfo.rallyCrossToNext
            : nextEntry.runInfo.toNextInClass;
    };

    /**
     * Calculate gap behind for PAX results
     */
    const getPaxGapBehind = (entry: ClassResult, allEntries: ClassResult[]): number | null => {
        const currentIndex = findPaxEntryIndex(entry, allEntries);

        if (currentIndex === -1 || currentIndex === allEntries.length - 1) {
            return null;
        }

        const nextEntry = allEntries[currentIndex + 1];
        return nextEntry.runInfo.toNextInPax;
    };

    /**
     * Calculate gap behind for raw results
     */
    const getRawGapBehind = (entry: RawResult, allEntries: RawResult[]): number | null => {
        const currentIndex = findRawEntryIndex(entry, allEntries);

        if (currentIndex === -1 || currentIndex === allEntries.length - 1) {
            return null;
        }

        const nextEntry = allEntries[currentIndex + 1];
        return nextEntry.toNext;
    };

    return {
        // Direct data access
        classResults: context.classResults,
        paxResults: context.paxResults,
        rawResults: context.rawResults,
        runWork: context.runWork,
        displayMode: context.displayMode,

        // Computed values
        classNames: context.classResults ? Object.keys(context.classResults) : [],

        // Helper methods for gap calculations
        getGapBehind,
        getPaxGapBehind,
        getRawGapBehind,
    };
}

