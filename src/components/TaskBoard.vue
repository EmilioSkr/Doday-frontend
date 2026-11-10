<script setup lang="ts">
import { computed } from 'vue'
import TaskList from './TaskList.vue'
import type { Task, TaskStatus } from '@/types/task'

// Board wie bei Jira: eine Spalte pro Status
const props = defineProps<{ tasks: Task[] }>()

const emit = defineEmits<{
  toggle: [id: number]
  remove: [id: number]
  move: [id: number, status: TaskStatus]
}>()

const columns = computed(() => [
  {
    key: 'open' as const,
    title: 'Offen',
    tasks: props.tasks.filter((task) => task.status === 'open'),
    empty: 'Nichts mehr offen.',
  },
  {
    key: 'inProgress' as const,
    title: 'In Bearbeitung',
    tasks: props.tasks.filter((task) => task.status === 'inProgress'),
    empty: 'Keine Aufgaben in Bearbeitung.',
  },
  {
    key: 'done' as const,
    title: 'Erledigt',
    tasks: props.tasks.filter((task) => task.status === 'done'),
    empty: 'Noch nichts erledigt.',
  },
])

function moveTask(id: number, status: TaskStatus) {
  emit('move', id, status)
}
</script>

<template>
  <div class="board">
    <section v-for="column in columns" :key="column.key" class="column">
      <h2>
        {{ column.title }} <span class="count">{{ column.tasks.length }}</span>
      </h2>
      <TaskList
        :tasks="column.tasks"
        show-due
        removable
        :show-work-action="column.key !== 'done'"
        :empty-text="column.empty"
        @toggle="$emit('toggle', $event)"
        @remove="$emit('remove', $event)"
        @move="moveTask"
      />
    </section>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
  align-items: start;
}

.column {
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 20px;
}

h2 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 800;
}

.count {
  min-width: 24px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--line);
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}
</style>
