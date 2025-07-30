<script setup>
import { RouterLink, RouterView } from 'vue-router';
import ThemeSelection from './components/ThemeSelection.vue';
</script>

<template>
  <header>
    <ThemeSelection />
    <div class="center">
      <h1>Pokedex</h1>
      <img alt="Vue logo" class="logo" src="./assets/images/logo.png" />
    </div>
    <nav>
      <RouterLink tabindex="0" role="button" to="/">Home <img src="./assets/images/top-nav.png" class="top-nav nav-1" />
      </RouterLink>
      <RouterLink tabindex="0" role="button" to="/fight">Fight <img src="./assets/images/top-nav-2.png"
          class="top-nav nav-2" />
      </RouterLink>
      <RouterLink tabindex="0" role="button" to="/create">Create your Pokemon <img src="./assets/images/top-nav-3.png"
          class="top-nav nav-3" /></RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
@keyframes moveOverlay {
  0% {
    background-position: 0% 0%;
  }

  50% {
    background-position: 100% 100%;
  }

  100% {
    background-position: 0% 0%;
  }
}

header {
  width: 100%;
  background-image: url(./assets/images/background.png);
  background-size: cover;
  box-shadow: 0 0 10px 3px black;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0.5rem;
}

header::after {
  content: "";
  position: absolute;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(160deg, rgba(0, 0, 0, 0.8), transparent 50%);
  background-size: 100% 150%;
  animation: moveOverlay 5s ease-in-out infinite;
}

.center {
  margin: 2.5rem 0;
}

h1 {
  font-size: 5rem;
  text-align: center;
  font-family: 'Pokemon Solid', sans-serif;
  color: var(--vt-c-pika-yellow);
  filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.7));
  text-shadow:
    2px 2px 0 var(--vt-c-black),
    -2px -2px 0 var(--vt-c-black),
    2px -3px 0 var(--vt-c-black),
    -2px 2px 0 var(--vt-c-black);
  position: relative;
  z-index: 3;
}

.logo {
  display: block;
  margin: auto;
  width: 125px;
  position: relative;
  z-index: 1;
}

.top-nav {
  visibility: hidden;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  filter: drop-shadow(0 -2px 10px rgba(0, 0, 0, 0.6));
}

.nav-1 {
  width: 60px;
  top: -148%;
}

.nav-2 {
  width: 55px;
  top: -144%;
}

.nav-3 {
  width: 105px;
  top: -206%;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
}

nav a.router-link-exact-active {
  background: rgba(162, 186, 180, 0.189);
}

nav a.router-link-exact-active:hover {
  animation: none;
}

nav a {
  position: relative;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  color: var(--color-nav-a);
  -webkit-text-fill-color: var(--color-nav-a);
  padding: 0.4rem 1.5rem;
  border-radius: 2rem;
  background: var(--color-background);
  font-weight: 500;
  margin: 5px;
}

nav a:hover {
  animation: replayPulse 2.4s ease-in-out;
  outline: 0;
}

@media (min-width: 1024px) {
  header {
    height: 100dvh;
    position: sticky;
    top: 0;
  }
}

@media (max-width: 600px) {
  header {
    gap: 20px;
    padding: 2rem 0 0 0;
    box-shadow: none;
  }

  nav {
    justify-content: space-between;
    bottom: -1px;
  }

  nav a {
    flex: 1 1 auto;
    background: none;
    margin: 0;
    box-shadow: none;
    border-radius: 1.2rem 1.2rem 0 0;
    padding: 0.5rem 1.3rem 0.2rem 1.3rem;
    background: var(--mobile-menu);
  }

  nav a:hover {
    animation: none;
    transition: 0.3s ease;
  }

  nav a.router-link-exact-active {
    background: var(--color-background);
    border-top: 1px solid rgba(147, 147, 161, 0.25);
    border-left: 1px solid rgba(147, 147, 161, 0.25);
    border-right: 1px solid rgba(147, 147, 161, 0.25);
    font-weight: bold;
  }

  nav a.router-link-exact-active .top-nav {
    visibility: visible;
  }

  .logo {
    display: none;
  }

  h1 {
    font-size: 3.6rem;
  }

}
</style>
