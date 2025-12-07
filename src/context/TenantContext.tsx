"use client";

import React, { createContext, useContext } from "react";

export type TenantContextType = {
    slug: string;
    isGlobal: boolean;
};

const TenantContext = createContext<TenantContextType | null>(null);

export function TenantProvider({
    children,
    slug
}: {
    children: React.ReactNode,
    slug: string
}) {
    return <TenantContext.Provider
        value={{
            slug,
            isGlobal: slug === "global"
        }}>
        {children}
    </TenantContext.Provider>
}

export function useTenant() {
    const ctx = useContext(TenantContext);

    if (!ctx) {
        throw new Error("useTenant must be used within a TenantProvider");
    }

    return ctx;
}