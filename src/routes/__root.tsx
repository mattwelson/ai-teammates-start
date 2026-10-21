import { ClerkProvider } from "@clerk/tanstack-react-start"
import { auth } from "@clerk/tanstack-react-start/server"
import { shadcn } from "@clerk/ui/themes"
import { TanStackDevtools } from "@tanstack/react-devtools"
import {
  createRootRoute,
  HeadContent,
  redirect,
  Scripts,
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { createServerFn } from "@tanstack/react-start"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { env } from "@/env/client"

import appCss from "../styles.css?url"

const requireAuthentication = createServerFn({ method: "GET" }).handler(
  async () => {
    const { isAuthenticated } = await auth()

    if (!isAuthenticated) {
      throw redirect({ to: "/sign-in/$", params: { _splat: "" } })
    }
  }
)

function isPublicAuthRoute(pathname: string) {
  return /^\/sign-(in|up)(\/|$)/.test(pathname)
}

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    if (!isPublicAuthRoute(location.pathname)) {
      await requireAuthentication()
    }
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ClerkProvider
          publishableKey={env.VITE_CLERK_PUBLISHABLE_KEY}
          appearance={{ theme: shadcn }}
        >
          <TooltipProvider>
            <Toaster>{children}</Toaster>
          </TooltipProvider>
        </ClerkProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
