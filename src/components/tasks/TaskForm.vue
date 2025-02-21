<template>
  <form @submit.prevent="submitTask" class="mt-4">
    <div class="space-y-2">
      <label for="title" class="block text-sm font-medium text-gray-700">Título <span
          class="text-red-700">*</span></label>
      <input v-model="task.title" id="title" type="text" required placeholder="Ingrese el título de la tarea"
        @blur="touched.title = true"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
      <p v-if="touched.title && errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
    </div>

    <div class="space-y-2 mt-2">
      <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
      <textarea v-model="task.description" id="description" rows="3" placeholder="Añade una descripción"
        @blur="touched.description = true"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"></textarea>
      <p v-if="touched.description && errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
    </div>

    <div class="space-y-2 mt-2">
      <label class="block text-sm font-medium text-gray-700">Categorías</label>
      <div class="overflow-y-auto max-h-22 border border-gray-300 rounded p-2">
        <div v-for="tag in tags" :key="tag.id" class="flex items-center">
          <input type="checkbox" :value="tag.name" v-model="task.categories" @change="touched.categories = true" class="mr-2">
          <span>{{ tag.name }}</span>
        </div>
      </div>
      <p v-if="touched.categories && errors.categories" class="text-red-500 text-sm">{{ errors.categories }}</p>
    </div>

    <div class="flex gap-3">
      <div class="space-y-2 mt-2">
        <label for="startDate" class="block text-sm font-medium text-gray-700">Fecha de Inicio <span
            class="text-red-700">*</span></label>
        <input v-model="task.startDate" id="startDate" type="date" required
          class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
        <p v-if="errors.startDate" class="text-red-500 text-sm">{{ errors.startDate }}</p>
      </div>

      <div class="space-y-2 mt-2">
        <label for="dueDate" class="block text-sm font-medium text-gray-700">Fecha de Vencimiento <span
            class="text-red-700">*</span></label>
        <input v-model="task.dueDate" id="dueDate" type="date" required
          class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
        <p v-if="errors.dueDate" class="text-red-500 text-sm">{{ errors.dueDate }}</p>
      </div>
    </div>

    <div class="mt-4 flex justify-end space-x-2">
      <button type="button" @click="closeModal"
        class="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg">Cancelar</button>
      <button type="submit" class="px-4 py-2 bg-blue-700 text-white hover:bg-blue-500 rounded-lg">Agregar</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  tags: {
    type: Array as () => { id: string; name: string }[],
    required: true,
  },
});

const emit = defineEmits(['submitTask', 'closeModal']);

const task = ref({ ...props.task });

const touched = ref({
  title: false,
  description: false,
  categories: false,
});

watch(
  () => props.task,
  (newTask) => {
    task.value = { ...newTask };
  },
  { deep: true }
);

const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

const errors = computed(() => {
  const errs: { [key: string]: string } = {};
  if (!task.value.title.trim()) {
    errs.title = 'El título no puede estar vacío.';
  } else if (specialCharPattern.test(task.value.title)) {
    errs.title = 'El título no puede contener caracteres especiales.';
  }

  if (!task.value.description.trim()) {
    errs.description = 'La descripción no puede estar vacía.';
  } else if (specialCharPattern.test(task.value.description)) {
    errs.description = 'La descripción no puede contener caracteres especiales.';
  }

  if (task.value.categories.length === 0) {
    errs.categories = 'Debe seleccionar al menos una categoría.';
  }

  return errs;
});

const submitTask = () => {
  touched.value.title = true;
  touched.value.description = true;
  touched.value.categories = true;

  if (Object.keys(errors.value).length === 0) {
    emit('submitTask', task.value); 
  }
};

const closeModal = () => {
  emit('closeModal');
};
</script>
