import { Avatar as DiceBearAvatar, Style } from "@dicebear/core"
import gaze from "@dicebear/styles/gaze.json" with { type: "json" }
import { cn } from "cn"
import { useMemo } from "react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const gazeStyle = new Style(gaze)

type ChatAvatarProps = {
  seed: string
  animated?: boolean
  className?: string
}

export function ChatAvatar({
  seed,
  animated = false,
  className,
}: ChatAvatarProps) {
  const src = useMemo(
    () =>
      new DiceBearAvatar(gazeStyle, {
        seed,
        size: 32,
        tags: animated ? ["animation"] : ["!animation"],
      }).toDataUri(),
    [seed, animated]
  )

  return (
    <Avatar className={cn("size-8 border-0 after:hidden", className)}>
      <AvatarImage keepMounted src={src} alt={`Chat avatar for ${seed}`} />
    </Avatar>
  )
}
