import { auth } from "@clerk/tanstack-react-start/server"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { Button } from "@/components/ui/button"

const getDashboardSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const { isAuthenticated, userId } = await auth()

    if (!isAuthenticated) {
      throw redirect({ to: "/sign-in/$", params: { _splat: "" } })
    }

    return { userId }
  }
)

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => getDashboardSession(),
  loader: ({ context }) => ({ userId: context.userId }),
  component: DashboardPage,
})

function DashboardPage() {
  const { userId } = Route.useLoaderData()

  return (
    <main className="flex min-h-svh justify-center p-6">
      <section className="flex w-full max-w-2xl flex-col gap-4">
        <a href="/" className="text-sm underline underline-offset-4">
          Back home
        </a>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          You are signed in with user ID <code>{userId}</code>.
        </p>
        <Button className="w-fit" render={<a href="/" />} variant="outline">
          Return home
        </Button>
      </section>
    </main>
  )
}
