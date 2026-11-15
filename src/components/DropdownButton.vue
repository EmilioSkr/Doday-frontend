<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId } from 'vue'

// Button mit Dropdown-Panel. Der Inhalt kommt per Slot, `close` schließt das Panel.
defineProps<{ label: string }>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const panelId = useId()

function close() {
  open.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) close()
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="root" class="dropdown">
    <button
      type="button"
      class="add"
      :aria-expanded="open"
      :aria-controls="panelId"
      @click="open = !open"
    >
      <span aria-hidden="true">+</span> {{ label }}
    </button>
    <div v-if="open" :id="panelId" class="panel">
      <slot :close="close" />
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  position: relative;
}

.add {
  height: 44px;
  padding: 0 18px;
  border: 0;
  border-radius: 10px;
  background: var(--ink);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.panel {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 10;
  width: min(360px, calc(100vw - 32px));
  box-sizing: border-box;
  padding: 16px;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(20, 33, 43, 0.18);
}
</style>
