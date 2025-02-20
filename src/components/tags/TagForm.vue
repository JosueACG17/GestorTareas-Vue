<template>
  <form @submit.prevent="submitForm" class="space-y-4 mt-3">
    <div>
      <label for="tagName" class="block text-sm font-medium text-gray-700">Nombre de la etiqueta</label>
      <input v-model="tagName" id="tagName" type="text" required
        class="w-full px-4 py-2 rounded-lg border border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
      <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
    </div>
    <div class="flex justify-end space-x-2">
      <button type="button" @click="closeForm" class="px-4 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg">Cancelar</button>
      <button type="submit" class="px-4 py-2 bg-blue-700 text-white hover:bg-blue-500 rounded-lg">{{ isEditing ? 'Actualizar' : 'Agregar' }}</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
  isEditing: {
    type: Boolean,
    default: false,
  },
  tagToEdit: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['submit-form', 'close-form']);

const tagName = ref('');
const error = ref('');

watch(() => props.tagToEdit, (newTag) => {
  if (newTag) {
    tagName.value = newTag.name;
  }
}, { immediate: true });

const validateInput = () => {
  if (!tagName.value.trim()) {
    error.value = 'El nombre de la etiqueta no puede estar vacío.';
    return false;
  }

  const regex = /^[a-zA-Z0-9\s]*$/;
  if (!regex.test(tagName.value)) {
    error.value = 'El nombre de la etiqueta no puede contener caracteres especiales.';
    return false;
  }

  error.value = '';
  return true;
};

const submitForm = () => {
  if (!validateInput()) return;

  emit('submit-form', tagName.value);
  tagName.value = '';
};

const closeForm = () => {
  emit('close-form');
};
</script>
