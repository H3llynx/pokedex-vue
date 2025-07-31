<script setup>
import { ref } from 'vue'
import CloseIcon from '../components/icons/CloseIcon.vue'
import DeleteIcon from '../components/icons/DeleteIcon.vue'

const props = defineProps(['poke'])
const emit = defineEmits(['reload'])
const visible = ref(false)

const toggleForm = () => {
  visible.value = !visible.value
}

// Para borrar un Pokémon creado:
const deletePoke = async () => {
  if (props.poke.id === 1 || props.poke.id === 2) {
    alert('Pit-Chou and Lynxie cannot be deleted; you can only edit them or change their location. Only Pokémon you’ve created yourself can be removed.')
    visible.value = false
  }
  else {
    try {
      const response = await fetch(`https://retoolapi.dev/GHU2tQ/data/${props.poke.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Something went wrong. Your Pokémon could not be deleted.')
      alert(`${props.poke.name} has been successfully deleted.`)
      emit('reload')
      visible.value = false
    } catch (error) {
      alert(`Error: ${error.message} `)
    }
  }
}
</script>

<template>
  <DeleteIcon @click="toggleForm" @clicked="toggleForm" />
  <teleport to="body">
    <div class="overlay" v-show="visible">
      <div class="form">
        <i>
          <CloseIcon @click="toggleForm" @clicked="toggleForm" />
        </i>
        <img src="../assets/images/delete.png" class="poke-icon" />
        <p> Are you sure you want to delete {{
          props.poke.name }}?</p>
        <div class="wrapper">
          <button tabindex="0" role="button" @click="deletePoke()">Yes</button><button tabindex="0" role="button"
            @click="toggleForm">No</button>
        </div>
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

.wrapper {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
}

button {
  cursor: pointer;
  border: 0;
  display: block;
  margin: 1.6rem 0 0 0;
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

button:hover {
  background: var(--color-text);
  color: var(--color-background);
}

.poke-icon {
  position: absolute;
  height: 150px;
  left: -10%;
  bottom: -8%;
}

.form {
  position: fixed;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--popup);
  color: var(--text-color);
  border: 1px solid var(--color-border);
  border-radius: 1.5rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  padding: 1.8rem;
  width: 400px;
  text-align: center;
}

form {
  margin-top: 1rem;
  width: 100%;
}


@media (max-width: 600px) {
  .form {
    width: 85%;
    padding: 1.8rem;
  }

  .poke-icon {
    top: -66%;
    left: -3%;
  }
}
</style>
