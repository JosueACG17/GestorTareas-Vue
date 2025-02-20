  <template>
  <form @submit.prevent="submitTask" class="mt-4">
    <div class="space-y-2">
      <label for="title" class="block text-sm font-medium text-gray-700">Título <span
          class="text-red-700">*</span></label>
      <input v-model="task.title" id="title" type="text" required placeholder="Ingrese el título de la tarea"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
      <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
    </div>

    <div class="space-y-2 mt-2">
      <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
      <textarea v-model="task.description" id="description" rows="3" placeholder="Añade una descripción"
        class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"></textarea>
      <p v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</p>
    </div>

    <div class="space-y-2 mt-2">
      <label class="block text-sm font-medium text-gray-700">Categorías</label>
      <div class="overflow-y-auto max-h-28 border border-gray-300 rounded p-2">
        <div v-for="tag in tags" :key="tag.id" class="flex items-center">
          <input type="checkbox" :value="tag.name" v-model="task.categories" class="mr-2">
          <span>{{ tag.name }}</span>
        </div>
      </div>
      <p v-if="errors.categories" class="text-red-500 text-sm">{{ errors.categories }}</p>
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
import { ref, watch } from 'vue';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    required: true,
  },
  tags: {
    type: Array as () => { id: string; name: string }[],
    required: true,
  },
});

const emit = defineEmits(['submitTask', 'closeModal']);

// Usa una copia reactiva de la tarea
const task = ref({ ...props.task });

// Si la tarea cambia (por ejemplo, al abrir el modal), actualiza la copia reactiva
watch(
  () => props.task,
  (newTask) => {
    task.value = { ...newTask };
  },
  { deep: true }
);

const submitTask = () => {
  emit('submitTask', task.value); // Envía el objeto `task` actualizado
};

const closeModal = () => {
  emit('closeModal');
};
</script>
