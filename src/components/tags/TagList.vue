    <template>
      <div class="mt-4">
        <ul v-if="tags.length" class="space-y-2">
          <li v-for="tag in tags" :key="tag.id" class="flex justify-between items-center p-2 border-1 border-gray-300 rounded-lg">
            <span>{{ tag.name }}</span>
            <div class="flex gap-2">
              <button @click="editTag(tag)" class="text-white hover:text-white cursor-pointer hover:bg-blue-800 p-2 bg-blue-500 rounded-sm">Editar</button>
              <button @click="deleteTag(tag.id)" class="text-white hover:text-white cursor-pointer hover:bg-red-800 p-2 bg-red-500 rounded-sm">Eliminar</button>
            </div>
          </li>
        </ul>
        <p v-else class="text-gray-500 mt-4">No hay etiquetas disponibles.</p>
      </div>
    </template>

    <script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
      tags: {
        type: Array,
        required: true,
      },
    });

    const emit = defineEmits(['edit-tag', 'delete-tag']);

    const editTag = (tag) => {
      emit('edit-tag', tag);
    };

    const deleteTag = (tagId) => {
      emit('delete-tag', tagId);
    };
    </script>
