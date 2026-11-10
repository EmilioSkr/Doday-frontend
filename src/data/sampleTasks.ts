import type { Task } from '@/types/task'

// Beispiel-Entitäten für Milestone 2.
// In Milestone 3 werden sie durch den Aufruf von GET /api/tasks im Backend ersetzt.
export const sampleTasks: Task[] = [
  {
    id: 1,
    title: 'Konzept Modulprojekt abgeben',
    dueDate: '2026-11-02',
    priority: 'MUST_DO',
    status: 'open',
  },
  {
    id: 2,
    title: 'Statistik: Übungsblatt lösen',
    dueDate: '2026-11-03',
    priority: 'MUST_DO',
    status: 'open',
  },
  {
    id: 3,
    title: 'Controlling-Folien durchgehen',
    dueDate: '2026-11-04',
    priority: 'NORMAL',
    status: 'open',
  },
  {
    id: 4,
    title: 'Wäsche waschen',
    dueDate: '2026-11-02',
    priority: 'OPTIONAL',
    status: 'done',
  },
  {
    id: 5,
    title: 'Einkaufen für die Woche',
    dueDate: '2026-11-02',
    priority: 'NORMAL',
    status: 'open',
  },
]
