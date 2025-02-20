<template>
  <div class="flex items-center justify-between p-4">
    <div class="flex-col">
      <p tabindex="0" class="focus:outline-none text-xl sm:text-4xl font-bold leading-normal text-gray-800">
        Gestor de Tareas
      </p>
      <p class="text-gray-600 text-medium mt-1">Tareas pendientes: {{ taskCount }} </p>
    </div>
    <div class="flex gap-4">
      <button @click="openModal"
        class="focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-700 hover:bg-indigo-600 text-white rounded">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Agregar tarea
      </button>
      <button @click="confirmClearTasks"
        class="focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-center sm:px-4 px-4 py-2 bg-red-700 hover:bg-red-500 text-white rounded">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
          stroke="currentColor" class="sm:size-6 size-5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        Limpiar Tareas
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  taskCount: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['openModal', 'confirmClearTasks']);

const openModal = () => {
  emit('openModal');
};

const confirmClearTasks = () => {
  emit('confirmClearTasks');
};
</script>
