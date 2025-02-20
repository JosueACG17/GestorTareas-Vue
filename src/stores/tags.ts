import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Tag } from '@/components/interfaces/Tag';

export const useTagStore = defineStore('tag', () => {
  const tags = ref<Tag[]>([]);

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
    }
  };

  const deleteTag = (tagId: string) => {
    tags.value = tags.value.filter((tag) => tag.id !== tagId);
  };

  const clearTags = () => {
    tags.value = [];
    localStorage.removeItem('tags');
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
