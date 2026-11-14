# LDO FOOTBALL — Base de datos

Temporada de referencia: **2026-2027**.

## Objetivo
Construir una base mundial de fútbol femenino con clubes, selecciones absolutas y categorías juveniles cuando existan datos verificables.

## Archivos
- `data/equipos.json`: clubes y selecciones.
- `data/jugadoras.json`: información deportiva de las jugadoras.
- `index.html`: prototipo jugable 2D desde arriba.

## Campos previstos para equipos
`id`, `nombre`, `tipo` (club/seleccion), `pais`, `liga`, `categoria`, `escudo`.

## Campos previstos para jugadoras
`id`, `nombre`, `nacionalidad`, `fechaNacimiento`, `edad`, `posicion`, `dorsal`, `equipoId`, `ovr`, `ritmo`, `tiro`, `pase`, `regate`, `defensa`, `fisico`.

## Criterios de calidad
- No inventar nombres, edades, dorsales ni afiliaciones.
- Verificar las plantillas con fuentes oficiales de clubes, ligas y federaciones.
- Las valoraciones OVR y atributos serán estimaciones propias del videojuego, no puntuaciones oficiales.
- Registrar la fuente y la fecha de consulta al incorporar cada plantilla.

## Estado
- [x] Prototipo inicial de partido 2D.
- [x] Estructura JSON de equipos.
- [x] Estructura JSON de jugadoras.
- [ ] Incorporar clubes y plantillas verificadas por competición.
- [ ] Incorporar selecciones absolutas y juveniles verificadas.
- [ ] Conectar los datos al modo partido y al modo carrera.
