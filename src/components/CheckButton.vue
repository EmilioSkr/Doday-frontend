<script setup lang="ts">
defineProps<{ checked: boolean; label: string }>()
defineEmits<{ toggle: [] }>()
</script>

<template>
  <button
    type="button"
    class="check"
    :aria-pressed="checked"
    :aria-label="label"
    @click="$emit('toggle')"
  >
    <span class="box" :class="{ on: checked }">
      <svg
        v-if="checked"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="5 12 10 17 19 7" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
.check {
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.box {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  border: 2px solid #7c8b98;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box.on {
  background: var(--teal);
  border-color: var(--teal);
}
</style>
