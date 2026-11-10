<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTasks } from '@/composables/useTasks'
import type { Priority } from '@/types/task'
import { isoDate } from '@/utils/date'

const props = defineProps<{ autofocus?: boolean }>()
const emit = defineEmits<{ added: [] }>()
const { addTask } = useTasks()

const title = ref('')
const dueDate = ref(isoDate(1))
const priority = ref<Priority>('NORMAL')
const error = ref(false)
const titleInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (props.autofocus) titleInput.value?.focus()
})

function submit() {
  if (!title.value.trim()) {
    error.value = true
    return
  }
  addTask(title.value, dueDate.value, priority.value)
  title.value = ''
  emit('added')
}
</script>

<template>
  <form class="form" novalidate @submit.prevent="submit">
    <div class="field">
      <label for="task-title">Titel</label>
      <input
        id="task-title"
        ref="titleInput"
        v-model="title"
        type="text"
        placeholder="Was steht an?"
        :aria-invalid="error"
        :class="{ invalid: error }"
        @input="error = false"
      />
    </div>
    <div class="field">
      <label for="task-due">Fällig am</label>
      <input id="task-due" v-model="dueDate" type="date" />
    </div>
    <div class="field">
      <label for="task-prio">Priorität</label>
      <select id="task-prio" v-model="priority">
        <option value="MUST_DO">Must-Do</option>
        <option value="NORMAL">Normal</option>
        <option value="OPTIONAL">Optional</option>
      </select>
    </div>
    <p v-if="error" role="alert" class="error">Der Titel darf nicht leer sein.</p>
    <button type="submit" class="submit">Aufgabe hinzufügen</button>
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

input,
select {
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
