import { db, users } from "@/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { cache } from "react";

export const getUser = cache(async () => {
    const { userId } = await auth();
    const user = await currentUser();

    if (userId === null || user === null) {
        return null;
    }

    const dbUser = await db.query.users.findFirst({
        with: {
            assignedRoles: true,
        },
        where: and(eq(users.authProviderId, userId), isNull(users.deletedDt)),
    });

    return dbUser ?? null;
});
