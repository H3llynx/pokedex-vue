import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PokemonList.vue'),
    },
    {
      path: '/pokemon/:pokeName',
      name: 'pokemon',
      props: true,
      component: () => import('../views/SingleView.vue'),
    },
    {
      path: '/fight',
      name: 'fight',
      component: () => import('../views/PokemonFight.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/PokemonMap.vue'),
    }
  ],
})

export default router
