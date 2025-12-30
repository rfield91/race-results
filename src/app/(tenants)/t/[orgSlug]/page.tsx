import { tenantService } from "@/services/tenants/tenant.service";
import { motorsportRegService } from "@/services/motorsportreg/motorsportreg.service";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/library/ui/table";
import { Button } from "@/components/library/ui/button";
import { ExternalLinkIcon, CalendarIcon } from "lucide-react";

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function isSingleDay(start: string, end: string): boolean {
    return start === end;
}

export default async function Page() {
    const tenant = await tenantService.getTenant();

    if (!tenant.isValid || tenant.isGlobal) {
        redirect("/");
    }

    // Fetch events if organization has MotorsportReg ID
    let events: Awaited<
        ReturnType<typeof motorsportRegService.getOrganizationCalendar>
    >["response"]["events"] = [];

    if (tenant.org.motorsportregOrgId) {
        try {
            const response = await motorsportRegService.getOrganizationCalendar(
                tenant.org.motorsportregOrgId,
                {
                    exclude_cancelled: true,
                }
            );
            events = response.response.events;
        } catch (error) {
            console.error("Failed to fetch MotorsportReg events:", error);
            // Continue without events if API call fails
        }
    }

    return (
        <div className="mx-auto mt-8 lg:w-1/2">
            <Link
                href={"/"}
                className="rounded border border-gray-200 p-2 shadow hover:border-gray-300"
            >
                Go Back
            </Link>
            <h1 className="mt-8 text-xl font-bold">{tenant.org.name}</h1>

            {tenant.org.motorsportregOrgId && (
                <div className="mt-8">
                    <h2 className="mb-4 text-lg font-semibold flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Upcoming Events
                    </h2>

                    {events.length === 0 ? (
                        <p className="text-muted-foreground">
                            No upcoming events found.
                        </p>
                    ) : (
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Event</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Venue</TableHead>
                                        <TableHead className="text-right">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {events.map((event) => {
                                        const singleDay = isSingleDay(
                                            event.start,
                                            event.end
                                        );

                                        return (
                                            <TableRow key={event.id}>
                                                <TableCell className="font-medium">
                                                    {event.name}
                                                </TableCell>
                                                <TableCell>{event.type}</TableCell>
                                                <TableCell>
                                                    {singleDay ? (
                                                        formatDate(event.start)
                                                    ) : (
                                                        <span>
                                                            {formatDate(
                                                                event.start
                                                            )}{" "}
                                                            -{" "}
                                                            {formatDate(
                                                                event.end
                                                            )}
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {event.venue.name},{" "}
                                                    {event.venue.city},{" "}
                                                    {event.venue.region}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link
                                                            href={event.detailuri}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            View Event
                                                            <ExternalLinkIcon className="ml-2 h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
