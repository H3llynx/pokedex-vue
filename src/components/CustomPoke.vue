<script setup>
import AttackIcon from '../components/icons/AttackIcon.vue'
import DefenseIcon from '../components/icons/DefenseIcon.vue'
import DeleteButton from './DeleteForm.vue'
import MoveButton from './MoveForm.vue'
import UpdateButton from './UpdateForm.vue'
const props = defineProps(['poke'])
const emit = defineEmits(['open-map, reload'])
</script>

<template>
  <div class="pokemon-card">
    <div class="inner-card">
      <div class="info-wrapper">
        <h3>{{ props.poke.name }}</h3><i>
          <DeleteButton :poke="poke" @reload="emit('reload')" />
        </i>
      </div>
      <div class="info-wrapper">
        <div class="image-wrapper">
          <img :src="props.poke.image" @click="emit('open-map')">
        </div>
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
      <div class="buttons-wrapper">
        <MoveButton :poke="poke" @reload="emit('reload')" />
        <UpdateButton :poke="poke" @reload="emit('reload')" />
      </div>
    </div>
  </div>
</template>

<style scoped>
i {
  color: var(--color-text);
  cursor: pointer;
}

i:hover {
  transform: rotate(3deg);
  color: #7D5FFF;
  transition: 0.4s;
}

.pokemon-card {
  position: relative;
  width: 180px;
  aspect-ratio: 3/4;
  background: var(--multicolor-gradient);
  background-size: var(--main-gradient-size);
  animation: gradientMove 3s infinite;
  padding: 0.1rem;
  border-radius: 1.5rem;
  box-shadow: 0 2px 12px rgba(64, 64, 64, 0.22);
  transition: 0.4s;
  border: 1px solid var(--color-border);
  display: flex;
}

.inner-card {
  border-radius: 1.3rem;
  padding: 1rem 0;
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--color-border);
  background: var(--color-background);
}

h3 {
  color: var(--color-heading);
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
}

ul i {
  color: var(--color-heading);
}

.info-wrapper {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem 1rem 0.9rem;
}

.image-wrapper {
  aspect-ratio: 1/1;
  border-radius: 50%;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
  border: 1px solid var(--color-border);
  cursor: pointer;
  overflow: hidden;
  max-width: 50%;
}

.pokemon-card img {
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
}

.buttons-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 95%;
}

@media (max-width: 600px) {
  h3 {
    font-size: 1rem;
  }

  ul {
    font-size: 0.8rem;
  }

  i {
    margin-right: 0;
  }
}
</style>
