import { defineStore } from 'pinia';
import { ref, computed, watch, onMounted } from 'vue';
import type { Task } from '@/components/interfaces/Task';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'));
  const loading = ref(false);

  onMounted(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks.value = JSON.parse(storedTasks);
    }
  });

  const completedTasks = computed(() => tasks.value.filter((task) => task.completed));
  const pendingTasks = computed(() => tasks.value.filter((task) => !task.completed));

  // Simulación de   llamada API (puedes implementarla si es necesario)
  async function fetchTasks() {
    loading.value = true;
    try {
      // Simulación de llamada API
      // const response = await fetch('/api/tasks');
      // tasks.value = await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      loading.value = false;
    }
  }

  // Agregar una nueva tarea
  function addTask(task: Omit<Task, 'id' | 'createdAt'>) {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      categories: task.categories || [],
      completed: false,
    };
    tasks.value.push(newTask);
  }

  function updateTask(updatedTask: Task) {
    const index = tasks.value.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      // Actualiza la tarea en el array
      tasks.value[index] = updatedTask;

      // Guarda los cambios en localStorage
      localStorage.setItem('tasks', JSON.stringify(tasks.value));
    }
  }

  function deleteTask(taskId: string) {
    tasks.value = tasks.value.filter(task => task.id !== taskId);
  }

  function clearTasks() {
    tasks.value = [];
    localStorage.removeItem('tasks');
  }

function deleteTasksByCategory(category: string) {
  tasks.value = tasks.value.filter(task => !task.categories?.includes(category));
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
}

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
};
  watch(
    tasks,
    (newTasks) => {
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    },
    { deep: true }
  );

  return {
    tasks,
    loading,
    completedTasks,
    pendingTasks,
    fetchTasks,
    deleteTasksByCategory,
    addTask,
    updateTask,
    deleteTask,
    clearTasks,
    saveTasks
  };
});
