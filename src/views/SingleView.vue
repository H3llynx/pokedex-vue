<script setup>
import AbilityIcon from '@/components/icons/AbilityIcon.vue';
import AttackIcon from '@/components/icons/AttackIcon.vue';
import DefenseIcon from '@/components/icons/DefenseIcon.vue';
import SpeedIcon from '@/components/icons/SpeedIcon.vue';
import StarIcon from '@/components/icons/StarIcon.vue';

import { onMounted, ref } from 'vue';
import { getPokeInfo, getSpecieInfo } from "../assets/js/service";

const props = defineProps(['pokeName'])
const poke = ref({})
const specie = ref({})

onMounted(async () => {
  const base = await getPokeInfo(props.pokeName)
  const extra = await getSpecieInfo(props.pokeName)
  poke.value = base
  specie.value = extra
})

</script>

<template>
  <main>
    <section>
      <div class="inner">
        <div class="container">
          <h1>{{ pokeName }}</h1>
          <p class="bold">HP: {{ poke.hp }}</p>
        </div>
        <p class=" genus">{{ specie.genus }}</p>
        <div class="container">
          <span class="bold"><i style="margin-right: 0;">
              <SpeedIcon />
            </i> {{ poke.speed }}</span>
          <p v-if="specie.legendary">
            <StarIcon /><span class="legendary">
              Legendary
            </span>
            <StarIcon />
          </p>
          <p v-else-if="specie.mythical">
            <StarIcon /><span class="mythical">
              Mythical
            </span>
            <StarIcon />
          </p>
          <p v-else>
            Standard Pokémon
          </p>
        </div>

        <img :src="poke.image">

        <div class="container2">
          <div class="half">
            <h2>Abilities:</h2>
            <ul>
              <li v-for="ability in poke.abilities" :key="ability">
                <i>
                  <AbilityIcon />
                </i>{{ ability }}
              </li>
            </ul>
          </div>
          <div class="half">
            <h2>Types:
              <span class="list" v-for="type in poke.types" :key="type"> {{ type }}</span>
            </h2>
            <h2>Generation:<span class="generation"> {{ specie.generation }}</span></h2>
          </div>
        </div>
        <div class="container">
          <span class="bold"><i>
              <AttackIcon />
            </i>{{ poke.attack }}</span>

          <span class="bold"><i>
              <DefenseIcon />
            </i>{{ poke.defense }}</span>
        </div>
      </div>
    </section>

  </main>
</template>

<style scoped>
main {
  background-image: url(../assets/images/bottom.png);
  background-size: cover;
  background-position: bottom;
  filter: drop-shadow(2px 2px 8px rgba(64, 64, 64, 0.6));
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6% 8% 10% 8%;
}

section {
  width: 100%;
  max-width: 400px;
  border-radius: 1.5rem;
  background: var(--card-border-gradient);
  background-size: var(--main-gradient-size);
  animation: gradientMove 3s infinite;
  padding: 0.3rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  transition: 0.6s;
  border: 1px solid var(--color-border);
  aspect-ratio: 3/4;
  color: var(--color-heading);
  display: flex;
}

.inner {
  flex: 1 1 0%;
  min-width: 0;
  min-height: 0;
  border-radius: 1.2rem;
  background: var(--single-card);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-image: url(../assets/images/single_card.png);
  background-position: center;
  background-size: cover;
}

.genus {
  background: var(--card-border-gradient);
  background-size: var(--main-gradient-size);
  animation: gradientMove 3s infinite;
  width: 100%;
  text-align: center;
  color: var(--vt-c-black);
  padding: 0.5rem;
}

.container,
.container2 {
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}

.container2 {
  margin-bottom: auto;
}

.container:first-child {
  border-bottom: 1px solid transparent;
  border-image: var(--card-border-gradient) 1;
  background: var(--card-inside-gradient);
  background-size: var(--main-gradient-size);
  animation: insideCard 6s infinite;
}

.container:last-child {
  border-top: 1px solid transparent;
  border-image: var(--card-border-gradient) 1;
  background: var(--card-inside-gradient);
  background-size: var(--main-gradient-size);
  animation: insideCard 6s infinite;
}

h1 {
  font-size: 1.5rem;
  margin: 0;
  text-transform: capitalize;
  font-weight: 500;
}

h2 {
  font-size: 1.1rem;
  margin: 0;
  font-weight: 600;
  text-align: left;
}

.half {
  width: 50%;
}

img {
  margin: auto;
  max-width: 70%;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));
  padding: 0.5rem 2rem;
  background-image: url(../assets/images/card_img.png);
  background-size: cover;
  background-position: center;
}

.mythical,
.legendary {
  font-weight: 700;
  vertical-align: top;
}

.mythical {
  background-image: var(--multicolor-gradient);
  background-size: var(--main-gradient-size);
  animation: var(--main-background-animation);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

ul {
  list-style: none;
  width: 100%;
  padding: 0;
  text-transform: capitalize;
}

.list {
  display: inline-block;
  text-transform: capitalize;
  margin: 0 5px
}

.generation {
  text-transform: uppercase;
  margin: 0 5px;
}

@media (max-width: 600px) {
  main {
    padding-top: 3rem;
    padding-bottom: 8rem;
    background-position: 70% 100%;
  }

  .inner,
  span {
    font-size: 90%;
  }

  h2 {
    font-size: 1rem;
  }

  ul i {
    width: 1.2rem;
    height: 1.2rem;
  }
}
</style>
