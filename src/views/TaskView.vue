<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AddTaskForm from '@/components/AddTaskForm.vue'
import DropdownButton from '@/components/DropdownButton.vue'
import TaskBoard from '@/components/TaskBoard.vue'
import TaskList from '@/components/TaskList.vue'
import { useTasks } from '@/composables/useTasks'

type Filter = 'all' | 'open' | 'done'
type Layout = 'list' | 'board'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'open', label: 'Offen' },
  { value: 'done', label: 'Erledigt' },
]

const { sortedTasks, loading, error: apiError, loadTasks, toggleTask, moveTask, removeTask } =
  useTasks()
const filter = ref<Filter>('all')
const layout = ref<Layout>('list')

const visibleTasks = computed(() =>
  sortedTasks.value.filter(
    (task) =>
      filter.value === 'all' ||
      (filter.value === 'open' ? task.status !== 'done' : task.status === 'done'),
  ),
)

onMounted(() => {
  void loadTasks()
})

// Steuerung für das Dropdown-Formular
const isAddFormOpen = ref(false)
const closeForm = () => {
  isAddFormOpen.value = false
}
</script>

<template>
  <section class="view">
    <p v-if="apiError" role="alert" class="api-error">{{ apiError }}</p>
    <p v-if="loading" role="status">Aufgaben werden geladen …</p>
    <header class="page-head">
      <div>
        <p class="eyebrow">Tagesplanung</p>
        <h1>Aufgaben</h1>
      </div>
      <DropdownButton
        label="Aufgabe hinzufügen"
        :open="isAddFormOpen"
        @toggle="isAddFormOpen = !isAddFormOpen"
        v-slot="{ close }"
      >
        <AddTaskForm
          autofocus
          @added="
            () => {
              close?.()
              closeForm()
            }
          "
        />
      </DropdownButton>
    </header>

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
      <div v-else></div>

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
      :tasks="sortedTasks"
      @toggle="toggleTask"
      @move="moveTask"
      @remove="removeTask"
    />

    <section v-else class="card">
      <TaskList
        :tasks="visibleTasks"
        show-due
        removable
        empty-text="Keine Aufgaben in dieser Ansicht."
        @toggle="toggleTask"
        @remove="removeTask"
      />
    </section>
  </section>
</template>

<style scoped>
.card-head {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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
