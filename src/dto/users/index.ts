import { InferResultType } from "@/db/utils/type-helpers";

export type UserDTO = InferResultType<"users", { assignedRoles: true }>;

export type UserRoles = InferResultType<"userRoles">;

export interface UserRole {
    userId: string;
    role: string;
    effectiveAt: Date;
    isNegated: boolean;
}

export interface User {
    userId: string;
    authProviderId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    displayName: string | null;
    roles: string[];
}

export const ROLES = {
    admin: "admin",
    tenantOwner: "tenantOwner",
    user: "user",
} as const;
