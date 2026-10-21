import { SignUp } from "@clerk/tanstack-react-start"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/sign-up/$")({
  component: SignUpPage,
})

function SignUpPage() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <SignUp />
    </main>
  )
}
