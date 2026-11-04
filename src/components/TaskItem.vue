<script setup lang="ts">
import type { Priority, Task } from '@/types/task'
import { formatDueDate, priorityLabel } from '@/utils/format'

defineProps<{ task: Task }>()

const emit = defineEmits<{ toggle: [id: number] }>()

const priorityClass: Record<Priority, string> = {
  MUST_DO: 'must',
  NORMAL: 'normal',
  OPTIONAL: 'optional',
}
</script>

<template>
  <li class="task" :class="{ done: task.done }">
    <button
      type="button"
      class="check"
      :aria-pressed="task.done"
      :aria-label="`Erledigt: ${task.title}`"
      @click="emit('toggle', task.id)"
    >
      <span class="box" :class="{ on: task.done }">
        <svg
          v-if="task.done"
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
    <span class="title">{{ task.title }}</span>
    <span class="due">{{ formatDueDate(task.dueDate) }}</span>
    <span class="chip" :class="priorityClass[task.priority]">{{
      priorityLabel(task.priority)
    }}</span>
  </li>
</template>

<style scoped>
.task {
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

.due {
  min-width: 88px;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-soft);
}

.chip {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  margin-right: 8px;
}

.chip.must {
  background: #fbd9c9;
  color: #7c2d0a;
}

.chip.normal {
  background: #dde6ee;
  color: #26394a;
}

.chip.optional {
  background: #e6e9ed;
  color: #424f5b;
}
</style>
