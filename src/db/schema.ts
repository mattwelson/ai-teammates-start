import { createId } from "@paralleldrive/cuid2"
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const todos = pgTable(
  "todos",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: text("user_id").notNull(),
    title: varchar("title", { length: 280 }).notNull(),
    description: text("description"),
    completed: boolean("completed").notNull().default(false),
    dueAt: timestamp("due_at", { withTimezone: true, mode: "date" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("todos_user_completed_created_at_idx").on(
      table.userId,
      table.completed,
      table.createdAt
    ),
  ]
)

export type Todo = typeof todos.$inferSelect
export type NewTodo = typeof todos.$inferInsert
