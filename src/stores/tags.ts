import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Tag } from '@/components/interfaces/Tag';
import { useTaskStore } from '@/stores/task';

export const useTagStore = defineStore('tag', () => {
  const tags = ref<Tag[]>([]);
  const taskStore = useTaskStore();

  const loadTags = () => {
    const storedTags = localStorage.getItem('tags');
    if (storedTags) {
      tags.value = JSON.parse(storedTags) as Tag[];
    }
  };

  const saveTags = () => {
    localStorage.setItem('tags', JSON.stringify(tags.value));
  };

  const addTag = (tagName: string) => {
    const newTag: Tag = {
      id: crypto.randomUUID(),
      name: tagName,
    };
    tags.value.push(newTag);
  };

  const editTag = (tagId: string, newName: string) => {
    const tag = tags.value.find((tag) => tag.id === tagId);
    if (tag) {
      tag.name = newName;
      localStorage.setItem('tags', JSON.stringify(tags.value));
      updateTaskTags(); // Actualiza las tareas después de editar una etiqueta
    }
  };

  const deleteTag = (tagId: string) => {
    const tag = tags.value.find((tag) => tag.id === tagId);
    if (tag) {
      tags.value = tags.value.filter((tag) => tag.id !== tagId);
      localStorage.setItem('tags', JSON.stringify(tags.value));
      updateTaskTags(tag.name); // Actualiza las tareas después de eliminar una etiqueta
    }
  };

  const clearTags = () => {
    tags.value = [];
    localStorage.removeItem('tags');
  };

  const updateTaskTags = (deletedTagName?: string) => {
    taskStore.tasks.forEach(task => {
      if (deletedTagName) {
        task.categories = task.categories.filter(category => category !== deletedTagName);
      } else {
        task.categories = task.categories.filter(category =>
          tags.value.some(tag => tag.name === category)
        );
      }
    });
    taskStore.saveTasks(); // Asegúrate de guardar las tareas actualizadas
  };

  watch(
    tags,
    (newTags) => {
      localStorage.setItem('tags', JSON.stringify(newTags));
    },
    { deep: true },
  );

  return {
    tags,
    loadTags,
    saveTags,
    addTag,
    editTag,
    deleteTag,
    clearTags,
  };
});
