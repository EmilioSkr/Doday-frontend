<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AddHabitForm from '@/components/AddHabitForm.vue'
import AddTaskForm from '@/components/AddTaskForm.vue'
import DropdownButton from '@/components/DropdownButton.vue'
import HabitList from '@/components/HabitList.vue'
import TaskList from '@/components/TaskList.vue'
import { useHabits } from '@/composables/useHabits'
import { useTasks } from '@/composables/useTasks'
import { lastSevenDayLabels, todayLong } from '@/utils/date'

const { todayTasks, upcomingTasks, toggleTask } = useTasks()
const { habits, total, doneCount, allDone, percent, streak, longestStreak, hint, toggleHabit } =
  useHabits()

const labels = lastSevenDayLabels()
</script>

<template>
  <section class="view">
    <header>
      <p class="eyebrow">{{ todayLong() }}</p>
      <h1>Dein Tag im Überblick</h1>
    </header>

    <div class="grid small">
      <section class="flame-card">
        <p class="flame-title">Deine Flammen</p>
        <p class="streak">
          <span class="streak-number">{{ streak }}</span> Tage in Folge
        </p>
        <div class="days" aria-label="Diese Woche">
          <div v-for="(label, i) in labels" :key="i" class="day">
            <span class="circle" :class="{ on: i < 6 || allDone }" />
            <span>{{ label }}</span>
          </div>
        </div>
        <p class="small-text">Längster Streak: {{ longestStreak }} Tage</p>
      </section>

      <section class="card">
        <p class="card-label">Gewohnheiten heute</p>
        <p class="progress-number">{{ doneCount }} von {{ total }}</p>
        <div class="bar">
          <div class="bar-fill" :style="{ width: percent + '%' }" />
        </div>
        <p class="hint">{{ hint }}</p>
      </section>
    </div>

    <div class="grid">
      <section class="card">
        <div class="card-head">
          <h2>Aufgaben für heute</h2>
          <DropdownButton label="Aufgabe" v-slot="{ close }">
            <AddTaskForm autofocus @added="close" />
          </DropdownButton>
        </div>
        <TaskList
          :tasks="todayTasks"
          empty-text="Für heute ist nichts geplant."
          @toggle="toggleTask"
        />
        <RouterLink to="/tasks" class="link">Alle Aufgaben ansehen</RouterLink>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Gewohnheiten</h2>
          <DropdownButton label="Gewohnheit" v-slot="{ close }">
            <AddHabitForm autofocus @added="close" />
          </DropdownButton>
        </div>
        <HabitList
          :habits="habits"
          empty-text="Noch keine Gewohnheiten angelegt."
          @toggle="toggleHabit"
        />
        <RouterLink to="/habits" class="link">Alle Gewohnheiten ansehen</RouterLink>
      </section>

      <section class="card">
        <div class="card-head">
          <h2>Demnächst</h2>
        </div>
        <TaskList
          :tasks="upcomingTasks"
          show-due
          empty-text="Keine weiteren offenen Aufgaben."
          @toggle="toggleTask"
        />
      </section>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 16px;
  align-items: start;
}

.grid.small {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.flame-card {
  background: var(--flame);
  color: #fff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.flame-title {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}

.streak {
  margin: 0;
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}

.streak-number {
  font-size: 52px;
  font-weight: 800;
  line-height: 1;
}

.days {
  display: flex;
  gap: 6px;
}

.day {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
}

.circle {
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  border-radius: 999px;
  border: 2px dashed #fff;
}

.circle.on {
  background: #fff;
  border-style: solid;
}

.small-text {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
}

.card-label {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: var(--ink-soft);
}

.progress-number {
  margin: 0;
  font-size: 40px;
  font-weight: 800;
  line-height: 1.1;
}

.bar {
  height: 10px;
  border-radius: 999px;
  background: var(--line);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--teal);
}

.hint {
  margin: 0;
  font-size: 14px;
  color: var(--ink-soft);
}

.card-head {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
}

.card-head h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
}
</style>
