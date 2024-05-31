import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { config } from "dotenv";
import {db} from "@/db/drizzle";

config({ path: ".env.local" });


const main = async () => {
    try {
        await migrate(db, { migrationsFolder: "drizzle" });
        console.log("Migration completed");
    } catch (error) {
        console.error("Error during migration:", error);
        process.exit(1);
    }
};

main();