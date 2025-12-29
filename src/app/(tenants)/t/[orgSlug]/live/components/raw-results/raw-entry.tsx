import type { RawResult } from "../../types";
import { ResultCard } from "../shared/result-card";
import { PositionBadge } from "../shared/position-badge";
import { DriverInfo } from "../shared/driver-info";
import { TimeValue } from "../shared/time-value";
import { GapDisplay } from "../shared/gap-display";

type RawEntryProps = {
    entry: RawResult;
    gapBehind: number | null;
};

export const RawEntry = ({ entry, gapBehind }: RawEntryProps) => {
    return (
        <ResultCard>
            <PositionBadge label="Position" value={entry.position} />
            <DriverInfo
                carClass={entry.entryInfo.carClass}
                number={entry.entryInfo.number}
                name={entry.entryInfo.name}
                car={entry.entryInfo.car}
                color={entry.entryInfo.color}
            />
            <TimeValue label="Raw" value={entry.total} />
            <GapDisplay
                gapAhead={entry.toNext}
                gapBehind={gapBehind}
            />
        </ResultCard>
    );
};

