<script setup>
const emit = defineEmits(['clicked'])

// Para poder usar el icono como boton en Safari (navegación con el teclado):
const handleKeyDown = (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    emit('clicked')
  }
}
</script>

<template>
  <svg tabindex="0" role="button" aria-label="delete" @keydown="handleKeyDown" xmlns="http://www.w3.org/2000/svg"
    height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
    <path
      d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Z" />
  </svg>
</template>
