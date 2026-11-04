<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav class="sidebar" aria-label="Hauptnavigation">
      <RouterLink to="/" class="brand">
        <span>Doday</span>
      </RouterLink>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Dashboard</RouterLink>
        <RouterLink to="/tasks" class="nav-link">Aufgaben</RouterLink>
      </div>
    </nav>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
}

.sidebar {
  flex: 1 1 248px;
  padding: 24px 16px;
  background: var(--ink);
  color: #e7edf2;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content {
  flex: 999 1 560px;
  min-width: 0;
  padding: 28px 24px 40px;
}

@media (min-width: 900px) {
  .sidebar {
    flex: 0 0 248px;
    position: sticky;
    top: 0;
    height: 100vh;
    align-self: flex-start;
  }
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 8px;
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -0.01em;
  text-decoration: none;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #c9d4dd;
  text-decoration: none;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.08);
}

.nav-link.router-link-exact-active {
  background: var(--bg);
  color: var(--ink);
}
</style>
