<script setup>
import { ref } from 'vue'
import AttackIcon from '../components/icons/AttackIcon.vue'
import DefenseIcon from '../components/icons/DefenseIcon.vue'
import SpeedIcon from '../components/icons/SpeedIcon.vue'

const props = defineProps(['poke'])
const emit = defineEmits(['selected'])

const backgroundColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#E1736E',
  poison: '#CC7ACA',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#A793C0',
  dragon: '#A480FD',
  dark: '#A88973',
  steel: '#B7B7CE',
  fairy: '#D685AD',
  stellar: '#27B4FE'
};
const setCardBackground = () => {
  if (props.poke.types.length > 1) {
    return `linear-gradient(120deg, ${backgroundColors[props.poke.types[0]]}, ${backgroundColors[props.poke.types[1]]})`
  }
  else {
    return backgroundColors[props.poke.types]
  }
}

const selected = ref(false);
const flip = () => {
  if (selected.value === false) {
    selected.value = true
  }
  emit('selected', props.poke.name, props.poke.attack, props.poke.defense, props.poke.speed)
}

</script>

<template>
  <div class="card-container" tabindex="0" role="button" @click="flip" :class="{ 'flipped': selected }">
    <div class="card">
      <div class="front-face">
        <div class="front-inner" :style="{ background: setCardBackground() }">
          <h3>{{ props.poke.name }}</h3>
          <img :src="props.poke.image">
          <span class="bold">
            <i style="margin-right: 0;">
              <SpeedIcon />
            </i> {{ props.poke.speed }}
          </span>
          <ul>
            <li>
              <i>
                <AttackIcon />
              </i> <span class="bold">{{ props.poke.attack }}</span>
            </li>
            <li>
              <i>
                <DefenseIcon />
              </i> <span class="bold">{{ props.poke.defense }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="back-face">
        <img class="back-inner" src="../assets/images/card_back.png" alt="Card Back">
      </div>
    </div>
  </div>

</template>

<style scoped>
.card-container {
  width: 200px;
  aspect-ratio: 3/4;
  background-color: transparent;
  perspective: 1000px;
  transition: 0.6s;
}

.card {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transform: rotateY(180deg);
}

.card-container:focus,
.card-container:hover {
  transform: scale(1.05) rotate3d(1.5, 0, 1, 10deg);
}

.card-container.flipped .card {
  transform: rotateY(0deg);
}

.back-face {
  transform: rotateY(180deg);
}

.front-face,
.back-face {
  background: var(--card-border-gradient);
  background-size: var(--main-gradient-size);
  animation: gradientMove 3s infinite;
  padding: 0.3rem;
  border-radius: 1.5rem;
  box-shadow: 0 2px 12px rgba(64, 64, 64, 0.22);
  cursor: pointer;
  color: var(--vt-c-black);
  border: 1px solid var(--color-border);
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
}

.back-inner {
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  border-radius: 1.2rem;
}

.front-inner {
  border-radius: 1.2rem;
  padding: 1rem 0;
  flex: 1 1 0%;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-border);
}

.front-inner img {
  max-width: 90%;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));
  padding: 0.5rem 2rem;
  background-image: url(../assets/images/card_img.png);
  background-size: cover;
}

h3 {
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: 0 0.5rem;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-image: var(--card-border-gradient) 1;
}

@media (max-width: 600px) {
  .front-inner {
    padding: 0.5rem 0;
  }

  h3 {
    font-size: 1rem;
  }

  ul {
    font-size: 0.8rem;
  }

  i {
    margin-right: 0;
  }

  .card-container:focus,
  .card-container:hover {
    transform: none;
  }
}
</style>
