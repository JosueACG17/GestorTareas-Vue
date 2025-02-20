<template>
  <main class="p-8 h-screen">
    <div class="bg-white rounded-3xl shadow-lg">
      <div class="px-4 md:px-10 py-4 md:py-7">
        <!-- Header -->
        <Header :taskCount="taskStore.tasks.length" @openModal="openModal" @confirmClearTasks="confirmClearTasks" />

        <!-- Search Bar -->
        <SearchBar v-model="searchQuery" />

        <!-- Search Results -->
        <ul v-if="searchQuery" class="bg-white border rounded-lg shadow-md max-h-60 overflow-y-auto mt-2">
          <li v-for="task in globalFilteredTasks" :key="task.id" @click="openTaskModal(task)"
            class="px-4 py-2 hover:bg-blue-100 cursor-pointer">
            {{ task.title }}
          </li>
        </ul>

        <CategoryFilter :tags="tagStore.tags" :taskCount="taskStore.tasks.length" :selectedCategory="selectedCategory"
          @setCategory="setCategory" @clearSection="clearSection" />

        <!-- Task List -->
        <div v-if="filteredTasks.length" class="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div v-for="task in filteredTasks" :key="task.id" @click="openTaskModal(task)"
            class="border border-gray-200 rounded-lg p-4 shadow-lg">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-lg font-semibold text-gray-800">{{ task.title }}</h3>
              <div class="flex gap-2">
                <!-- Botón de editar -->
                <button @click.stop="openEditModal(task)" class="cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <!-- Botón de eliminar -->
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
        <div class="flex justify-end mt-4">
          <button v-if="selectedCategory !== 'Todas'" @click="clearSection"
            class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Limpiar Sección
          </button>
        </div>
      </div>
    </div>
  </main>


  <!-- Task Details Modal -->
  <ModalForm :isOpen="isTaskModalOpen" title="Detalles de la Tarea" @close="closeTaskModal">
    <TaskDetailsModal :selectedTask="selectedTask" />
  </ModalForm>

  <!-- Add Task Modal -->
  <ModalForm :isOpen="isModalOpen" title="Agregar Tarea" @close="closeModal">
    <TaskForm :task="task" :errors="formSubmitted ? errors : {}" :tags="tagStore.tags" @submitTask="submitTask"
      @closeModal="closeModal" />
  </ModalForm>

  <!-- Edit Task Modal -->
  <ModalForm :isOpen="isEditModalOpen" title="Editar Tarea" @close="closeEditModal">
    <TaskForm :task="taskToEdit" :errors="formSubmitted ? errors : {}" :tags="tagStore.tags" @submitTask="updateTask"
      @closeModal="closeEditModal" />
  </ModalForm>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTaskStore } from '@/stores/task';
import { useTagStore } from '@/stores/tags';
import ModalForm from '@/components/tasks/ModalForm.vue';
import Header from '@/components/tasks/HeaderTask.vue';
import SearchBar from '@/components/tasks/SearchBar.vue';
import CategoryFilter from '@/components/tasks/CategoryFilter.vue';
import TaskForm from '@/components/tasks/TaskForm.vue';
import TaskDetailsModal from '@/components/tasks/TaskDetailModal.vue';
import Swal from 'sweetalert2';
import type { Task } from '@/components/interfaces/Task';

const taskStore = useTaskStore();
const tagStore = useTagStore();

onMounted(() => {
  tagStore.loadTags();
});

const isModalOpen = ref(false);
const isTaskModalOpen = ref(false);
const isEditModalOpen = ref(false);
const selectedCategory = ref('Todas');
const searchQuery = ref('');
const formSubmitted = ref(false);
const selectedTask = ref<Task | null>(null);
const taskToEdit = ref<Task | null>(null);

const task = ref({
  title: '',
  description: '',
  categories: [] as string[],
  startDate: '',
  dueDate: '',
});

// Computed
const filteredTasks = computed(() => {
  let tasks = taskStore.tasks;

  if (selectedCategory.value !== 'Todas') {
    tasks = tasks.filter(task => task.categories?.includes(selectedCategory.value));
  }

  return tasks;
});

const globalFilteredTasks = computed(() => {
  let tasks = taskStore.tasks;

  if (searchQuery.value) {
    tasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return tasks;
});

// Métodos
const setCategory = (category: string) => {
  selectedCategory.value = category;
};

const openModal = () => {
  isModalOpen.value = true;
  formSubmitted.value = false;
};

const closeModal = () => {
  isModalOpen.value = false;
  resetForm();
};

const openTaskModal = (task: Task) => {
  selectedTask.value = task;
  isTaskModalOpen.value = true;
};

const closeTaskModal = () => {
  isTaskModalOpen.value = false;
  selectedTask.value = null;
};

const openEditModal = (task: Task) => {
  taskToEdit.value = { ...task };
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
  taskToEdit.value = null;
};

const resetForm = () => {
  task.value = { title: '', description: '', categories: [], startDate: '', dueDate: '' };
};

const validateTask = (task: Task) => {
  const specialCharPattern = /[!@#$%^&*-_(),.?":{}|<>]/g;
  if (!task.title.trim() || !task.description.trim()) {
    return false;
  }
  if (specialCharPattern.test(task.title) || specialCharPattern.test(task.description)) {
    return false;
  }
  return true;
};

const submitTask = (newTask: Task) => {
  if (!validateTask(newTask)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos requeridos sin espacios en blanco o caracteres especiales.',
    });
    return;
  }

  taskStore.addTask({
    ...newTask,
    completed: false,
  });
  closeModal();
  Swal.fire({
    icon: 'success',
    title: 'Tarea creada',
    text: 'La tarea se ha creado correctamente.',
  });
};

const updateTask = (updatedTask: Task) => {
  if (!validateTask(updatedTask)) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos requeridos sin espacios en blanco o caracteres especiales.',
    });
    return;
  }

  taskStore.updateTask(updatedTask);
  closeEditModal();
  Swal.fire({
    icon: 'success',
    title: 'Tarea actualizada',
    text: 'La tarea se ha actualizado correctamente.',
  });
};

const confirmClearTasks = () => {
  if (taskStore.tasks.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'No se puede eliminar tareas',
      text: 'No hay tareas para eliminar.',
    });
    return;
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borrar todo',
  }).then((result) => {
    if (result.isConfirmed) {
      taskStore.clearTasks();
      Swal.fire(
        '¡Borrado!',
        'Todas las tareas han sido eliminadas.',
        'success'
      );
    }
  });
};

const clearSection = () => {
  if (selectedCategory.value === 'Todas') return;

  const tasksInCategory = taskStore.tasks.filter(task => task.categories?.includes(selectedCategory.value));
  if (tasksInCategory.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'No hay tareas disponibles para borrar',
      text: `No hay tareas en la categoría "${selectedCategory.value}" para eliminar.`,
    });
    return;
  }

  Swal.fire({
    title: '¿Estás seguro?',
    text: `¿Quieres eliminar todas las tareas de la categoría "${selectedCategory.value}"?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
  }).then((result) => {
    if (result.isConfirmed) {
      taskStore.deleteTasksByCategory(selectedCategory.value);
      Swal.fire(
        '¡Eliminadas!',
        `Las tareas de la categoría "${selectedCategory.value}" han sido eliminadas.`,
        'success'
      );
    }
  });
};

const confirmDeleteTask = (taskId: string) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borrar',
  }).then((result) => {
    if (result.isConfirmed) {
      taskStore.deleteTask(taskId);
      Swal.fire(
        '¡Borrado!',
        'La tarea ha sido eliminada.',
        'success'
      );
    }
  });
};
</script>
