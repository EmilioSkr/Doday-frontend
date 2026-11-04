<script setup lang="ts">
import { ref } from 'vue'
import HabitList from '@/components/HabitList.vue'
import { sampleHabits } from '@/data/sampleHabits'
import type { Habit } from '@/types/habit'

const habits = ref<Habit[]>(sampleHabits.map((habit) => ({ ...habit })))

function toggleDone(id: number) {
  const habit = habits.value.find((item) => item.id === id)
  if (habit) {
    habit.done = !habit.done
  }
}
</script>

<template>
  <section class="view">
    <header>
      <h1>Gewohnheiten</h1>
    </header>

    <div class="card">
      <HabitList :habits="habits" @toggle="toggleDone" />
    </div>
  </section>
</template>
