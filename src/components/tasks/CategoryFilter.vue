<template>
  <div class="sm:flex items-center justify-between border-b border-gray-300 mt-4">
    <div class="flex items-center overflow-x-auto">
      <button @click="setCategory('Todas')" class="px-4 py-2 mx-2"
        :class="{ 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-700': selectedCategory === 'Todas' }">
        Todas ({{ taskCount }})
      </button>
      <button v-for="tag in tags" :key="tag.id" @click="setCategory(tag.name)" class="px-4 py-2 mx-2"
        :class="{ 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-700': selectedCategory === tag.name }">
        {{ tag.name }} ({{ countTasksByCategory(tag.name) }})
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '@/stores/task';

defineProps({
  tags: {
    type: Array as () => { id: string; name: string }[],
    required: true,
  },
  taskCount: {
    type: Number,
    required: true,
  },
  selectedCategory: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['setCategory', 'clearSection']);

const taskStore = useTaskStore();

const setCategory = (category: string) => {
  emit('setCategory', category);
};

const countTasksByCategory = (category: string) => {
  return taskStore.tasks.filter(task => task.categories?.includes(category)).length;
};


</script>
