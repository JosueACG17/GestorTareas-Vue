  <template>
    <main class="p-8 h-screen">
      <div class="bg-white rounded-3xl shadow-lg">
        <div class="px-4 md:px-10 py-4 md:py-7">
          <div class="flex items-center justify-between p-4">
            <div class="flex-col">
              <p tabindex="0" class="focus:outline-none text-xl sm:text-4xl font-bold leading-normal text-gray-800">
                Gestor de Etiquetas
              </p>
              <p class="text-gray-600 text-medium mt-1">Etiquetas: {{ tagStore.tags.length }} </p>
            </div>
            <div class="flex gap-4">
              <button @click="openModal"
                class="focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-700 hover:bg-indigo-600 text-white rounded">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Agregar etiqueta
              </button>
              <button @click="confirmClearTags"
                class="focus:ring-2 focus:ring-offset-2 cursor-pointer focus:ring-red-600 mt-4 sm:mt-0 inline-flex items-center sm:px-4 px-4 py-2 bg-red-700 hover:bg-red-500 text-white rounded">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="sm:size-6 size-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                Limpiar etiquetas
              </button>
            </div>
          </div>
          <hr class="text-gray-500">
          <TagList :tags="tagStore.tags" @edit-tag="openEditModal" @delete-tag="confirmDeleteTag" />

          <ModalForm :isOpen="isModalOpen" :title="isEditing ? 'Editar Etiqueta' : 'Agregar Etiqueta'"
            @close="closeModal">
            <TagForm :isEditing="isEditing" :tagToEdit="tagToEdit" @submit-form="handleSubmit" @close-form="closeModal" />
          </ModalForm>
        </div>
      </div>
    </main>
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useTagStore } from '@/stores/tags';
  import ModalForm from '@/components/tasks/ModalForm.vue';
  import TagList from '@/components/tags/TagList.vue';
  import TagForm from '@/components/tags/TagForm.vue';
  import Swal from 'sweetalert2';
  import type { Tag } from '@/components/interfaces/Tag';

  const tagStore = useTagStore();

  const isModalOpen = ref(false);
  const isEditing = ref(false);
  const tagToEdit = ref<Tag | null>(null);

  onMounted(() => {
    tagStore.loadTags();
  });

  const openModal = () => {
    isModalOpen.value = true;
    isEditing.value = false;
    tagToEdit.value = null;
  };

  const openEditModal = (tag: Tag) => {
    isModalOpen.value = true;
    isEditing.value = true;
    tagToEdit.value = tag;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const handleSubmit = (tagName: string) => {
    if (isEditing.value && tagToEdit.value) {
      tagStore.editTag(tagToEdit.value.id, tagName);
    } else {
      tagStore.addTag(tagName);
    }
    closeModal();
  };

  const confirmDeleteTag = (tagId: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        tagStore.deleteTag(tagId);
        Swal.fire(
          '¡Borrado!',
          'La etiqueta ha sido eliminada.',
          'success'
        );
      }
    });
  };

  const confirmClearTags = () => {
    if (tagStore.tags.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No se puede eliminar etiquetas',
        text: 'No hay etiquetas para eliminar.',
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
      confirmButtonText: 'Sí, borrar todo'
    }).then((result) => {
      if (result.isConfirmed) {
        tagStore.clearTags();
        Swal.fire(
          '¡Borrado!',
          'Todas las etiquetas han sido eliminadas.',
          'success'
        );
      }
    });
  };
  </script>
