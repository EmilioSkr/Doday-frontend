export type Priority = 'MUST_DO' | 'NORMAL' | 'OPTIONAL'

export interface Task {
  id: number
  title: string
  dueDate: string
  priority: Priority
  done: boolean
}
