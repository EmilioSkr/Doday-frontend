<script setup lang="ts">
import type { Habit } from '@/types/habit'
import HabitItem from './HabitItem.vue'

defineProps<{ habits: Habit[] }>()

const emit = defineEmits<{ toggle: [id: number] }>()
</script>

<template>
  <ul v-if="habits.length > 0" class="habit-list">
    <HabitItem
      v-for="habit in habits"
      :key="habit.id"
      :habit="habit"
      @toggle="emit('toggle', $event)"
    />
  </ul>
  <p v-else class="empty">Keine Gewohnheiten in dieser Ansicht.</p>
</template>

<style scoped>
.habit-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.empty {
  margin: 0;
  padding: 24px 0;
  text-align: center;
  color: var(--ink-soft);
  font-size: 15px;
}
</style>
