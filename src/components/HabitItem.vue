<script setup lang="ts">
import type { Habit } from '@/types/habit'

defineProps<{ habit: Habit }>()

const emit = defineEmits<{ toggle: [id: number] }>()
</script>

<template>
  <li class="habit" :class="{ done: habit.done }">
    <button
      type="button"
      class="check"
      :aria-pressed="habit.done"
      :aria-label="`Erledigt: ${habit.title}`"
      @click="emit('toggle', habit.id)"
    >
      <span class="box" :class="{ on: habit.done }">
        <svg
          v-if="habit.done"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          stroke-width="3.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <polyline points="5 12 10 17 19 7" />
        </svg>
      </span>
    </button>
    <span class="title">{{ habit.title }}</span>
  </li>
</template>

<style scoped>
.habit {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
  border-top: 1px solid #edf1f4;
  list-style: none;
}

.check {
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.box {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 2px solid #7c8b98;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box.on {
  background: var(--teal);
  border-color: var(--teal);
}

.title {
  flex: 1 1 200px;
  min-width: 0;
  font-size: 15px;
  font-weight: 600;
}

.done .title {
  text-decoration: line-through;
  color: #5b6b78;
}
</style>
