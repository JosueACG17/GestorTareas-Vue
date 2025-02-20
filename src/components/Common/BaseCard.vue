<script lang="ts" setup>
defineProps({
  className: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div :class="`rounded-3xl shadow-lg p-4 ${className}`">
    <slot></slot>
  </div>
</template>
