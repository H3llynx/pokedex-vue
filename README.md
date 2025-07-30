# Pokedex app

# Aplicación Vue con tres vistas principales:
 - Lista de Pokemons: Muestra una lista de 10 Pokémons aleatorios obtenidos de la API, presentados en cartas con información básica (nombre, imagen, ataque y defensa). Incluye un iltro de búsqueda en tiempo real para filtrar Pokémons por nombre en la vista principal, y un botón para refrescar la lista inicial y mostrar 10 nuevos Pokémons aleatorios.

 - Vista individual: Al seleccionar una carta, se muestra una vista más detallada del Pokémon seleccionado (nombre, imagen, ataque, defensa, tipo, hp, velocidad, habilidades, generación, y si es legendario, mitico o standard).

 - Combate: Vista con cartas boca abajo que el usuario puede seleccionar para enfrentar dos Pokémons. El combate se decide comparando el ataque del primero contra la defensa del segundo, considerando la velocidad para determinar quién ataca primero y mostrando el resultado del enfrentamiento.

 - El header incluye un selector de tema claro/oscuro que reconoce la preferencia inicial del sistema operativo del usuario. Permite cambiar entre modo claro y oscuro (o quedarse con la configuración de sistema)
 y guarda la elección del usuario en Local Storage para mantener la preferencia.

# Funcionalidades adicionales implementadas:
 - Creación de Pokémons personalizados usando Retool.
 - Vista con formulario para añadir nuevos Pokémons con coordenadas geográficas.
 - Mapa interactivo con Leaflet que muestra los Pokémons creados.
 - Cartas de los Pokémons personalizados con botones para mover, actualizar y eliminar los Pokémons; el mapa se actualiza automáticamente tras cada acción.