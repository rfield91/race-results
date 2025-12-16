import { InferResultType } from "@/db/utils/type-helpers";

export type User = InferResultType<"users", { assignedRoles: true }>;

export const ROLES = {
    admin: "admin",
    tenantOwner: "tenantOwner",
    user: "user",
} as const;
