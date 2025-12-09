import { db } from "@/db";
import "dotenv/config";
import { orgs } from "./schema";


async function main() {
    await db.delete(orgs);

    await db
        .insert(orgs)
        .values((await import("@/db/seed-data/orgs.json")).default)
        .returning();
}

main();