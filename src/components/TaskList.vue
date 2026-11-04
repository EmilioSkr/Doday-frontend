<script setup lang="ts">
import { computed } from 'vue'
import type { Task } from '@/types/task'
import { formatDueDate, priorityLabel } from '@/utils/format'
import TaskItem from './TaskItem.vue'

type Layout = 'list' | 'board'
type BoardStatus = 'todo' | 'inProgress' | 'done'

const props = withDefaults(
  defineProps<{
    tasks: Task[]
    layout?: Layout
    statuses?: Record<number, BoardStatus>
  }>(),
  { layout: 'list', statuses: () => ({}) },
)

const emit = defineEmits<{
  toggle: [id: number]
  move: [id: number, status: BoardStatus]
}>()

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
</script>

<template>
  <template v-if="layout === 'list'">
    <ul v-if="tasks.length > 0" class="task-list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="emit('toggle', $event)"
      />
    </ul>
    <p v-else class="empty">Keine Aufgaben in dieser Ansicht.</p>
  </template>

  <div v-else class="board">
    <section
      v-for="(column, columnIndex) in boardColumns"
      :key="column.status"
      class="board-column"
    >
      <h2 class="column-title">
        {{ column.title }} <span class="count">{{ column.tasks.length }}</span>
      </h2>
      <ul class="board-tasks">
        <li v-for="task in column.tasks" :key="task.id" class="task-card">
          <div class="task-card-head">
            <span class="task-title">{{ task.title }}</span>
            <span class="chip" :class="task.priority.toLowerCase()">{{
              priorityLabel(task.priority)
            }}</span>
          </div>
          <span class="due">{{ formatDueDate(task.dueDate) }}</span>
          <div class="card-actions">
            <button
              v-if="columnIndex > 0"
              type="button"
              class="move-button"
              :aria-label="`'${task.title}' nach ${columns[columnIndex - 1]!.title} verschieben`"
              @click="moveTask(task.id, columns[columnIndex - 1]!.status)"
            >
              ← Zurück
            </button>
            <button
              v-if="columnIndex < columns.length - 1"
              type="button"
              class="move-button"
              :aria-label="`'${task.title}' nach ${columns[columnIndex + 1]!.title} verschieben`"
              @click="moveTask(task.id, columns[columnIndex + 1]!.status)"
            >
              Weiter →
            </button>
          </div>
        </li>
      </ul>
      <p v-if="column.tasks.length === 0" class="column-empty">Keine Aufgaben</p>
    </section>
  </div>
</template>

<style scoped>
.task-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  align-items: start;
}

.board-column {
  min-width: 0;
  min-height: 180px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #f7f9fa;
}

.column-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 800;
}

.count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #e5eaee;
  color: var(--ink-soft);
  font-size: 12px;
}

.board-tasks {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.task-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 1px 2px rgb(20 33 43 / 6%);
}

.task-card-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.task-title {
  min-width: 0;
  font-size: 14px;
  font-weight: 700;
  overflow-wrap: anywhere;
}

.chip {
  flex: 0 0 auto;
  padding: 3px 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.chip.must_do {
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

.due {
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 600;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.move-button {
  min-height: 36px;
  padding: 0 8px;
  border: 0;
  border-radius: 6px;
  background: #edf1f4;
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.move-button:hover {
  background: #dde6ee;
}

.column-empty {
  margin: 0;
  padding: 16px 4px;
  color: var(--ink-soft);
  font-size: 13px;
  text-align: center;
}

.empty {
  margin: 0;
  padding: 24px 0;
  text-align: center;
  color: var(--ink-soft);
  font-size: 15px;
}

@media (max-width: 720px) {
  .board {
    grid-template-columns: 1fr;
  }
}
</style>
