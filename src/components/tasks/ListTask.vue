<template>
  <button v-if="selectedCategory !== 'Todas'" @click="clearSection"
    class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer">
    Limpiar Sección
  </button>
  <div v-if="tasks.length" class="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="task in tasks" :key="task.id" @click="$emit('task-selected', task)"
      class="border border-gray-200 rounded-lg p-4 shadow-lg">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-semibold text-gray-800">{{ task.title }}</h3>
        <div class="flex gap-2">
          <button @click.stop="openEditModal(task)" class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
          </button>
          <button @click.stop="confirmDeleteTask(task.id)" class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      </div>

      <p class="text-sm text-gray-600 mb-1">
        {{ task.description }}
      </p>
      <div class="text-sm text-gray-600 mb-1">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
          </svg>
          {{ task.categories?.join(", ") || "Sin categoría" }}
        </div>
      </div>

      <div class="flex gap-3">
        <div class="flex mt-2 text-green-800">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
          </svg>

          <p class="text-green-800 ml-0.5">{{ task.startDate }}</p>
        </div>
        <p class="mt-2">-</p>

        <div class="flex mt-2 text-red-800">
          <p class="text-red-800">{{ task.dueDate }}</p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
          </svg>


        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-gray-600 text-medium italic mt-4">No hay tareas pendientes.</div>

  <ModalForm :isOpen="isModalOpen" title="Editar Tarea" @close="closeModal">
    <form @submit.prevent="confirmSaveTask" class="mt-4">
      <div class="space-y-2">
        <label for="title" class="block text-sm font-medium text-gray-700">Título</label>
        <input v-model="editTask.title" id="title" type="text" required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
      </div>
      <div class="space-y-2 mt-2">
        <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea v-model="editTask.description" id="description" type="text" required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
      </div>

      <div class="space-y-2 mt-2">
        <label class="block text-sm font-medium text-gray-700">Categorías</label>
        <div class="overflow-y-auto max-h-28 border border-gray-300 rounded p-2">
          <div v-for="tag in tagStore.tags" :key="tag.id" class="flex items-center">
            <input type="checkbox" :value="tag.name" v-model="editTask.categories" class="mr-2">
            <span>{{ tag.name }}</span>
          </div>
        </div>
      </div>

      <div class="space-y-2 mt-2">
        <label for="startDate" class="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
        <input v-model="editTask.startDate" id="startDate" type="date" required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
      </div>

      <div class="space-y-2 mt-2">
        <label for="dueDate" class="block text-sm font-medium text-gray-700">Fecha de Vencimiento</label>
        <input v-model="editTask.dueDate" id="dueDate" type="date" required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg" />
      </div>

      <div class="mt-4 flex justify-end">
        <button type="button" @click="closeModal"
          class="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg mr-2">Cancelar</button>
        <button type="submit" class="px-4 py-2 bg-blue-700 text-white hover:bg-blue-500 rounded-lg">Guardar</button>
      </div>
    </form>
  </ModalForm>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useTaskStore } from '@/stores/task';
import { useTagStore } from '@/stores/tags';
import ModalForm from './ModalForm.vue';
import Swal from 'sweetalert2';

const taskStore = useTaskStore();
const tagStore = useTagStore();

const isModalOpen = ref(false);
const editTask = ref({
  id: '',
  title: '',
  description: '',
  categories: [] as string[],
  startDate: '',
  dueDate: ''
});

const tasks = computed(() => taskStore.tasks);

function updateTaskTags() {
  taskStore.tasks.forEach((task) => {
    if (task.categories) {
      task.categories = task.categories.filter((category) =>
        tagStore.tags.some((tag) => tag.name === category)
      );
    }
  });
}

defineProps({
  selectedCategory: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['setCategory', 'clearSection']);

const clearSection = () => {
  emit('clearSection');
};

watch(() => tagStore.tags, () => {
  updateTaskTags();
}, { deep: true });

onMounted(() => {
  updateTaskTags();
});

function openEditModal(task) {
  editTask.value = { ...task };
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  editTask.value = { id: '', title: '', description: '', categories: [], startDate: '', dueDate: '' };
}

function confirmSaveTask() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¿Quieres guardar los cambios de esta tarea?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, guardar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      saveTask();
      Swal.fire(
        '¡Guardado!',
        'La tarea ha sido actualizada.',
        'success'
      );
    }
  });
}

function saveTask() {
  const index = taskStore.tasks.findIndex((t) => t.id === editTask.value.id);
  if (index !== -1) {
    taskStore.tasks[index] = { ...editTask.value };
  }
  closeModal();
}

function confirmDeleteTask(taskId: string) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteTask(taskId);
      Swal.fire(
        '¡Borrado!',
        'La tarea ha sido eliminada.',
        'success'
      );
    }
  });
}

function deleteTask(taskId: string) {
  const index = taskStore.tasks.findIndex((t) => t.id === taskId);
  if (index !== -1) {
    taskStore.tasks.splice(index, 1);
  }
}
</script>
