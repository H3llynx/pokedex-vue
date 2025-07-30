<script setup>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { onMounted, ref } from 'vue'
import pokeMarker from '../assets/images/marker.png'
import { getCustomPoke } from '../assets/js/service'
import CreateForm from '../components/CreationForm.vue'
import Custom from '../components/CustomPoke.vue'

const mapContainer = ref(null)
const map = ref(null)
const pokes = ref([])
const markers = ref([])

const mapLayers = {
  "Map": L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }),
  "Satellite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles © Esri'
  })
}
const pokeIcon = L.icon({
  iconUrl: pokeMarker,
  iconSize: [24, 32],
  iconAnchor: [12, 32],
  popupAnchor: [0, -30]
});

const createMarker = (poke) => {
  const { name, image, latitude, longitude, attack, defense } = poke
  const popupContent = `<div class="popup-img"><img src="${image}"></div><div><h3>${name}</h3><p>Attack: ${attack}</p><p>Defense: ${defense}</p></div>`
  const marker = L.marker([latitude, longitude], { icon: pokeIcon })
  marker.bindPopup(popupContent)
  return marker;
}

const addToMap = async () => {
  const data = await getCustomPoke()
  pokes.value = data
  markers.value.forEach(marker => marker.remove())
  markers.value = []
  pokes.value.forEach(poke => {
    const marker = createMarker(poke)
    poke.marker = marker
    markers.value.push(marker)
    marker.addTo(map.value)
  })
  const group = new L.featureGroup(markers.value)
  map.value.fitBounds(group.getBounds().pad(0.3))
}

const initMap = () => {
  map.value = L.map(mapContainer.value, {
    center: [43.027974, 0.073914],
    zoom: 2,
    layers: [mapLayers.Satellite]
  });
  L.control.layers(mapLayers, null, { collapsed: false }).addTo(map.value);
};

const open = (poke) => {
  poke.marker.openPopup()
}


onMounted(() => {
  initMap()
  addToMap()
})

</script>
<template>
  <main>
    <section>
      <h2>Create your Pokémon</h2>
      <CreateForm class="form" @reload="addToMap" />
      <div ref="mapContainer" class="map"></div>
      <h2>Created Pokémons:</h2>
      <p>Click on any of the custom Pokémon to locate them on the map.</p>
      <article>
        <Custom class="card" role="button" tabindex="0" v-for="poke in pokes" :key="poke.id" :poke="poke"
          @open-map="open(poke)" @reload="addToMap" />
      </article>
    </section>
  </main>
</template>

<style scoped>
section {
  width: 600px;
  margin: 0 auto;
}

h2 {
  color: var(--color-heading);
  font-size: 1.5rem;
}

.form {
  width: 100%;
  margin: 1rem 0 2.5rem 0;
}

.map {
  width: 100%;
  height: 300px;
  border-radius: 1.5rem;
  border: 1px solid var(--popup);
  box-shadow:
    rgba(50, 50, 93, 0.15) 0px 12px 24px -6px,
    rgba(0, 0, 0, 0.12) 0px 6px 12px -6px;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 0;
}

:deep(.leaflet-control-layers) {
  background: var(--color-background);
  border: 1px solid var(--map-controls);
  color: var(--color-text);
  font-family: "Maven Pro", sans-serif;
  font-size: 12px;
}

:deep(.leaflet-control-zoom) {
  background: var(--color-background);
  border: 1px solid var(--map-controls);
}

:deep(.leaflet-control-zoom-in) {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

:deep(.leaflet-control-zoom-out) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.leaflet-popup-content-wrapper) {
  background: var(--color-background);
  padding: 2px 10px 2px 0px;
  border: 1px solid var(--color-border);
}

:deep(.leaflet-popup-content) {
  margin: 10px;
  color: var(--color-text);
  white-space: nowrap;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: auto !important;
  max-width: 200px;
}

:deep(.leaflet-popup-content h3) {
  margin: 0 0 5px 0;
}

:deep(.leaflet-popup-content p) {
  margin: 0;
  opacity: 0.7;
  font-size: 0.75rem;
}

:deep(.leaflet-popup-tip) {
  background: var(--color-background);
  border: 1px solid var(--color-border);
}

:deep(.popup-img) {
  aspect-ratio: 1/1;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}

:deep(.popup-img img) {
  width: 45px;
}

article {
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin-top: 2rem;
}

@media (min-width: 1024px) and (max-width: 1200px) {
  section {
    width: 520px;
  }
}

@media (max-width: 700px) {
  main {
    padding-left: 0;
    padding-right: 0;
  }

  section {
    width: 100%;
  }

  .map {
    width: 90%;
    margin: 0 auto 2.5rem auto;
  }

  .form,
  h2,
  p {
    padding-left: 5%;
    padding-right: 5%;
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

  .card {
    flex: 0 0 50%;
    scroll-snap-align: center;
  }
}
</style>
