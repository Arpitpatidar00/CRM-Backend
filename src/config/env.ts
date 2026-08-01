import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  MONGODB_URI: z.string(),
  SESSION_SECRET: z.string(),
  SESSION_MAX_AGE: z.string().default("86400000"), // Default 1 day in ms
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error("❌ Invalid environment variables:", envParse.error.format());
  process.exit(1);
}

export const env = envParse.data;
