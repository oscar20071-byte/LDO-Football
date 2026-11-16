# Football Journey

Juego original de fútbol masculino con clubes y plantillas reales, partido en 3D y modo carrera. Tiene identidad visual y código propios.

## Partidos 3D
- Campo tridimensional renderizado con Three.js.
- Futbolistas 3D con cabeza, cuerpo, brazos, piernas, camisetas y dorsales.
- Cámara inclinada con perspectiva de estadio.
- Balón con posesión, movimiento, pases, tiros y goles.
- Inteligencia artificial básica para compañeros y rivales.
- Controles de teclado y botones táctiles.

## Controles
- WASD o flechas: mover al futbolista seleccionado.
- J: pasar.
- K: tirar.
- L: cambiar al jugador propio más cercano al balón.
- Espacio o Shift: sprint.
- Botones en pantalla: pase, tiro, cambiar y pausar.

Si el jugador seleccionado no tiene el balón, pase y tiro intentan recuperar la posesión si está cerca. Si está lejos, muestra un aviso para acercarse al balón.

## Clubes y plantillas
Incluye Real Madrid, FC Barcelona, Manchester City, Liverpool FC, Bayern München, Paris Saint-Germain, Juventus e Inter de Milán. La base de datos incluye futbolistas, dorsales, posiciones, nacionalidades y fuentes de referencia en `data/jugadores.json`.

## Tecnología
- Three.js 0.180.0 cargado como módulo desde jsDelivr.
- JavaScript sin backend.
- Guardado de carrera local en el navegador.
- Para jugar, abre la versión publicada mediante GitHub Pages o un servidor web local. No abras el HTML directamente como archivo si el navegador bloquea módulos o solicitudes de datos.

## Pendiente
Mejorar animaciones y movimientos, físicas, porteros, faltas, árbitros, sustituciones, audio, multijugador y pruebas en distintos dispositivos.
