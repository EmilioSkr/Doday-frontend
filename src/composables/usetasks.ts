import { computed, ref } from 'vue'
import { sampleTasks } from '@/data/sampleTasks'
import type { Priority, Task } from '@/types/task'
import { isoDate } from '@/utils/date'

// Kopie der Beispieldaten, damit die Originale unverändert bleiben
const tasks = ref<Task[]>(sampleTasks.map((t) => ({ ...t })))
let nextId = Math.max(0, ...sampleTasks.map((t) => t.id)) + 1

const rank: Record<Priority, number> = { MUST_DO: 0, NORMAL: 1, OPTIONAL: 2 }

// Nach Datum sortiert, bei gleichem Datum nach Priorität
const sortedTasks = computed(() =>
  [...tasks.value].sort(
    (a, b) => a.dueDate.localeCompare(b.dueDate) || rank[a.priority] - rank[b.priority],
  ),
)
const todayTasks = computed(() => sortedTasks.value.filter((t) => t.dueDate === isoDate(0)))
const upcomingTasks = computed(() =>
  sortedTasks.value.filter((t) => t.dueDate > isoDate(0) && !t.done),
)

function addTask(title: string, dueDate: string, priority: Priority) {
  tasks.value.push({
    id: nextId++,
    title: title.trim(),
    dueDate,
    priority,
    done: false,
  })
}

function toggleTask(id: number) {
  const task = tasks.value.find((t) => t.id === id)
  if (task) task.done = !task.done
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}

export function useTasks() {
  return {
    sortedTasks,
    todayTasks,
    upcomingTasks,
    addTask,
    toggleTask,
    removeTask,
  }
}
