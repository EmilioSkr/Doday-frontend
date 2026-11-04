<script setup lang="ts">
type Task = { id: number; title: string; dueDate: string; priority: string }
const tasks: Task[] = [
  { id: 1, title: 'Konzept abgeben', dueDate: '2026-11-02', priority: 'MUST_DO' },
  { id: 2, title: 'Statistik-Übungsblatt', dueDate: '2026-11-03', priority: 'MUST_DO' },
  { id: 3, title: 'Controlling-Folien', dueDate: '2026-11-04', priority: 'NORMAL' },
]
</script>

<template>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      {{ task.title }} – {{ task.dueDate }} ({{ task.priority }})
    </li>
  </ul>
</template>
