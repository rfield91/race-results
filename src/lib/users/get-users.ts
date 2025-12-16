import { db } from "@/db";

export async function getUsers() {
    return db.query.users.findMany({
        with: {
            assignedRoles: true,
        },
        orderBy: (users, { asc }) => [asc(users.displayName)],
    });
}
