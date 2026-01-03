"use client";

import { User } from "@/dto/users";
import { createContext, useContext } from "react";

const UserContext = createContext<User | null>(null);

export function UserProvider({
    user,
    children,
}: {
    user: User | null;
    children: React.ReactNode;
}) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
    const ctx = useContext(UserContext);

    if (!ctx) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return ctx;
}
