import { cn } from "@/lib/utils";

type GapDisplayProps = {
    gapAhead: number | null | undefined;
    gapBehind: number | null | undefined;
    className?: string;
};

// Gap color thresholds optimized for autocross (average gap: 1.5s)
// Green shades for < 0.6s, yellow/orange/amber for 0.6-2.0s, red for > 2.0s
const GAP_COLOR_THRESHOLDS = [
    { max: 0.1, color: "bg-green-300" },
    { max: 0.2, color: "bg-green-400" },
    { max: 0.3, color: "bg-green-500" },
    { max: 0.4, color: "bg-green-600" },
    { max: 0.5, color: "bg-green-700" },
    { max: 0.6, color: "bg-green-800" },
    { max: 0.7, color: "bg-yellow-500" },
    { max: 0.8, color: "bg-yellow-600" },
    { max: 0.9, color: "bg-orange-400" },
    { max: 1.0, color: "bg-orange-500" },
    { max: 1.2, color: "bg-orange-600" },
    { max: 1.4, color: "bg-orange-700" },
    { max: 1.6, color: "bg-amber-600" },
    { max: 1.8, color: "bg-amber-700" },
    { max: 2.0, color: "bg-amber-800" },
    { max: 2.5, color: "bg-red-500" },
    { max: 3.0, color: "bg-red-600" },
] as const;

const MAX_GAP_FOR_VISUAL_SCALE = 1.5;
const MIN_BAR_HEIGHT_PERCENT = 8;
const LABEL_COLUMN_WIDTH = "40px";
const BAR_WIDTH = "5px";
const ROTATED_TEXT_WIDTH = "60px";
const ROTATED_TEXT_HEIGHT = "20px";

/**
 * Calculates the visual height percentage for a gap value
 */
function getGapHeight(gap: number): number {
    const normalized = Math.min(gap / MAX_GAP_FOR_VISUAL_SCALE, 1);
    return Math.max(normalized * 100, MIN_BAR_HEIGHT_PERCENT);
}

/**
 * Gets the color class for a gap value based on thresholds
 */
function getGapColor(gap: number): string {
    const threshold = GAP_COLOR_THRESHOLDS.find((t) => gap < t.max);
    return threshold?.color ?? "bg-red-700";
}

export function GapDisplay({
    gapAhead,
    gapBehind: _gapBehind,
    className = "col-span-2",
}: GapDisplayProps) {
    // Only show if there's a gap ahead (not first place)
    if (!gapAhead) {
        return null;
    }

    return (
        <div className={cn(className, "flex h-full gap-1")}>
            {/* Column 1: Time and Label */}
            <div
                className="flex items-start justify-start overflow-visible"
                style={{ width: LABEL_COLUMN_WIDTH, minWidth: LABEL_COLUMN_WIDTH }}
            >
                <div
                    className="flex flex-row items-center gap-2 whitespace-nowrap"
                    style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "center",
                        width: ROTATED_TEXT_WIDTH,
                        height: ROTATED_TEXT_HEIGHT,
                        marginTop: "auto",
                        marginBottom: "auto",
                    }}
                >
                    <div className="text-xs text-muted-foreground">Next</div>
                    <div className="text-xs font-semibold">{gapAhead.toFixed(3)}s</div>
                </div>
            </div>

            {/* Column 2: Visual Chart */}
            <div className={cn("flex flex-col h-full relative flex-shrink-0")} style={{ width: BAR_WIDTH }}>
                {/* Top - Car Ahead bar - grows from top */}
                <div className="flex-1 flex items-start justify-center relative">
                    <div
                        className={cn("w-full transition-all", getGapColor(gapAhead))}
                        style={{
                            height: `${getGapHeight(gapAhead)}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
