import { UserDTO } from "@/dto/users";
import { db, users } from "@/db";
import { and, eq, isNull } from "drizzle-orm/sql/expressions/conditions";

interface IUserRepository {
    findAll(): Promise<UserDTO[]>;
    findByAuthProviderId(authProviderId: string): Promise<UserDTO | null>;
}

export class UsersRepository implements IUserRepository {
    async findAll() {
        return db.query.users.findMany({
            with: {
                assignedRoles: true,
            },
            orderBy: (users, { asc }) => [asc(users.displayName)],
        });
    }

    async findByAuthProviderId(
        authProviderId: string
    ): Promise<UserDTO | null> {
        const dbUser = await db.query.users.findFirst({
            with: {
                assignedRoles: true,
            },
            where: and(
                eq(users.authProviderId, authProviderId),
                isNull(users.deletedAt)
            ),
        });

        return dbUser ?? null;
    }
}

export const usersRepository = new UsersRepository();
