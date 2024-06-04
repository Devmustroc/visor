import { migrate } from "drizzle-orm/neon-http/migrator";
import { config } from "dotenv";
import {db} from "@/db/drizzle";

config({ path: ".env.local" });


const main = async () => {
    try {
        await migrate(db, { migrationsFolder: "drizzle" });
    } catch (error) {
        process.exit(1);
    }
};

main();