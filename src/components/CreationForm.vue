<script setup>
import { ref } from 'vue'

const name = ref('')
const image = ref('')
const latitude = ref('')
const longitude = ref('')
const attack = ref('')
const defense = ref('')

const emit = defineEmits(['reload'])

// Para confirmar que las coordinadas son válidas:
const validateInputs = () => {
  const latInput = parseFloat(latitude.value)
  const longInput = parseFloat(longitude.value)
  if (isNaN(latInput) || latInput < -90.00 || latInput > 90.00) {
    alert("The latitude you provided is not valid")
    return
  }
  else if (isNaN(longInput) || longInput < -180.00 || longInput > 180.00) {
    alert("The longityde you provided is not valid")
    return
  }
  else {
    latitude.value = latInput
    longitude.value = longInput
    createPoke()
    resetForm()
  }
}

// Creación del Pokémon:
const createPoke = async () => {
  // Con imagen predefinida en caso de que el usuario no ponga url de imagen:
  let pokeImage
  if (!image.value) {
    pokeImage = 'https://i.imghippo.com/files/IJ9610JD.png'
  }
  else pokeImage = image.value
  try {
    const response = await fetch('https://retoolapi.dev/GHU2tQ/data/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        image: pokeImage,
        latitude: latitude.value,
        longitude: longitude.value,
        attack: attack.value,
        defense: defense.value
      }),
    });
    if (!response.ok) throw new Error('Something went wrong. Your Pokémon could not be created')
    const result = await response.json()
    alert(`Pokémon ${result.name} has been successfully created!`)
    emit('reload')
  } catch (error) {
    alert(`Error: ${error.message} `)
  }
}

// Como no funciona sin .prevent, para resetear el formulario después de cada envio:
const resetForm = () => {
  latitude.value = ''
  longitude.value = ''
  name.value = ''
  image.value = ''
  attack.value = ''
  defense.value = ''
}
</script>

<template>
  <form @submit.prevent="validateInputs()">
    <div class="block">
      <div class="form-group">
        <label for="name">Name *</label>
        <input id="name" v-model="name" type="text" required />
      </div>
      <div class="form-group">
        <label for="attack">Attack *</label>
        <input id="attack" v-model="attack" type="number" required />
      </div>
    </div>
    <div class="block">
      <div class="form-group">
        <label for="defense">Defense *</label>
        <input id="defense" v-model="defense" type="number" required />
      </div>
      <div class="form-group">
        <label for="latitude">Latitude *</label>
        <input id="latitude" v-model="latitude" type="text" placeholder="e.g. 43.027974" required />
      </div>
      <div class="form-group">
        <label for="longitude">Longitude *</label>
        <input id="longitude" v-model="longitude" type="text" placeholder="e.g. 0.073914" required />
      </div>
    </div>
    <div class="form-group">
      <label for="image">Image URL</label>
      <input id="image" v-model="image" type="url" placeholder="e.g. https://picsum.photos/id/237/200/300" />
    </div>
    <button type="submit" tabindex="0">Create</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 1rem;
}

.block {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  border: none;
  padding: 0;
  align-items: flex-end;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
}

label {
  margin-bottom: 0.5rem;
}

input {
  padding: 0.6rem 0.75rem;
  background: var(--vt-c-white);
  border: 1px solid var(--input-border);
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  font-size: 0.8rem;
}

button {
  border: 0;
  margin: auto;
  margin-top: 1rem;
  padding: 0.7em 2.2em;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 2rem;
  background: linear-gradient(90deg, var(--electric-base) 60%, var(--vt-c-pika-yellow) 100%);
  color: var(--vt-c-black-mute);
  box-shadow:
    0 6px 24px rgba(63, 247, 255, 0.12),
    0 1.5px 6px rgba(0, 0, 0, 0.05);
  transition: 0.4s;
  animation: replayPulse 2.4s ease-in-out infinite;
  letter-spacing: 0.02em;
}

button:hover,
button:focus {
  animation: none;
  background: linear-gradient(90deg, var(--vt-c-pika-yellow) 20%, var(--electric-base) 90%);
  box-shadow:
    0 0 16px var(--electric-pop),
    0 0 28px var(--vt-c-pika-yellow),
    0 0 0.5em #fff3;
}

@media (max-width: 600px) {
  form {
    gap: 0;
  }

  .block {
    flex-direction: column;
    gap: 0;
    align-items: center;
  }

  .form-group {
    width: 100%;
    margin-bottom: 10px;
  }

  button {
    max-width: unset;
  }
}
</style>
