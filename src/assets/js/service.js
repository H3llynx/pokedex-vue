const baseUrl = 'https://pokeapi.co/api/v2'
const retoolURL = 'https://retoolapi.dev/GHU2tQ/data/'

export const getPokeInfo = async (idOrName) => {
  const response = await fetch(`${baseUrl}/pokemon/${idOrName}`)
  const data = await response.json()
  const info = {
    // Información de la vista básica (para presentar en la lista de Pokémons):
    name: data.name,
    image: data.sprites.front_default,
    attack: data.stats.find(stat => stat.stat.name === "attack").base_stat,
    defense: data.stats.find(stat => stat.stat.name === "defense").base_stat,
    // Información ampliada (para la vista individual + combate):
    hp: data.stats.find(stat => stat.stat.name === "hp").base_stat,
    speed: data.stats.find(stat => stat.stat.name === "speed").base_stat,
    types: data.types.map(type => type.type.name),
    abilities: data.abilities.map(ability => ability.ability.name),
    // Para poder recuperar aún más datos desde otro URL (función siguiente):
    species: data.species.name
  }
  return info
}


export const getSpecieInfo = async (idOrName) => {
  const { species } = await getPokeInfo(idOrName);
  const response = await fetch(`${baseUrl}/pokemon-species/${species}`)
  const data = await response.json()
  const info = {
    generation: data.generation.name.replace("generation-", ""),
    genus: data.genera.filter(genus => genus.language.name === "en").map(genus => genus.genus).toString(),
    legendary: data.is_legendary,
    mythical: data.is_mythical
  }
  return info
}

export const getTenPokes = async () => {
  let ids = new Set();
  while (ids.size < 10) {
    ids.add(Math.floor(Math.random() * 1025 + 1)) // Tengo entendido que hay 1025 pokémons referenciados en la API
  }
  const promises = []
  for (const id of ids) {
    promises.push(getPokeInfo(id))
  }
  const pokes = await Promise.all(promises)
  return pokes
}

export const getCustomPoke = async () => {
  const response = await fetch(retoolURL)
  const data = await response.json()
  return data
}

export const moveCustomPoke = async () => {
}
