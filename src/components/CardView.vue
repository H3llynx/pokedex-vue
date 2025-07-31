<script setup>
import AttackIcon from '../components/icons/AttackIcon.vue';
import DefenseIcon from '../components/icons/DefenseIcon.vue';

const props = defineProps(['poke'])

// Para definir el color de fondo de la carta en función del/de los tipos del Pokémon:
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
</script>

<template>

  <div class="pokemon-card" role="button" tabindex="0"
    @click="$router.push({ name: 'pokemon', params: { pokeName: props.poke.name } })">
    <div class="inner-card" :style="{ background: setCardBackground() }">
      <h3>{{ props.poke.name }}</h3>
      <div class="img-wrapper"><img :src="props.poke.image"></div>
      <ul>
        <li><i>
            <AttackIcon />
          </i> <span class="bold">{{ props.poke.attack }}</span>
        </li>
        <li><i>
            <DefenseIcon />
          </i> <span class="bold">{{ props.poke.defense }}</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>
.pokemon-card {
  width: 200px;
  aspect-ratio: 3/4;
  background: var(--card-border-gradient);
  background-size: var(--main-gradient-size);
  animation: gradientMove 3s infinite;
  padding: 0.3rem;
  border-radius: 1.5rem;
  box-shadow: 0 2px 12px rgba(64, 64, 64, 0.22);
  transition: 0.6s;
  cursor: pointer;
  color: var(--vt-c-black);
  border: 1px solid var(--color-border);
  display: flex;
}

.inner-card {
  border-radius: 1.2rem;
  padding: 1rem 0;
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-border);
}

.pokemon-card:hover,
.pokemon-card:focus {
  transform: scale(1.05) rotate3d(1.5, 0, 1, 10deg);
}

.pokemon-card:active {
  filter: brightness(0.6);
}

.img-wrapper {
  background-image: var(--card-inside-gradient);
  background-size: var(--main-gradient-size);
  animation: insideCard 6s infinite;
  width: 90%;
}

.pokemon-card img {
  width: 100%;
  height: 100%;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid transparent;
  border-image: var(--card-border-gradient) 1;
  padding: 0.5rem 2rem;
  background-image: url(../assets/images/card_img.png);
  background-size: cover;
  background-position: center;
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
  .pokemon-card {
    width: 100%;
    max-width: 200px;
  }

  .inner-card {
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

  .pokemon-card:hover,
  .pokemon-card:focus {
    transform: none;
  }
}
</style>
