<script setup lang="ts">
import CheckButton from './CheckButton.vue'
import type { Priority, Task } from '@/types/task'
import { formatDue } from '@/utils/date'

withDefaults(defineProps<{ task: Task; showDue?: boolean; removable?: boolean }>(), {
  showDue: false,
  removable: false,
})

defineEmits<{ toggle: [id: number]; remove: [id: number] }>()

const prio: Record<Priority, { label: string; cls: string }> = {
  MUST_DO: { label: 'Must-Do', cls: 'must' },
  NORMAL: { label: 'Normal', cls: 'normal' },
  OPTIONAL: { label: 'Optional', cls: 'optional' },
}
</script>

<template>
  <li class="row" :class="{ done: task.done }">
    <CheckButton
      :checked="task.done"
      :label="`${task.title} erledigt`"
      @toggle="$emit('toggle', task.id)"
    />
    <span class="title">{{ task.title }}</span>
    <span v-if="showDue" class="due">{{ formatDue(task.dueDate) }}</span>
    <span class="chip" :class="prio[task.priority].cls">{{ prio[task.priority].label }}</span>
    <button
      v-if="removable"
      type="button"
      class="remove"
      :aria-label="`${task.title} löschen`"
      @click="$emit('remove', task.id)"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M4 7h16" />
        <path d="M9 7V4h6v3" />
        <path d="M6 7l1 13h10l1-13" />
      </svg>
    </button>
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

.title {
  flex: 1 1 180px;
  min-width: 0;
  font-size: 15px;
  font-weight: 600;
}

.done .title {
  text-decoration: line-through;
  color: #5b6b78;
}

.due {
  min-width: 64px;
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-soft);
}

.chip {
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  margin-right: 4px;
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

.remove {
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5b6b78;
  cursor: pointer;
}
</style>
