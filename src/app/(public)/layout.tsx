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
                <header className="sticky top-0 z-50 w-full border-b bg-background">
                    <div className="w-full flex h-16 items-center justify-between px-4">
                        <div className="flex items-center gap-6">
                            <Link
                                href="/"
                                className="flex items-center gap-2 font-bold text-xl"
                            >
                                <span className="text-orange-500">🏁</span>
                                Race Results
                            </Link>
                            <nav className="hidden md:flex items-center gap-6 text-sm h-16">
                                <Link
                                    href="/"
                                    className="transition-colors hover:text-orange-600 border-b-2 h-full flex items-center border-transparent hover:border-orange-400 duration-500 ease-in-out"
                                >
                                    Organizations
                                </Link>
                                <Link
                                    href="/events"
                                    className="transition-colors hover:text-orange-600 border-b-2 h-full flex items-center border-transparent hover:border-orange-400 duration-500 ease-in-out"
                                >
                                    Events
                                </Link>
                                <Link
                                    href="/results"
                                    className="transition-colors hover:text-orange-600 border-b-2 h-full flex items-center border-transparent hover:border-orange-400 duration-500 ease-in-out"
                                >
                                    Results
                                </Link>
                                <Link
                                    href="/live"
                                    className="transition-colors hover:text-orange-600 border-b-2 h-full flex items-center border-transparent hover:border-orange-400 duration-500 ease-in-out gap-2"
                                >
                                    Live Timing{" "}
                                    <CgMediaLive className="text-red-500 animate-pulse" />
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
                <footer className="mt-20 border-t bg-muted/50 py-12">
                    <div className="container px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                    <span className="text-orange-500">🏁</span>
                                    Race Results
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Multi-tenant motorsports results and live
                                    timing platform.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-4">
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
                                <h4 className="font-semibold mb-4">Connect</h4>
                                <div className="flex gap-4">
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        className="group"
                                        title="Visit us on Facebook"
                                    >
                                        <FaFacebookF className="group-hover:scale-110 transition-all duration-500" />
                                    </a>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        className="group"
                                        title="Visit us on Instagram"
                                    >
                                        <FaInstagram className="group-hover:scale-110 transition-all duration-500" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-8" />
                        <p className="text-center text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Race Results. All
                            rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </TenantProvider>
    );
}
