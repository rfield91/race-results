import { TenantProvider } from "@/context/TenantContext";
import { UserProvider } from "@/context/UserContext";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import React from "react";
import "./globals.css";
import { userService } from "@/services/users/user.service";
import { tenantService } from "@/services/tenants/tenant.service";

const nunitoSans = Nunito_Sans({ variable: "--font-sans" });

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Race Results",
    description: "",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const tenant = await tenantService.getTenant();
    const user = await userService.getCurrentUser();

    return (
        <ClerkProvider>
            <html lang="en" className={nunitoSans.variable}>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <TenantProvider tenant={tenant}>
                        <UserProvider user={user}>{children}</UserProvider>
                    </TenantProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
