import { computed, ref } from 'vue'
import type { Priority, Task } from '@/types/task'
import { isoDate } from '@/utils/date'
import { apiErrorMessage, deleteResource, getJson, sendJson } from '@/utils/api'

interface TaskResponse {
  id: number
  title: string
  dueDate: string
  priority: Priority
  done: boolean
}

const tasks = ref<Task[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const rank: Record<Priority, number> = { MUST_DO: 0, NORMAL: 1, OPTIONAL: 2 }

function fromResponse(task: TaskResponse): Task {
  return {
    id: task.id,
    title: task.title,
    dueDate: task.dueDate,
    priority: task.priority,
    status: task.done ? 'done' : 'open',
  }
}

function replaceTask(updated: Task) {
  const index = tasks.value.findIndex((task) => task.id === updated.id)
  if (index !== -1) tasks.value[index] = updated
}

async function loadTasks() {
  loading.value = true
  error.value = null
  try {
    const response = await getJson<TaskResponse[]>('/api/tasks')
    tasks.value = response.map(fromResponse)
  } catch (cause) {
    error.value = apiErrorMessage(cause)
  } finally {
    loading.value = false
  }
}

// Nach Datum sortiert, bei gleichem Datum nach Priorität
const sortedTasks = computed(() =>
  [...tasks.value].sort(
    (a, b) => a.dueDate.localeCompare(b.dueDate) || rank[a.priority] - rank[b.priority],
  ),
)
const todayTasks = computed(() => sortedTasks.value.filter((t) => t.dueDate === isoDate(0)))
const upcomingTasks = computed(() =>
  sortedTasks.value.filter((t) => t.dueDate > isoDate(0) && t.status !== 'done'),
)

async function addTask(title: string, dueDate: string, priority: Priority): Promise<boolean> {
  error.value = null
  try {
    const created = await sendJson<TaskResponse>('/api/tasks', 'POST', {
      title: title.trim(),
      dueDate,
      priority,
      done: false,
    })
    tasks.value.push(fromResponse(created))
    return true
  } catch (cause) {
    error.value = apiErrorMessage(cause)
    return false
  }
}

async function updateTask(id: number, done: boolean, localStatus?: Task['status']): Promise<boolean> {
  const task = tasks.value.find((t) => t.id === id)
  if (!task) return false

  error.value = null
  try {
    const updated = await sendJson<TaskResponse>(`/api/tasks/${id}`, 'PUT', {
      title: task.title,
      dueDate: task.dueDate,
      priority: task.priority,
      done,
    })
    const mapped = fromResponse(updated)
    if (localStatus) mapped.status = localStatus
    replaceTask(mapped)
    return true
  } catch (cause) {
    error.value = apiErrorMessage(cause)
    return false
  }
}

function toggleTask(id: number): Promise<boolean> {
  const task = tasks.value.find((t) => t.id === id)
  if (!task) return Promise.resolve(false)
  return updateTask(id, task.status !== 'done')
}

function moveTask(id: number, status: Task['status']): Promise<boolean> {
  return updateTask(id, status === 'done', status)
}

async function removeTask(id: number): Promise<boolean> {
  error.value = null
  try {
    await deleteResource(`/api/tasks/${id}`)
    tasks.value = tasks.value.filter((task) => task.id !== id)
    return true
  } catch (cause) {
    error.value = apiErrorMessage(cause)
    return false
  }
}

export function useTasks() {
  return {
    tasks,
    sortedTasks,
    todayTasks,
    upcomingTasks,
    loading,
    error,
    loadTasks,
    addTask,
    toggleTask,
    moveTask,
    removeTask,
  }
}
