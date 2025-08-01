<script setup>
import { onMounted, ref, watch } from 'vue'

// Recupera las preferencias del sistema:
const getSystemPreference = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Recupera la preferencia del usuario (sistema si entra por primera vez, desde localStorage si
// ya había escogido un tema en la app antes:)
const storedTheme = localStorage.getItem('theme')
const theme = ref(storedTheme || 'system')
const onloadTheme = theme.value === 'system' ? getSystemPreference() : storedTheme

onMounted(() => {
  document.documentElement.setAttribute('data-theme', onloadTheme)
})

// Cambia el tema según la elección del usuario y guarda la elección en localStorage
watch(theme, (pickedTheme) => {
  if (pickedTheme === 'system') {
    document.documentElement.setAttribute('data-theme', getSystemPreference())
    localStorage.removeItem('theme')
  }
  else {
    document.documentElement.setAttribute('data-theme', pickedTheme)
    localStorage.setItem('theme', pickedTheme)
  }
})


// PREGUNTA: al usar Safari, suelo tener que añadir tabindex, role="button", o/y
// escribir funciones en js para poder forzar el focus y el trigger de la función con Enter.
// Lo he podido lograr aquí para iconos, pero no lo he logrado con estos inputs.
// Hay algún truco?

</script>
<template>
  <div class="theme">
    <span class="bold">Switch theme:</span>
    <div role="radiogroup" aria-label="Select theme">
      <div class="theme-button system">
        <input type="radio" name="theme" id="system" value="system" v-model="theme">
        <img v-if="theme === 'system'" src="../assets/images/logo.png" class="pokeball">
        <label for="system">System</label>
      </div>
      <div class="theme-button dark"><input type="radio" name="theme" id="dark" value="dark" v-model="theme">
        <img v-if="theme === 'dark'" src="../assets/images/logo.png" class="pokeball">
        <label for="dark">Dark</label>
      </div>
      <div class="theme-button light"><input type="radio" name="theme" id="light" value="light" v-model="theme">
        <img v-if="theme === 'light'" src="../assets/images/logo.png" class="pokeball">
        <label for="light">Light</label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme {
  text-align: center;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));
  position: relative;
  z-index: 3;
  color: var(--vt-c-text-dark-1);
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

div[role='radiogroup'] {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  flex: 1 1 auto;
}

.pokeball {
  width: 20px;
  height: 20px;
  margin-left: -5px;
  margin-top: -20px;
  position: absolute;
  pointer-events: none;
}

.theme-button {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border-radius: 2rem;
  transition: 0.4s;
}

.theme-button:hover {
  transform: rotate(3deg);
}

input[type='radio'] {
  position: absolute;
  opacity: 0;
}

label {
  padding: 0.3rem 0.9rem;
  position: relative;
  transition: 0.3s;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
}

.system {
  background: var(--card-inside-gradient);
  background-size: var(--main-gradient-size);
  animation: gradientMove 12s infinite;
  color: var(--color-background);
  border: 1px solid var(--color-border);
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}

.dark {
  background: var(--vt-c-black-mute);
  color: var(--vt-c-white);
  border: 1px solid transparent;
}

.light {
  background: var(--vt-c-white-mute);
  color: var(--vt-c-black);
  border: 1px solid transparent;
}

@media (max-width: 600px) {
  .theme-button:hover {
    transform: none;
  }
}
</style>
