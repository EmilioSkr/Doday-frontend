<script setup lang="ts">
import CheckButton from './CheckButton.vue'
import type { Habit } from '@/types/habit'

withDefaults(defineProps<{ habit: Habit; showWeek?: boolean }>(), {
  showWeek: false,
})

defineEmits<{ toggle: [id: number] }>()
</script>

<template>
  <li class="row">
    <CheckButton
      :checked="habit.done"
      :label="`${habit.name} für heute abhaken`"
      @toggle="$emit('toggle', habit.id)"
    />
    <span class="name">{{ habit.name }}</span>
    <!-- Beispielverlauf: sechs erledigte Tage und heute -->
    <span v-if="showWeek" class="week" aria-label="Letzte sieben Tage">
      <span
        v-for="day in 7"
        :key="day"
        class="dot"
        :class="{ on: day < 7 || habit.done, today: day === 7 }"
      />
    </span>
  </li>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  border-top: 1px solid #edf1f4;
  list-style: none;
}

.name {
  flex: 1 1 180px;
  min-width: 0;
  font-size: 15px;
  font-weight: 600;
}

.week {
  display: flex;
  gap: 6px;
  padding-right: 8px;
}

.dot {
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border-radius: 999px;
  border: 2px solid #9aa9b6;
  background: #fff;
}

.dot.on {
  background: var(--teal);
  border-color: var(--teal);
}
</style>
