<template>
  <div>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar tarea por título o descripción"
      class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref(props.modelValue);

watch(searchQuery, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>
