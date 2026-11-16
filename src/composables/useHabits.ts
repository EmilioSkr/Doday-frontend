import { computed, ref } from 'vue'
import type { Habit } from '@/types/habit'
import { apiErrorMessage, getJson, sendJson } from '@/utils/api'

interface HabitResponse {
  id: number
  name: string
  done: boolean
}

const habits = ref<Habit[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function loadHabits() {
  loading.value = true
  error.value = null
  try {
    habits.value = await getJson<HabitResponse[]>('/api/habits')
  } catch (cause) {
    error.value = apiErrorMessage(cause)
  } finally {
    loading.value = false
  }
}

// Beispielwerte, die Streaks werden später im Backend berechnet.
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

async function addHabit(name: string): Promise<boolean> {
  error.value = null
  try {
    const created = await sendJson<HabitResponse>('/api/habits', 'POST', {
      name: name.trim(),
      done: false,
    })
    habits.value.push(created)
    return true
  } catch (cause) {
    error.value = apiErrorMessage(cause)
    return false
  }
}

async function toggleHabit(id: number): Promise<boolean> {
  const habit = habits.value.find((h) => h.id === id)
  if (!habit) return false

  error.value = null
  try {
    const updated = await sendJson<HabitResponse>(`/api/habits/${id}`, 'PUT', {
      name: habit.name,
      done: !habit.done,
    })
    const index = habits.value.findIndex((item) => item.id === id)
    if (index !== -1) habits.value[index] = updated
    return true
  } catch (cause) {
    error.value = apiErrorMessage(cause)
    return false
  }
}

export function useHabits() {
  return {
    habits,
    loading,
    error,
    loadHabits,
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
