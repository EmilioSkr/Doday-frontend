<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import type { Task, TaskStatus } from '@/types/task'

withDefaults(
  defineProps<{
    tasks: Task[]
    showDue?: boolean
    removable?: boolean
    showWorkAction?: boolean
    emptyText?: string
  }>(),
  {
    showDue: false,
    removable: false,
    showWorkAction: false,
    emptyText: 'Keine Aufgaben in dieser Ansicht.',
  },
)

const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
  move: [id: number, status: TaskStatus]
}>()

function moveTask(id: number, status: TaskStatus) {
  emit('move', id, status)
}
</script>

<template>
  <ul v-if="tasks.length > 0" class="list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :show-due="showDue"
      :removable="removable"
      :show-work-action="showWorkAction"
      @toggle="$emit('toggle', $event)"
      @remove="$emit('remove', $event)"
      @move="moveTask"
    />
  </ul>
  <p v-else class="empty">{{ emptyText }}</p>
</template>

<style scoped>
.list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.empty {
  margin: 0;
  padding: 16px 0;
  text-align: center;
  color: var(--ink-soft);
  font-size: 15px;
}
</style>
