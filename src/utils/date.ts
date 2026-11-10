const pad = (n: number) => String(n).padStart(2, '0')

// Datum als "YYYY-MM-DD", offsetDays = Tage ab heute
export function isoDate(offsetDays = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

// "2026-11-08" -> "Heute", "Morgen" oder "10.11."
export function formatDue(iso: string): string {
  if (iso === isoDate(0)) return 'Heute'
  if (iso === isoDate(1)) return 'Morgen'
  const match = /^\d{4}-(\d{2})-(\d{2})$/.exec(iso)
  return match ? `${match[2]}.${match[1]}.` : iso
}

// z. B. "Sonntag, 8. November"
export function todayLong(): string {
  return new Date().toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

// Wochentags-Kürzel der letzten sieben Tage, der letzte ist heute
export function lastSevenDayLabels(): string[] {
  const names = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    return names[d.getDay()] ?? ''
  })
}
