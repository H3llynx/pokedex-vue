<script setup>
import { computed, onMounted, ref } from 'vue';
import { getTenPokes } from '../assets/js/service';
import Fighter from '../components/FighterView.vue';

const pokes = ref([])

onMounted(async () => {
  pokes.value = await getTenPokes()
})

const fighter1 = ref({ name: '', attack: 0, defense: 0, speed: 0 })
const fighter2 = ref({ name: '', attack: 0, defense: 0, speed: 0 })
const numberOfFighters = ref(0)
const battleSteps = ref([])

const battleReset = async () => {
  fighter1.value = { name: '', attack: 0, defense: 0, speed: 0 }
  fighter2.value = { name: '', attack: 0, defense: 0, speed: 0 }
  numberOfFighters.value = 0
  battleSteps.value = []
  pokes.value = await getTenPokes()
}

const capitalize = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const showSelected = (poke, attack, defense, speed) => {
  if (fighter1.value.name === '') {
    fighter1.value.name = capitalize(poke)
    fighter1.value.attack += attack
    fighter1.value.defense += defense
    fighter1.value.speed += speed
    numberOfFighters.value++
  }
  else if (fighter2.value.name === '' && fighter1.value.name.toLowerCase() !== poke) {
    fighter2.value.name = capitalize(poke)
    fighter2.value.attack += attack
    fighter2.value.defense += defense
    fighter2.value.speed += speed
    numberOfFighters.value++
  }
  if (numberOfFighters.value === 2) {
    setTimeout(() => {
      Fight(fighter1, fighter2)
    }, 2000)
  }
}

const Fight = (poke1, poke2) => {
  // Atacará el Pokémon con más velocidad, o el primero si ambos tienen la misma velocidad.
  // Si la fuerza del atacante es superior a la capacidad de defensa de su adversario, gana el atacante.
  if (poke1.value.speed >= poke2.value.speed) {
    battleSteps.value[0] = `${poke1.value.name} starts the fight!`
    setTimeout(() => {
      battleSteps.value[1] = `${poke1.value.name} attacks with a force of ${poke1.value.attack}.`
    }, 1000)
    setTimeout(() => {
      battleSteps.value[2] = `${poke2.value.name} defends with a defense of ${poke2.value.defense}.`
    }, 2000)
    setTimeout(() => {
      if (poke1.value.attack > poke2.value.defense) {
        battleSteps.value[3] = `The winner is ${poke1.value.name}`
      }
      else if (poke1.value.attack < poke2.value.defense) {
        battleSteps.value[3] = `The winner is ${poke2.value.name}`
      }
      else { battleSteps.value[3] = "It's a draw!" }
    }, 3000)
  }
  else {
    battleSteps.value[0] = `${poke2.value.name} starts the fight!`
    setTimeout(() => {
      battleSteps.value[1] = `${poke2.value.name} attacks with a force of ${poke2.value.attack}.`
    }, 1000)
    setTimeout(() => {
      battleSteps.value[2] = `${poke1.value.name} defends with a defense of ${poke1.value.defense}.`
    }, 2000)
    setTimeout(() => {
      if (poke2.value.attack > poke1.value.defense) {
        battleSteps.value[3] = `The winner is ${poke2.value.name}`
      }
      else if (poke2.value.attack < poke1.value.defense) {
        battleSteps.value[3] = `The winner is ${poke1.value.name}`
      }
      else { battleSteps.value[3] = "It's a draw!" }
    }, 3000)
  }
}

const battleArena = computed(() => {
  if (numberOfFighters.value < 2) return pokes.value
  else {
    return pokes.value.filter(poke =>
      poke.name === fighter1.value.name.toLowerCase() || poke.name === fighter2.value.name.toLowerCase()
    )
  }
})

</script>

<template>
  <main>
    <div class="battle-arena-wrapper">
      <h2>Battle Arena</h2>
      <img src="../assets/images/pokeball.png" alt="Poké Ball" class="pokeball" />
    </div>
    <section :class="{ 'victory-border': battleSteps[3], 'when-fighters': numberOfFighters >= 1 }">
      <p class="bold" v-if="numberOfFighters !== 2">Flip over 2 cards to reveal your fighters.</p>
      <div class="fighter" v-if="numberOfFighters >= 1">
        <p>Fighter 1: <span class="bold battle" v-if="fighter1.name">{{ fighter1.name }}</span></p>
        <p>Fighter 2: <span class="bold battle" v-if="fighter2.name">{{ fighter2.name }}</span></p>
      </div>
      <p class="fight-animation" v-if="numberOfFighters === 2">Fight !</p>
      <div v-if="fightStep">{{ fightStep }}</div>
      <output>
        <p class="battle" v-if="battleSteps[0]">{{ battleSteps[0] }}</p>
        <p class="battle" v-if="battleSteps[1]">{{ battleSteps[1] }}</p>
        <p class="battle" v-if="battleSteps[2]">{{ battleSteps[2] }}</p>
        <p class="result" v-if="battleSteps[3]">{{ battleSteps[3] }}</p>
      </output>
      <button tabindex="0" role="button" v-if="battleSteps[3]" @click="battleReset()">Replay</button>
    </section>

    <article :class="{ 'centered': numberOfFighters === 2 }">
      <Fighter class="fight-card" v-for="poke in battleArena" :key="poke.name" :poke="poke" @selected="showSelected" />
    </article>
  </main>
</template>

<style scoped>
@keyframes textRiseFade {
  0% {
    opacity: 0;
    transform: translateY(0);
  }

  20% {
    opacity: 1;
    transform: translateY(-20px);
  }

  80% {
    opacity: 1;
    transform: translateY(-40px);
  }

  100% {
    opacity: 0;
    transform: translateY(-60px);
  }
}

@keyframes electricZap {

  0%,
  100% {
    text-shadow:
      0 0 4px var(--electric-fade),
      0 0 8px var(--electric-zap),
      0 0 12px var(--electric-glow),
      0 0 18px var(--electric-zap),
      0 0 24px var(--electric-fade);
  }

  50% {
    text-shadow:
      0 0 2px var(--electric-glow),
      0 0 6px var(--electric-zap),
      0 0 16px var(--electric-fade),
      0 0 22px var(--electric-fade);
  }
}

@keyframes electricSlide {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    text-shadow: none;
  }

  60% {
    opacity: 1;
    transform: translateY(0) scale(1.03);
    text-shadow:
      0 0 6px var(--electric-glow),
      0 0 12px var(--electric-fade);
  }

  100% {
    transform: scale(1);
    text-shadow: none;
  }
}

@keyframes shockwavePop {
  0% {
    opacity: 0;
    transform: scale(0.8);
    text-shadow: none;
  }

  50% {
    opacity: 1;
    transform: scale(1.15);
    text-shadow:
      0 0 6px var(--electric-base),
      -2px 2px 12px var(--electric-glow),
      2px -2px 18px var(--electric-pop),
      0 0 25px var(--electric-white);
  }

  100% {
    transform: scale(1);
    text-shadow:
      0 0 5px var(--electric-base),
      0 0 8px var(--electric-zap);
  }
}

@keyframes borderElectricRun {
  0% {
    box-shadow:
      inset 0 0 0px var(--electric-zap),
      0 0 0px var(--electric-zap);
  }

  20% {
    box-shadow:
      inset 2px 0 4px var(--electric-zap),
      -2px 0 6px var(--electric-glow);
  }

  40% {
    box-shadow:
      inset 0 2px 4px var(--electric-glow),
      0 -2px 6px var(--electric-pop);
  }

  60% {
    box-shadow:
      inset -2px 0 4px var(--electric-zap),
      2px 0 6px var(--electric-glow);
  }

  80% {
    box-shadow:
      inset 0 -2px 4px var(--electric-glow),
      0 2px 6px var(--electric-pop);
  }

  100% {
    box-shadow:
      inset 0 0 0px transparent,
      0 0 10px var(--electric-zap);
  }
}

@keyframes sectionBackground {
  from {
    background: transparent;
  }

  to {
    background: var(--background-block);
  }
}

section {
  padding: 1.5rem 0.6rem;
  margin: 2.5rem auto 0 auto;
  border-radius: 2rem;
  text-align: center;
  max-width: 600px;
}

.when-fighters {
  animation: borderElectricRun 1.4s forwards, sectionBackground 2s forwards;
  border: 1px solid var(--electric-base);
}

.victory-border {
  animation: replayPulse 2.4s forwards;
  border: 0;
  background: var(--background-block);
}

.fight-animation {
  position: absolute;
  width: 100%;
  left: 0;
  font-size: clamp(4.5rem, 2.5vw, 6rem);
  z-index: 1;
  padding: 0 0.5rem;
  text-align: center;
  font-family: 'Pokemon Solid', sans-serif;
  color: var(--color-heading);
  animation: electricZap 1s infinite ease-in-out,
    textRiseFade 2.2s ease forwards;
}

.fighter {
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  z-index: 1;
}

.fighter p {
  width: 50%;
}

.fighter p:first-child {
  border-right: 1px solid var(--color-border);
}

output {
  display: block;
  text-align: center;
}

.battle-arena-wrapper {
  position: relative;
  display: block;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 0 10px var(--electric-zap);
  border-radius: 2rem;
  background-image: var(--multicolor-gradient);
  background-size: var(--main-gradient-size);
  animation: var(--main-background-animation);
}

h2 {
  padding: 0.4rem 1.5rem;
  color: var(--background-block);
  font-family: 'Pokemon Solid', sans-serif;
  font-weight: 700;
  font-size: clamp(2.2rem, 3vw, 3rem);
  position: relative;
  z-index: 1;
}

.pokeball {
  position: absolute;
  top: 38%;
  right: -8%;
  transform: translateY(-50%);
  width: 32%;
  max-width: 150px;
}

.battle {
  animation: electricSlide 0.5s ease-out forwards;
}

.result {
  margin: 1rem 0;
  font-weight: 700;
  font-size: 1.6rem;
  animation: shockwavePop 1.2s ease-out forwards;

}

button {
  border: 0;
  margin-top: 1rem;
  padding: 0.7em 2.2em;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 2rem;
  background: linear-gradient(90deg, var(--electric-base) 60%, var(--vt-c-pika-yellow) 100%);
  color: var(--vt-c-black-mute);
  box-shadow:
    0 6px 24px 0 rgba(63, 247, 255, 0.12),
    0 1.5px 6px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: 0.4s;
  animation: replayPulse 2.4s ease-in-out infinite;
  letter-spacing: 0.02em;
}

button:hover,
button:focus {
  background: linear-gradient(90deg, var(--vt-c-pika-yellow) 20%, var(--electric-base) 90%);
  box-shadow:
    0 0 16px var(--electric-pop),
    0 0 28px var(--vt-c-pika-yellow),
    0 0 0.5em #fff3;
}

@media (max-width: 600px) {
  main {
    padding-left: 0;
    padding-right: 0;
  }

  .battle-arena-wrapper {
    width: 90%;
    background: var(--input-border);
    border: 1px solid var(--electric-base);
  }

  h2 {
    color: transparent;
    background: var(--multicolor-gradient);
    background-size: var(--main-gradient-size);
    animation: var(--main-background-animation);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  section {
    margin: 2rem 5% 0 5%;
  }

  article {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    height: auto;
    padding: 2rem 5%;
    margin-top: 0;
  }

  .fight-card {
    flex: 0 0 45%;
    scroll-snap-align: center;
  }

  .centered {
    justify-content: center;
  }

  .result {
    font-size: 1.6rem;
  }

  .fighter span {
    display: block;
  }
}
</style>
