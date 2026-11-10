export type Priority = 'MUST_DO' | 'NORMAL' | 'OPTIONAL'
export type TaskStatus = 'open' | 'inProgress' | 'done'

export interface Task {
  id: number
  title: string
  dueDate: string
  priority: Priority
  status: TaskStatus
}
