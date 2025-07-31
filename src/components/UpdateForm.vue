<script setup>
import { ref } from 'vue'
import CloseIcon from '../components/icons/CloseIcon.vue'


const props = defineProps(['poke'])
const emit = defineEmits(['reload'])

const name = ref('')
const image = ref('')
const latitude = ref('')
const longitude = ref('')
const attack = ref('')
const defense = ref('')
const visible = ref(false)

const toggleForm = () => {
  visible.value = !visible.value
}

// Para actualizar cualquier de un Pokémon creado:
const validateInputs = () => {
  // No se hace nada si el usuario no ha entrado nuevos datos:
  if (!name.value && !attack.value && !defense.value && !latitude.value && !longitude.value && !image.value) {
    visible.value = false
    return
  }
  else {
    // Se modifica solamente cuando hay datos nuevos, y en caso de las coordinadas se revalidan:
    if (!name.value) name.value = props.poke.name
    if (!attack.value) attack.value = props.poke.attack
    if (!defense.value) defense.value = props.poke.defense
    if (!latitude.value) latitude.value = props.poke.latitude
    else {
      if (isNaN(parseFloat(latitude.value)) || (parseFloat(latitude.value)) < -90.00 || (parseFloat(latitude.value)) > 90.00) {
        alert("The latitude you provided is not valid")
        return
      }
      else latitude.value = parseFloat(latitude.value)
    }
    if (!longitude.value) longitude.value = props.poke.longitude
    else {
      if (isNaN(parseFloat(longitude.value)) || (parseFloat(longitude.value)) < -180.00 || (parseFloat(longitude.value)) > 180.00) {
        alert("The longitude you provided is not valid")
        return
      }
      else longitude.value = parseFloat(longitude.value)
    }
    if (!image.value) image.value = props.poke.image
    updatePoke()
    resetForm()
  }
}

const resetForm = () => {
  latitude.value = ''
  longitude.value = ''
  name.value = ''
  image.value = ''
  attack.value = ''
  defense.value = ''
}

const updatePoke = async () => {
  try {
    const response = await fetch(`https://retoolapi.dev/GHU2tQ/data/${props.poke.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        image: image.value,
        latitude: latitude.value,
        longitude: longitude.value,
        attack: attack.value,
        defense: defense.value
      }),
    });
    if (!response.ok) throw new Error('Something went wrong. Your Pokémon could not be updated')
    const result = await response.json()
    alert(`Pokémon ${result.name} successfully updated!`)
    emit('reload')
    visible.value = false
  } catch (error) {
    alert(`Error: ${error.message} `)
  }
}
</script>

<template>
  <div class="wrapper"><button tabindex="0" class="card-btn" @click="toggleForm">Update me</button></div>
  <teleport to="body">
    <div class="overlay" v-show="visible">
      <div class="form">
        <i>
          <CloseIcon @click="toggleForm" @clicked="toggleForm" />
        </i>
        <img src="../assets/images/edit.png" class="poke-icon" />
        <h3>Update {{ props.poke.name }}</h3>
        <form @submit.prevent="validateInputs()">
          <label for="name">Name</label>
          <input id="name" v-model="name" type="text" :placeholder="props.poke.name">
          <div class="block">
            <div class="form-group">
              <label for="attack">Attack</label>
              <input id="attack" v-model="attack" type="number" :placeholder="props.poke.attack" />
            </div>
            <div class="form-group">
              <label for="defense">Defense</label>
              <input id="defense" v-model="defense" type="number" :placeholder="props.poke.defense" />
            </div>
          </div>
          <label for="latitude">Latitude</label>
          <input id="latitude" v-model="latitude" type="text" :placeholder="props.poke.latitude" />
          <label for="longitude">Longitude</label>
          <input id="longitude" v-model="longitude" type="text" :placeholder="props.poke.longitude" />
          <label for="image">Image URL</label>
          <input id="image" v-model="image" type="url"
            :placeholder="poke.image !== 'https://i.imghippo.com/files/IJ9610JD.png' ? props.poke.image : ''" />
          <button tabindex="0">Submit</button>
        </form>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
@keyframes opacity {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.overlay {
  animation: opacity 0.5s;
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.form i {
  cursor: pointer;
  transition: 0.4s;
  position: absolute;
  right: 5px;
  top: 10px;
}

.form i:hover {
  color: var(--color-background);
}

button {
  cursor: pointer;
  border: 0;
  display: block;
  margin: 1.6rem auto 0 auto;
  padding: 0.7em 2.2em;
  width: 100%;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 2rem;
  letter-spacing: 0.02em;
  background: var(--color-background);
  color: var(--color-text);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  transition: 0.4s;
}

.wrapper {
  width: 100%;
  margin-top: 1rem;
  border-radius: 2rem;
  padding: 1px;
  background: var(--multicolor-gradient);
  background-size: var(--main-gradient-size);
  animation: var(--main-background-animation);
  transition: transform 0.4s;
}

.card-btn {
  color: var(--color-text);
  background: var(--color-background);
  margin: 0;
  padding: 0.5em 1.8rem;
  font-size: 0.85rem;
  transition: 0.4s;
}

.card-btn:hover {
  color: #7D5FFF;
}

.wrapper:hover {
  transform: rotate(3deg);
  box-shadow: 0 0 4px var(--electric-pop);
}

.form button:hover {
  background: var(--color-text);
  color: var(--color-background);
}

.form {
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--popup);
  color: var(--text-color);
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  padding: 1.8rem;
  width: 400px;
}

h3 {
  font-size: 1.2rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.poke-icon {
  position: absolute;
  height: 90px;
  left: -2px;
  top: -6%;
}

form {
  margin-top: 1rem;
  width: 100%;
}

.block {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
}

label {
  display: block;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

input {
  width: 100%;
  padding: 0.6rem 0.75rem;
  background: var(--vt-c-white);
  border: 1px solid var(--input-border);
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  font-size: 0.8rem;
}

@media (max-width: 600px) {
  .wrapper:hover {
    transform: none;
  }

  .form {
    width: 90%;
    padding: 1.3rem;
    padding: 1rem 1.3rem 1.8rem 1.3rem;
  }
}
</style>
