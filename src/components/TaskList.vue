<script setup lang="ts">
import type { Task } from '@/types/task'
import TaskItem from './TaskItem.vue'

defineProps<{ tasks: Task[] }>()

const emit = defineEmits<{ toggle: [id: number] }>()
</script>

<template>
  <ul v-if="tasks.length > 0" class="task-list">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" @toggle="emit('toggle', $event)" />
  </ul>
  <p v-else class="empty">Keine Aufgaben in dieser Ansicht.</p>
</template>

<style scoped>
.task-list {
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
