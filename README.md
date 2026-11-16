# Football Journey

Juego original de fútbol masculino con partidos en vista cenital, modo carrera y competición. Tiene identidad visual y código propios; no utiliza código ni recursos protegidos de World Soccer Champs.

## Clubes y plantillas reales
Incluye ocho clubes masculinos reales: Real Madrid, FC Barcelona, Manchester City, Liverpool FC, Bayern München, Paris Saint-Germain, Juventus e Inter de Milán.

La base de datos contiene **212 futbolistas reales** de las plantillas consultadas para la temporada 2026/27, con nombre, dorsal, posición, nacionalidad y fuente de referencia por jugador. Los datos se consultaron el 16 de noviembre de 2026 en páginas oficiales de clubes y UEFA. Las plantillas pueden variar entre competiciones nacionales y UEFA, y se deben actualizar tras cambios confirmados.

## Primera base jugable
- Partidos en vista cenital con control directo.
- Movimiento WASD/flechas, pase, tiro, cambio de jugador y sprint.
- Los dorsales de los futbolistas aparecen en el terreno.
- Modo carrera, entrenamiento, descanso y cambio de club.
- Vista de club con plantilla real, dorsal, posición y nacionalidad.
- Liga de demostración entre los ocho clubes (no representa una competición oficial).
- Guardado local, sin cuentas ni backend.

## Controles
- WASD / flechas: mover.
- J: pase.
- K: tiro.
- L: cambiar jugador.
- Espacio: sprint.

## Datos
- `data/equipos.json`: clubes reales y sus ligas nacionales.
- `data/jugadores.json`: futbolistas, dorsales, posiciones y fuentes por club.
- `data/selecciones.json`: catálogo inicial de selecciones masculinas; todavía faltan convocatorias completas verificadas.

## Publicar
GitHub Pages desde `main`, carpeta raíz. La página carga las plantillas desde `data/jugadores.json`.

## Pendiente
Completar convocatorias nacionales, ampliar plantillas domésticas cuando difieran de UEFA, incorporar competiciones oficiales completas y probar en navegador móvil y escritorio.
