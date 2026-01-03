"use client";

import React, { createContext, useContext, useMemo } from "react";
import type {
    ClassResult,
    DisplayMode,
    RawResult,
    RunWork,
} from "../types";

type LiveResultsData = {
    classResults: Record<string, ClassResult[]> | null;
    paxResults: ClassResult[] | null;
    rawResults: RawResult[] | null;
    runWork: RunWork | null;
    displayMode: DisplayMode;
};

const LiveResultsContext = createContext<LiveResultsData | null>(null);

type LiveResultsProviderProps = {
    classResults: Record<string, ClassResult[]> | null;
    paxResults: ClassResult[] | null;
    rawResults: RawResult[] | null;
    runWork: RunWork | null;
    displayMode: DisplayMode;
    children: React.ReactNode;
};

export function LiveResultsProvider({
    classResults,
    paxResults,
    rawResults,
    runWork,
    displayMode,
    children,
}: LiveResultsProviderProps) {
    const value = useMemo(
        () => ({
            classResults,
            paxResults,
            rawResults,
            runWork,
            displayMode,
        }),
        [classResults, paxResults, rawResults, runWork, displayMode]
    );

    return (
        <LiveResultsContext.Provider value={value}>
            {children}
        </LiveResultsContext.Provider>
    );
}

export function useLiveResults() {
    const context = useContext(LiveResultsContext);

    if (!context) {
        throw new Error(
            "useLiveResults must be used within a LiveResultsProvider"
        );
    }

    return context;
}

