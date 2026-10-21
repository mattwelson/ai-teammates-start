import { createId } from "@paralleldrive/cuid2"
import { createFileRoute } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import { PlusIcon } from "lucide-react"
import { ChatAvatar } from "@/components/chat-avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

const createAvatarSeed = createServerFn({ method: "GET" }).handler(() =>
  createId()
)

export const Route = createFileRoute("/")({
  loader: () => createAvatarSeed(),
  component: App,
})

function App() {
  const seed = Route.useLoaderData()

  return (
    <main className="dark flex min-h-svh items-center justify-center bg-background p-6 text-foreground">
      <Empty className="max-w-sm flex-none gap-4 p-0">
        <EmptyHeader>
          <EmptyMedia>
            <ChatAvatar seed={seed} />
          </EmptyMedia>
          <EmptyTitle>Meet your first bot</EmptyTitle>
          <EmptyDescription>
            Every bot gets its own personality, memory, and face. Spin one up
            and start the conversation.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button size="sm" variant="secondary">
            <PlusIcon data-icon="inline-start" />
            Create a new bot
          </Button>
        </EmptyContent>
      </Empty>
    </main>
  )
}
