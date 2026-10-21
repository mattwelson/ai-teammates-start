import process from "node:process"
import { config as loadDotenv } from "dotenv"
import { defineConfig } from "drizzle-kit"

loadDotenv({ path: ".env.local" })
loadDotenv({ path: ".env" })

const databaseUrl =
  process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  ...(databaseUrl ? { dbCredentials: { url: databaseUrl } } : {}),
})
