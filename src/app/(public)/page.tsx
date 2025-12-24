import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/library/ui/card";
import { organizationService } from "@/services/organizations/organization.service";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/library/ui/button";
import {
    ArrowRightIcon,
    CalendarIcon,
    FilterIcon,
    SearchIcon,
    SortAscIcon,
    UsersIcon,
} from "lucide-react";
import { Input } from "@/components/library/ui/input";

export default async function Page() {
    const orgs = await organizationService.getAllOrganizations();

    return (
        <div className="w-full lg:w-3/4 lg:mx-auto mt-8">
            <div className="w-full bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-slate-950 py-8 mb-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-orange-600 to-orange-400 p-4">
                        Live Timing & Results
                    </h1>
                    <p className="text-lg text-muted-foreground mb-6">
                        Track motorsports results and live timing across all
                        your organizations
                    </p>
                    <div className="flex gap-4 justify-center">
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
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search organizations..."
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <FilterIcon className="h-4 w-4 mr-2" />
                        Filter
                    </Button>
                    <Button variant="outline" size="sm">
                        <SortAscIcon className="h-4 w-4 mr-2" />
                        Sort
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                {orgs.map((org, index) => (
                    <Link
                        key={org.orgId}
                        href={`/t/${org.slug}`}
                        className="hover:underline hover:underline-offset-2 max-w-[300px]"
                        aria-label={`View more about ${org.name}`}
                    >
                        <Card className="group relative w-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <div className="relative w-full h-48 bg-gradient-to-br from-orange-400 to-orange-500 overflow-hidden">
                                <Image
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    alt={org.name}
                                    width={400}
                                    height={225}
                                    src={`https://picsum.photos/400/225?random=${index}`}
                                />
                                {/* Optional: Add overlay badge */}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium">
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

                                <div className="flex gap-4 text-sm text-muted-foreground">
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
