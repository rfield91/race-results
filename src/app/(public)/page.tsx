import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/ui/card";
import { organizationService } from "@/services/organizations/organization.service";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/ui/button";
import {
    ArrowRightIcon,
    CalendarIcon,
    FilterIcon,
    SearchIcon,
    SortAscIcon,
    UsersIcon,
} from "lucide-react";
import { Input } from "@/ui/input";

export default async function Page() {
    const orgs = await organizationService.getAllOrganizations();

    return (
        <div className="mt-8 w-full lg:mx-auto lg:w-3/4">
            <div className="mb-12 w-full bg-linear-to-br from-orange-50 to-orange-100 py-8 dark:from-orange-950 dark:to-slate-950">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h1 className="mb-4 bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text p-4 text-4xl font-bold text-transparent md:text-5xl">
                        Live Timing & Results
                    </h1>
                    <p className="text-muted-foreground mb-6 text-lg">
                        Track motorsports results and live timing across all
                        your organizations
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="#organizations">
                                Browse Organizations
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/about">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mb-8 flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                    <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                        placeholder="Search organizations..."
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <FilterIcon className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <SortAscIcon className="mr-2 h-4 w-4" />
                        Sort
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
                {orgs.map((org, index) => (
                    <Link
                        key={org.orgId}
                        href={`/t/${org.slug}`}
                        className="max-w-[300px] hover:underline hover:underline-offset-2"
                        aria-label={`View more about ${org.name}`}
                    >
                        <Card className="group relative w-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-orange-400 to-orange-500">
                                <Image
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    alt={org.name}
                                    width={400}
                                    height={225}
                                    src={`https://picsum.photos/400/225?random=${index}`}
                                />
                                {/* Optional: Add overlay badge */}
                                <div className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium backdrop-blur">
                                    Active
                                </div>
                            </div>

                            <CardHeader className="space-y-3">
                                <CardTitle className="flex items-center justify-between">
                                    <span className="line-clamp-1">
                                        {org.name}
                                    </span>
                                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </CardTitle>

                                <div className="text-muted-foreground flex gap-4 text-sm">
                                    <span className="flex items-center gap-1">
                                        <CalendarIcon className="h-4 w-4" />8
                                        Events
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <UsersIcon className="h-4 w-4" />
                                        156 Drivers
                                    </span>
                                </div>

                                <CardDescription className="line-clamp-2">
                                    View event results, live timing, and
                                    leaderboards for {org.name}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
