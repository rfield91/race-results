import { userService } from "@/services/users/user.service";
import { ROLES } from "@/dto/users";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/library/ui/button";
import { TenantProvider } from "@/context/TenantContext";
import { tenantService } from "@/services/tenants/tenant.service";
import { Separator } from "@/components/library/ui/separator";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { CgMediaLive } from "react-icons/cg";

export default async function GlobalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const tenant = await tenantService.getTenant();
    const user = await userService.getCurrentUser();

    return (
        <TenantProvider tenant={tenant}>
            <div className="flex min-h-screen flex-col">
                <header className="bg-background sticky top-0 z-50 w-full border-b">
                    <div className="flex h-16 w-full items-center justify-between px-4">
                        <div className="flex items-center gap-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-xl font-bold"
                            >
                                <span className="text-orange-500">🏁</span>
                                Race Results
                            </Link>
                            <nav className="hidden h-16 items-center gap-6 text-sm md:flex">
                                <Link
                                    href="/"
                                    className="flex h-full items-center border-b-2 border-transparent transition-colors duration-500 ease-in-out hover:border-orange-400 hover:text-orange-600"
                                >
                                    Organizations
                                </Link>
                                <Link
                                    href="/events"
                                    className="flex h-full items-center border-b-2 border-transparent transition-colors duration-500 ease-in-out hover:border-orange-400 hover:text-orange-600"
                                >
                                    Events
                                </Link>
                                <Link
                                    href="/results"
                                    className="flex h-full items-center border-b-2 border-transparent transition-colors duration-500 ease-in-out hover:border-orange-400 hover:text-orange-600"
                                >
                                    Results
                                </Link>
                                <Link
                                    href="/live"
                                    className="flex h-full items-center gap-2 border-b-2 border-transparent transition-colors duration-500 ease-in-out hover:border-orange-400 hover:text-orange-600"
                                >
                                    Live Timing{" "}
                                    <CgMediaLive className="animate-pulse text-red-500" />
                                </Link>
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            {user?.roles.includes(ROLES.admin) && (
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/admin">Admin</Link>
                                </Button>
                            )}
                            <SignedOut>
                                <SignInButton>
                                    <Button size="sm">Sign In</Button>
                                </SignInButton>
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </div>
                </header>
                <main className="flex-1">{children}</main>
                <footer className="bg-muted/50 mt-20 border-t py-12">
                    <div className="container px-4">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                            <div>
                                <h3 className="mb-4 flex items-center gap-2 font-bold">
                                    <span className="text-orange-500">🏁</span>
                                    Race Results
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    Multi-tenant motorsports results and live
                                    timing platform.
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-4 font-semibold">
                                    Quick Links
                                </h4>
                                <ul className="space-y-2 text-sm">
                                    <li>
                                        <Link
                                            href="/"
                                            className="hover:underline"
                                        >
                                            Organizations
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/events"
                                            className="hover:underline"
                                        >
                                            Events
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/results"
                                            className="hover:underline"
                                        >
                                            Results
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/live"
                                            className="hover:underline"
                                        >
                                            Live Timing
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-4 font-semibold">Connect</h4>
                                <div className="flex gap-4">
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        className="group"
                                        title="Visit us on Facebook"
                                    >
                                        <FaFacebookF className="transition-all duration-500 group-hover:scale-110" />
                                    </a>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        className="group"
                                        title="Visit us on Instagram"
                                    >
                                        <FaInstagram className="transition-all duration-500 group-hover:scale-110" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-8" />
                        <p className="text-muted-foreground text-center text-sm">
                            © {new Date().getFullYear()} Race Results. All
                            rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </TenantProvider>
    );
}
