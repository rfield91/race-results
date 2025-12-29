"use client";

import { DisplayMode, type ClassResult } from "../../types";
import { AutocrossResultEntry } from "./autocross-result-entry";
import { RallycrossResultEntry } from "./rallycross-result-entry";

type ClassResultsEntryProps = {
    entry: ClassResult;
    gapBehind: number | null;
    displayMode: DisplayMode;
};

export const ClassResultsEntry = ({
    entry,
    gapBehind,
    displayMode,
}: ClassResultsEntryProps) => {
    return displayMode == DisplayMode.rallycross ? (
        <RallycrossResultEntry entry={entry} gapBehind={gapBehind} />
    ) : (
        <AutocrossResultEntry entry={entry} gapBehind={gapBehind} />
    );
};

