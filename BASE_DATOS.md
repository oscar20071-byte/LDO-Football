# LDO FOOTBALL — Base de datos

Temporada de referencia: **2026-2027**.

## Objetivo
Construir una base mundial de fútbol femenino con clubes, selecciones absolutas y categorías juveniles cuando existan datos verificables.

## Archivos
- `data/equipos.json`: catálogo de clubes.
- `data/selecciones.json`: catálogo de selecciones nacionales y categorías.
- `data/jugadoras.json`: información deportiva de las jugadoras.
- `index.html`: prototipo jugable 2D desde arriba.

## Campos actuales para equipos
`id`, `nombre`, `tipo`, `pais`, `competicion`, `temporada`, `fuente`, `verificado`.

## Campos actuales para jugadoras
`id`, `nombre`, `posicion`, `equipoId`, `nacionalidad`, `categoria`, `fuente`, `fechaConsulta`, `verificado`. Los datos biográficos y atributos de juego se añadirán solo cuando estén comprobados o identificados como estimaciones.

## Criterios de calidad
- No inventar nombres, edades, dorsales ni afiliaciones.
- Verificar las plantillas con fuentes oficiales de clubes, ligas y federaciones.
- Las valoraciones OVR y atributos serán estimaciones propias del videojuego, no puntuaciones oficiales.
- Registrar la fuente y la fecha de consulta al incorporar cada plantilla.

## Estado
- [x] Prototipo inicial de partido 2D.
- [x] Catálogo de 122 clubes femeninos en 10 países/competiciones.
- [x] Catálogo inicial de 9 selecciones/categorías.
- [x] Primera convocatoria de 26 jugadoras de Estados Unidos.
- [x] Interfaz para explorar clubes, selecciones y las jugadoras que ya están cargadas.
- [ ] Completar y auditar las plantillas de los 122 clubes.
- [ ] Ampliar el catálogo a todas las federaciones y categorías juveniles.
- [ ] Conectar las plantillas completas al modo partido y desarrollar modo carrera.
