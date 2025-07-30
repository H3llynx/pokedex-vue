<script setup>
const emit = defineEmits(['clicked'])

const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    emit('clicked')
  }
}
</script>
<template>
  <svg tabindex="0" role="button" aria-label="close" @keydown="handleKeyDown" xmlns="http://www.w3.org/2000/svg"
    height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  </svg>
</template>
