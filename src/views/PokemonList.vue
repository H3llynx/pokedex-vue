<script setup>
import { computed, onMounted, ref } from 'vue';
import { getTenPokes } from '../assets/js/service';
import Card from '../components/CardView.vue';

const pokes = ref([])
const pokeName = ref('')

const loadPokes = async () => {
  pokeName.value = ''
  pokes.value = []
  pokes.value = await getTenPokes()
}

onMounted(async () => {
  loadPokes()
})

const filteredPokes = computed(() => {
  if (!pokeName.value) return pokes.value
  else {
    return pokes.value.filter(poke =>
      poke.name.toLowerCase().includes(pokeName.value.toLowerCase().trim())
    )
  }
})

</script>

<template>
  <main>
    <div class="wrapper">
      <img src="../assets/images/search.png">
      <div id="search">
        <h3>Search</h3>
        <label for="poke-search">Use the Advanced Search to find a Pokémon by name:</label>
        <input type="search" id="poke-search" v-model="pokeName" />
      </div>
    </div>
    <article>
      <Card class="card" v-for="poke in filteredPokes" :key="poke.name" :poke="poke" />
    </article>
    <div class="wrapper">
      <img class="snake-poke" src="../assets/images/pointing-right.png" />
      <div>
        <p class="bold">Click here to load new Pokémons:</p>
        <button tabindex="0" role="button" @click="loadPokes()">Refresh</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
@keyframes neonPulse {

  0%,
  100% {
    box-shadow: 0 0 2px #949fb6;
  }

  50% {
    box-shadow:
      0 0 10px #b0bfd4,
      0 0 20px #ebe6df;
  }
}

.wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
}

.wrapper:last-child {
  align-items: center;
  justify-content: flex-end;
  margin-top: 3rem;
}

.wrapper img {
  width: 100px;
}

#search {
  display: flex;
  flex-direction: column;
}

input {
  background: var(--vt-c-white);
  margin-top: 10px;
  max-width: 220px;
  padding: 0.5rem 0.8em;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  font-size: 0.8rem;
}

button {
  border: 1px solid var(--color-border);
  display: block;
  margin: 1rem auto;
  padding: 0.7em 2.2em;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 2rem;
  background: linear-gradient(90deg, #b0bfd4 60%, #ebe6df 100%);
  color: var(--vt-c-black-mute);
  box-shadow:
    0 6px 24px rgba(63, 247, 255, 0.12),
    0 1.5px 6px rgba(0, 0, 0, 0.05);
  transition: 0.4s;
  animation: neonPulse 2.4s ease-in-out infinite;
  letter-spacing: 0.02em;
}

button:hover,
button:focus {
  animation: none;
  background: linear-gradient(90deg, #ebe6df 20%, #b0bfd4 90%);
  box-shadow:
    0 0 28px #ebe6df,
    0 0 0.5em #fff3;
}

h3 {
  width: 100%;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (max-width: 600px) {
  article {
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  }

  .wrapper {
    align-items: center;
  }

  .wrapper:last-child {
    gap: 0;
    text-align: center;
  }
}
</style>
