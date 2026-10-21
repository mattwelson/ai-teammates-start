import process from "node:process"
import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
  server: {
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_SIGN_IN_URL: z.string().startsWith("/").default("/sign-in"),
    CLERK_SIGN_UP_URL: z.string().startsWith("/").default("/sign-up"),
    DATABASE_URL: z.url(),
    DATABASE_URL_UNPOOLED: z.url(),
  },
  runtimeEnv: { ...process.env },
  emptyStringAsUndefined: true,
})
