import type { Priority, Task } from '@/types/task'

const priorityRank: Record<Priority, number> = {
  MUST_DO: 0,
  NORMAL: 1,
  OPTIONAL: 2,
}

// Sortiert nach Fälligkeitsdatum, bei gleichem Datum nach Priorität (Must-Do zuerst).
// Die übergebene Liste wird nicht verändert.
export function sortTasks(tasks: readonly Task[]): Task[] {
  return [...tasks].sort(
    (a, b) =>
      a.dueDate.localeCompare(b.dueDate) || priorityRank[a.priority] - priorityRank[b.priority],
  )
}
