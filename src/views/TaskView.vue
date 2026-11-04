<script setup lang="ts">
import { computed, ref } from 'vue'
import TaskList from '@/components/TaskList.vue'
import { sampleTasks } from '@/data/sampleTasks'
import type { Task } from '@/types/task'
import { sortTasks } from '@/utils/tasks'

type Filter = 'all' | 'open' | 'done'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'open', label: 'Offen' },
  { value: 'done', label: 'Erledigt' },
]

// Kopie der Beispieldaten, damit die Originale unverändert bleiben
const tasks = ref<Task[]>(sampleTasks.map((task) => ({ ...task })))
const filter = ref<Filter>('all')

const visibleTasks = computed(() =>
  sortTasks(tasks.value).filter(
    (task) => filter.value === 'all' || (filter.value === 'open' ? !task.done : task.done),
  ),
)

function toggleDone(id: number) {
  const task = tasks.value.find((t) => t.id === id)
  if (task) {
    task.done = !task.done
  }
}
</script>

<template>
  <section class="view">
    <header>
      <h1>Aufgaben</h1>
    </header>

    <div class="card">
      <div class="card-head">
        <div class="pills">
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
        <p class="hint">Sortiert nach Datum und Priorität</p>
      </div>
      <TaskList :tasks="visibleTasks" @toggle="toggleDone" />
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
</style>
