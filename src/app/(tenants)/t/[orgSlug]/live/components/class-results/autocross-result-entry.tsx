"use client";

import { useState } from "react";
import type { ClassResult } from "../../types";
import { ResultCard } from "../shared/result-card";
import { PositionBadge } from "../shared/position-badge";
import { DriverInfo } from "../shared/driver-info";
import { TimeValue } from "../shared/time-value";
import { GapDisplay } from "../shared/gap-display";
import { RunData } from "./run-data";
import { RunTimeDisplay } from "./run-time-display";

type AutocrossResultEntryProps = {
    entry: ClassResult;
    gapBehind: number | null;
};

export const AutocrossResultEntry = ({
    entry,
    gapBehind,
}: AutocrossResultEntryProps) => {
    const [showRuns, setShowRuns] = useState(false);
    const isPaxLeader = entry.paxPosition === 1;
    const lastRun =
        entry.runInfo.runs.length > 0
            ? entry.runInfo.runs[entry.runInfo.runs.length - 1]
            : null;

    return (
        <ResultCard
            onClick={() => setShowRuns(!showRuns)}
            isHighlighted={isPaxLeader}
        >
            <PositionBadge
                label="Class"
                value={entry.position}
                secondaryLabel="PAX"
                secondaryValue={entry.paxPosition}
            />
            <DriverInfo
                carClass={entry.carClass}
                number={entry.number}
                name={entry.name}
                car={entry.car}
                color={entry.color}
            />
            <TimeValue
                label="Best"
                value={entry.runInfo.total}
                secondaryLabel="Last"
                secondaryValue={
                    lastRun ? <RunTimeDisplay run={lastRun} /> : "N/A"
                }
            />
            <GapDisplay
                gapAhead={entry.runInfo.toNextInClass}
                gapBehind={gapBehind}
            />
            {showRuns && (
                <div className="col-span-12 mt-2 border-t pt-2">
                    <RunData runInfo={entry.runInfo} />
                </div>
            )}
        </ResultCard>
    );
};

