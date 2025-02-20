<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <div class="flex items-center justify-between border-b pb-1">
        <h3 class="text-lg font-semibold text-gray-900">
          <slot name="header"> {{ title }}
          </slot>
        </h3>
        <button @click="closeModal" class="text-gray-900 cursor-pointer">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              d="M6 6l8 8m0-8l-8 8"></path>
          </svg>
        </button>
      </div>
      <div class="">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  isOpen: Boolean,
  title: {
    type: String,
    default: 'Modal'
  }
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
})
</script>
