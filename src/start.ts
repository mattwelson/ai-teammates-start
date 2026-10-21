import { clerkMiddleware } from "@clerk/tanstack-react-start/server"
import {
  createCsrfMiddleware,
  createMiddleware,
  createStart,
} from "@tanstack/react-start"

const csrfMiddleware = createCsrfMiddleware({
  filter: (context) => context.handlerType === "serverFn",
})

const serverEnvMiddleware = createMiddleware().server(async ({ next }) => {
  await import("@/env/server")
  return next()
})

export const startInstance = createStart(() => ({
  requestMiddleware: [csrfMiddleware, serverEnvMiddleware, clerkMiddleware()],
}))
