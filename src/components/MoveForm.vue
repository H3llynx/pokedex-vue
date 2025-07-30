<script setup>
import { ref } from 'vue'
import CloseIcon from '../components/icons/CloseIcon.vue'
import MoveIcon from '../components/icons/MoveIcon.vue'

const latitude = ref('')
const longitude = ref('')
const visible = ref(false)

const props = defineProps(['poke'])
const emit = defineEmits(['reload'])

const toggleForm = () => {
  visible.value = !visible.value
}

const validateInputs = () => {
  if (!latitude.value && !longitude.value) {
    visible.value = false
    return
  }
  else {
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
    movePoke()
    resetForm()
  }
}
const resetForm = () => {
  latitude.value = ''
  longitude.value = ''
}
const movePoke = async () => {
  try {
    const response = await fetch(`https://retoolapi.dev/GHU2tQ/data/${props.poke.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude: latitude.value,
        longitude: longitude.value,
      }),
    });
    if (!response.ok) throw new Error('Something went wrong. Your Pokémon could not be moved.')
    alert(`Location of ${props.poke.name} successfully updated!`)
    emit('reload')
    visible.value = false

  } catch (error) {
    alert(`Error: ${error.message} `)
  }
}
</script>

<template>
  <button tabindex="0" role="button" class="card-btn" @click="toggleForm">Move me
    <i>
      <MoveIcon />
    </i>
  </button>
  <teleport to="body">
    <div class="overlay" v-show="visible">
      <div class="form">
        <i>
          <CloseIcon @click="toggleForm" @clicked="toggleForm" />
        </i>
        <h3>Let's move {{ props.poke.name }}</h3>
        <form @submit.prevent="validateInputs()">
          <label for="latitude">Enter new latitude</label>
          <input id="latitude" v-model="latitude" type="text" :placeholder="props.poke.latitude" />
          <label for="longitude">Enter new longitude</label>
          <input id="longitude" v-model="longitude" type="text" :placeholder="props.poke.longitude" />
          <button tabindex="0" role="button">Submit</button>
        </form>
        <img src="../assets/images/backpack.png" class="backpack" />
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

.backpack {
  position: absolute;
  z-index: 0;
  right: -60px;
  max-height: 160px;
  bottom: 5px;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.6));
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
  font-size: 1rem;
  font-weight: 700;
  border-radius: 2rem;
  letter-spacing: 0.02em;
  background: var(--color-background);
  color: var(--color-text);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  transition: 0.4s;
  position: relative;
  z-index: 1;
}

.card-btn {
  width: 100%;
  margin-top: 0;
  background: var(--multicolor-gradient);
  background-size: var(--main-gradient-size);
  animation: var(--main-background-animation);
  color: var(--color-background);
  transition: transform 0.4s;
  padding: 0.15em 2.2em;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
}

.card-btn i {
  margin-left: 5px;
}

.card-btn:hover {
  transform: rotate(3deg);
  background: linear-gradient(90deg, var(--vt-c-pika-yellow) 20%, #7D5FFF 90%);
  box-shadow: 0 0 4px var(--electric-pop)
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
}

form {
  margin-top: 1rem;
  width: 100%;
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
  .card-btn:hover {
    transform: none;
  }

  .form {
    width: 85%;
    padding: 1.8rem 2.5rem 1.8rem 1.6rem;
  }

  .backpack {
    max-height: 140px;
    right: -30px;
    bottom: -5px;
  }
}
</style>
