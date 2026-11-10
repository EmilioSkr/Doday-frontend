<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useHabits } from '@/composables/useHabits'

const props = defineProps<{ autofocus?: boolean }>()
const emit = defineEmits<{ added: [] }>()
const { addHabit } = useHabits()

const name = ref('')
const error = ref(false)
const nameInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (props.autofocus) nameInput.value?.focus()
})

function submit() {
  if (!name.value.trim()) {
    error.value = true
    return
  }
  addHabit(name.value)
  name.value = ''
  emit('added')
}
</script>

<template>
  <form class="form" novalidate @submit.prevent="submit">
    <div class="field">
      <label for="habit-name">Name der Gewohnheit</label>
      <input
        id="habit-name"
        ref="nameInput"
        v-model="name"
        type="text"
        placeholder="z. B. 10 Minuten dehnen"
        :aria-invalid="error"
        :class="{ invalid: error }"
        @input="error = false"
      />
    </div>
    <p v-if="error" role="alert" class="error">Der Name darf nicht leer sein.</p>
    <button type="submit" class="submit">Gewohnheit hinzufügen</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 13px;
  font-weight: 700;
  color: var(--ink-soft);
}

input {
  height: 44px;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid #9aa9b6;
  border-radius: 10px;
  font: inherit;
  font-size: 15px;
  background: #fff;
  color: var(--ink);
}

input.invalid {
  border: 2px solid #b42318;
}

.error {
  margin: 0;
  padding: 10px 14px;
  border-radius: 10px;
  background: #fbe3e0;
  color: #8a1c12;
  font-size: 14px;
  font-weight: 600;
}

.submit {
  height: 44px;
  border: 0;
  border-radius: 10px;
  background: var(--ink);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}
</style>
