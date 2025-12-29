type DriverInfoProps = {
    carClass: string;
    number: string | number;
    name: string;
    car: string;
    color: string;
};

export function DriverInfo({
    carClass,
    number,
    name,
    car,
    color,
}: DriverInfoProps) {
    return (
        <div className="col-span-6">
            <div className="space-y-1">
                <div className="text-xs font-medium">
                    {carClass} #{number}
                </div>
                <div className="text-sm font-semibold">{name}</div>
                <div className="text-xs text-muted-foreground">{car}</div>
                <div className="text-xs text-muted-foreground">{color}</div>
            </div>
        </div>
    );
}

