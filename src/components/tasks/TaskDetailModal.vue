<template>
  <div v-if="selectedTask">
    <h3 class="text-lg font-bold mt-2 ">{{ selectedTask?.title }}</h3>
    <p class="text-gray-600 mt-2">{{ selectedTask?.description }}</p>
    <p class="text-blue-600 mt-2">Categorías: {{ selectedTask?.categories?.join(', ') }}</p>
    <p class="text-green-600 mt-2">Fecha de Inicio: {{ selectedTask?.startDate }}</p>
    <p class="text-red-600 mt-2">Fecha de Vencimiento: {{ selectedTask?.dueDate }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../interfaces/Task';

defineProps({
  selectedTask: {
    type: Object as () => Task | null,
    required: true,
  },
});
</script>
