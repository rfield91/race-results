type TimeValueProps = {
    label: string;
    value: number | string | null | undefined;
    secondaryLabel?: string;
    secondaryValue?: React.ReactNode;
    className?: string;
    formatValue?: (value: number) => string;
};

export function TimeValue({
    label,
    value,
    secondaryLabel,
    secondaryValue,
    className = "col-span-2",
    formatValue = (v) => v.toFixed(3),
}: TimeValueProps) {
    const displayValue =
        value == null
            ? "N/A"
            : typeof value === "number"
              ? formatValue(value)
              : value;

    return (
        <div className={`${className} text-center`}>
            <div className="space-y-1">
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="text-sm font-semibold">{displayValue}</div>
                {secondaryLabel && secondaryValue !== undefined && (
                    <>
                        <div className="text-xs text-muted-foreground">
                            {secondaryLabel}
                        </div>
                        <div className="text-sm">{secondaryValue}</div>
                    </>
                )}
            </div>
        </div>
    );
}

