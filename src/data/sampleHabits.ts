import type { Habit } from '@/types/habit'

// Beispieldaten. Später kommen sie vom Backend.
export const sampleHabits: Habit[] = [
  { id: 1, name: '2 Liter Wasser trinken', done: true },
  { id: 2, name: '20 Minuten lesen', done: true },
  { id: 3, name: 'Spaziergang an der frischen Luft', done: true },
  { id: 4, name: 'Vokabeln lernen', done: false },
  { id: 5, name: 'Zimmer aufräumen', done: false },
]
