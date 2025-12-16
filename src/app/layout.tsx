import { TenantProvider } from "@/context/TenantContext";
import { UserProvider } from "@/context/UserContext";
import { getTenant } from "@/lib/tenants/get-tenant";
import { getUser } from "@/lib/users/get-user";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";

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
    const tenant = await getTenant();
    const user = await getUser();

    return (
        <ClerkProvider>
            <html lang="en">
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
