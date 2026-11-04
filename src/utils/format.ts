import type { Priority } from '@/types/task'

const priorityLabels: Record<Priority, string> = {
  MUST_DO: 'Must-Do',
  NORMAL: 'Normal',
  OPTIONAL: 'Optional',
}

export function priorityLabel(priority: Priority): string {
  return priorityLabels[priority]
}

// "2026-11-02" -> "02.11.2026" (ungültige Werte bleiben unverändert)
export function formatDueDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso)
  if (!match) {
    return iso
  }
  return `${match[3]}.${match[2]}.${match[1]}`
}
