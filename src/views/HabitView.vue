<script setup lang="ts">
import HabitList from '@/components/HabitList.vue'
import AddHabitForm from '@/components/AddHabitForm.vue'
import DropdownButton from '@/components/DropdownButton.vue'
import { useHabits } from '@/composables/useHabits'

const { habits, total, doneCount, percent, streak, longestStreak, hint, toggleHabit } = useHabits()
</script>

<template>
  <section class="view">
    <header class="page-head">
      <div>
        <p class="eyebrow">Jeden Tag ein Stück</p>
        <h1>Gewohnheiten und Flammen</h1>
      </div>
      <DropdownButton label="Gewohnheit hinzufügen" v-slot="{ close }">
        <AddHabitForm autofocus @added="close" />
      </DropdownButton>
    </header>

    <section class="card">
      <HabitList
        :habits="habits"
        show-week
        empty-text="Noch keine Gewohnheiten angelegt."
        @toggle="toggleHabit"
      />
    </section>
  </section>
</template>
