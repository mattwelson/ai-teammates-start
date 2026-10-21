import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/tanstack-react-start"
import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <main className="flex min-h-svh justify-center p-6">
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <header className="flex items-center justify-between gap-4">
          <a href="/" className="font-medium">
            AI Teammates
          </a>
          <Show when="signed-out">
            <div className="flex items-center gap-2">
              <SignInButton mode="redirect">
                <Button variant="ghost">Sign in</Button>
              </SignInButton>
              <SignUpButton mode="redirect">
                <Button>Sign up</Button>
              </SignUpButton>
            </div>
          </Show>
          <Show when="signed-in">
            <div className="flex items-center gap-3">
              <a href="/dashboard" className="text-sm underline underline-offset-4">
                Dashboard
              </a>
              <UserButton />
            </div>
          </Show>
        </header>
        <section className="flex flex-col gap-4 text-sm leading-relaxed">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">Project ready!</h1>
            <p>
              Authentication is powered by Clerk. Sign in or create an account to
              get started.
            </p>
          </div>
          <Show when="signed-in">
            <a href="/dashboard" className="w-fit">
              <Button>Open dashboard</Button>
            </a>
          </Show>
        </section>
      </div>
    </main>
  )
}
