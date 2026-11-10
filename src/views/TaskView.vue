<script setup lang="ts">
import { computed, ref } from 'vue'
import TaskList from '@/components/TaskList.vue'
import TaskBoard from '@/components/TaskBoard.vue'
import { sampleTasks } from '@/data/sampleTasks'
import type { Task, TaskStatus } from '@/types/task'
import { sortTasks } from '@/utils/tasks'

type Filter = 'all' | 'open' | 'done'
type Layout = 'list' | 'board'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'open', label: 'Offen' },
  { value: 'done', label: 'Erledigt' },
]

// Kopie der Beispieldaten, damit die Originale unverändert bleiben
const tasks = ref<Task[]>(sampleTasks.map((task) => ({ ...task })))
const filter = ref<Filter>('all')
const layout = ref<Layout>('list')

const visibleTasks = computed(() =>
  sortTasks(tasks.value).filter(
    (task) =>
      filter.value === 'all' ||
      (filter.value === 'open' ? task.status !== 'done' : task.status === 'done'),
  ),
)

function toggleDone(id: number) {
  const task = tasks.value.find((t) => t.id === id)
  if (task) {
    task.status = task.status === 'done' ? 'open' : 'done'
  }
}

function moveTask(id: number, status: TaskStatus) {
  const task = tasks.value.find((item) => item.id === id)
  if (task) task.status = status
}

function removeTask(id: number) {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}
</script>

<template>
  <section class="view">
    <header>
      <h1>Aufgaben</h1>
    </header>

    <div class="card">
      <div class="card-head">
        <div v-if="layout === 'list'" class="pills">
          <button
            v-for="f in filters"
            :key="f.value"
            type="button"
            class="pill"
            :class="{ on: filter === f.value }"
            :aria-pressed="filter === f.value"
            :data-test="`filter-${f.value}`"
            @click="filter = f.value"
          >
            {{ f.label }}
          </button>
        </div>
        <div class="card-options">
          <div class="layout-toggle" aria-label="Ansicht auswählen">
            <button
              type="button"
              class="layout-button"
              :class="{ on: layout === 'list' }"
              :aria-pressed="layout === 'list'"
              @click="layout = 'list'"
            >
              Liste
            </button>
            <button
              type="button"
              class="layout-button"
              :class="{ on: layout === 'board' }"
              :aria-pressed="layout === 'board'"
              @click="layout = 'board'"
            >
              Board
            </button>
          </div>
        </div>
      </div>
      <TaskBoard
        v-if="layout === 'board'"
        :tasks="sortTasks(tasks)"
        @toggle="toggleDone"
        @move="moveTask"
        @remove="removeTask"
      />
      <TaskList v-else :tasks="visibleTasks" @toggle="toggleDone" />
    </div>
  </section>
</template>

<style scoped>
.card-head {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.pill {
  min-height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid #c9d3dc;
  background: #fff;
  color: #26394a;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.pill.on {
  border-color: var(--ink);
  background: var(--ink);
  color: #fff;
}

.hint {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-soft);
}

.card-options {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-left: auto;
}

.layout-toggle {
  display: flex;
  gap: 4px;
  padding: 3px;
  border-radius: 9px;
  background: #edf1f4;
}

.layout-button {
  min-height: 36px;
  padding: 0 12px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.layout-button.on {
  background: #fff;
  color: var(--ink);
  box-shadow: 0 1px 3px rgb(20 33 43 / 14%);
}
</style>
