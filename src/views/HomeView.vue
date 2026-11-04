<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { quotes } from '@/data/quotes'
import { pickQuote } from '@/utils/quotes'

const day = Math.floor(Date.now() / 86400000)
const offset = ref(0)
const quote = computed(() => pickQuote(quotes, day, offset.value))

function nextQuote() {
  offset.value++
}
</script>

<template>
  <section class="view">
    <header>
      <p class="eyebrow">Willkommen bei Doday</p>
      <h1>Dein Tag im Überblick</h1>
    </header>

    <div class="mascot-card" aria-label="Zitat des Tages">
    <div class="bubble">
      <p class="quote">„{{ quote.text }}“</p>
      <p class="quote-by">– {{ quote.author }}</p>
      <button type="button" class="link" @click="nextQuote">Neues Zitat</button>
    </div>
    </div>

    <RouterLink to="/tasks" class="cta">Zu den Aufgaben</RouterLink>
  </section>
</template>

<style scoped>
.mascot-card {
  display: flex;
  align-items: center;
  gap: 22px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 18px 20px;
}

.bubble {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #fff4ec;
  border: 1px solid #f5cbb0;
  border-radius: 16px;
  padding: 14px 18px 6px;
}

.bubble::before {
  content: '';
  position: absolute;
  left: -9px;
  top: 34px;
  width: 16px;
  height: 16px;
  background: #fff4ec;
  border-left: 1px solid #f5cbb0;
  border-bottom: 1px solid #f5cbb0;
  transform: rotate(45deg);
}

.quote {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
}

.quote-by {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: #7c2d0a;
}

.bubble .link {
  align-self: flex-start;
}

.cta {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 10px;
  background: var(--ink);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
}

@media (max-width: 480px) {
  .mascot-card {
    gap: 16px;
    padding: 14px;
  }
}
</style>
