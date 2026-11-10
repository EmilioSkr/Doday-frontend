import { computed, ref } from 'vue'
import { sampleHabits } from '@/data/sampleHabits'
import type { Habit } from '@/types/habit'

// Kopie der Beispieldaten, damit die Originale unverändert bleiben
const habits = ref<Habit[]>(sampleHabits.map((h) => ({ ...h })))
let nextId = Math.max(0, ...sampleHabits.map((h) => h.id)) + 1

// Beispielwerte, die Streaks werden später im Backend berechnet
const baseStreak = 12
const longestStreak = 21

const total = computed(() => habits.value.length)
const doneCount = computed(() => habits.value.filter((h) => h.done).length)
const remaining = computed(() => total.value - doneCount.value)
const allDone = computed(() => total.value > 0 && remaining.value === 0)
const percent = computed(() =>
  total.value === 0 ? 0 : Math.round((doneCount.value / total.value) * 100),
)
const streak = computed(() => baseStreak + (allDone.value ? 1 : 0))
const hint = computed(() =>
  allDone.value
    ? 'Heute ist alles erledigt.'
    : `Noch ${remaining.value} Gewohnheit${remaining.value === 1 ? '' : 'en'} bis zur nächsten Flamme.`,
)

function addHabit(name: string) {
  habits.value.push({ id: nextId++, name: name.trim(), done: false })
}

function toggleHabit(id: number) {
  const habit = habits.value.find((h) => h.id === id)
  if (habit) habit.done = !habit.done
}

export function useHabits() {
  return {
    habits,
    total,
    doneCount,
    allDone,
    percent,
    streak,
    longestStreak,
    hint,
    addHabit,
    toggleHabit,
  }
}
