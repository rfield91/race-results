type PositionBadgeProps = {
    label: string;
    value: string | number;
    secondaryLabel?: string;
    secondaryValue?: string | number;
    className?: string;
};

export function PositionBadge({
    label,
    value,
    secondaryLabel,
    secondaryValue,
    className = "col-span-2",
}: PositionBadgeProps) {
    return (
        <div className={`${className} text-center`}>
            <div className="space-y-1">
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="text-lg font-semibold">{value}</div>
                {secondaryLabel && secondaryValue !== undefined && (
                    <>
                        <div className="text-xs text-muted-foreground">
                            {secondaryLabel}
                        </div>
                        <div className="text-sm font-medium">
                            {secondaryValue}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

