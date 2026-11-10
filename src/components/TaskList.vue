<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import type { Task } from '@/types/task'

// type Layout = 'list' | 'board'
// type BoardStatus = 'todo' | 'inProgress' | 'done'

withDefaults(
  defineProps<{
    tasks: Task[]
    showDue?: boolean
    removable?: boolean
    emptyText?: string
  }>(),
  {
    showDue: false,
    removable: false,
    emptyText: 'Keine Aufgaben in dieser Ansicht.',
  },
)

defineEmits<{ toggle: [id: number]; remove: [id: number] }>()

/*
const columns: { status: BoardStatus; title: string }[] = [
  { status: 'todo', title: 'Zu erledigen' },
  { status: 'inProgress', title: 'In Bearbeitung' },
  { status: 'done', title: 'Erledigt' },
]

const boardColumns = computed(() =>
  columns.map((column) => ({
    ...column,
    tasks: props.tasks.filter(
      (task) => (props.statuses[task.id] ?? (task.done ? 'done' : 'todo')) === column.status,
    ),
  })),
)

function moveTask(id: number, status: BoardStatus) {
  emit('move', id, status)
}
 */
</script>

<template>
  <ul v-if="tasks.length > 0" class="list">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :show-due="showDue"
      :removable="removable"
      @toggle="$emit('toggle', $event)"
      @remove="$emit('remove', $event)"
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
