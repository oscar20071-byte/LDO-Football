# LDO FOOTBALL — Estado del proyecto

Temporada de referencia de los datos: **2026-2027**.

## Qué incluye actualmente
- `index.html`: juego web con partido arcade 2D desde arriba, equipos de cinco jugadoras por lado, rivales controlados por IA básica, movimiento, disparo, pase, cambio de jugadora, marcador, reloj, pausa y reinicio.
- Controles de teclado: WASD/flechas, espacio para chutar, X para pasar y Q para cambiar de jugadora.
- Controles táctiles básicos para móviles.
- Modo carrera local: crear futbolista, elegir club y posición, simular partidos, registrar partidos/goles/asistencias, progresar XP/OVR y guardar en el navegador.
- Navegador de clubes, selecciones y jugadoras cargadas.
- `data/equipos.json`: catálogo de 122 clubes femeninos en 10 países/competiciones.
- `data/jugadoras.json`: 79 registros de jugadoras.
- `data/selecciones.json`: 216 entradas de catálogo, no 216 plantillas completas.\n- `data/competiciones.json`: catálogo inicial de 10 competiciones agrupadas por el campo de competición de los clubes.\n- `competitions.js`: motor local de ligas con calendario de ida y vuelta, jornadas, tabla y copa eliminatoria simulada.\n- `scripts/validate-data.mjs` y `.github/workflows/validate-data.yml`: validación automática de JSON, IDs y referencias al actualizar `main`.

## Cobertura actual de plantillas
- 27 registros vinculados al Chelsea Women 2026/27, con dorsales publicados por el club; no todos los campos de posición/nacionalidad están completados.
- 27 registros vinculados al London City Lionesses 2026/27, según la plantilla oficial del club.
- 26 registros de la selección absoluta de Estados Unidos.
- Las demás plantillas de clubes y selecciones siguen pendientes de importación y verificación.
- Una asociación miembro FIFA no demuestra por sí sola que exista una selección femenina activa ni una convocatoria vigente.

## Limitaciones actuales del juego
- El partido es una demostración arcade 5 contra 5. Cuando hay registros verificados para el club seleccionado, se usan hasta cinco jugadoras de la base y el resto queda como banquillo local con sustituciones; si no hay plantilla registrada, aparecen jugadoras genéricas de prueba.\n- Las alineaciones usan el orden de los registros disponibles y no equivalen a una alineación oficial ni a una formación táctica real.
- La IA es básica; faltan tácticas, formaciones configurables, porteras especializadas, faltas y estadísticas detalladas. Las tarjetas, lesiones y suspensiones están implementadas en el modo carrera estadístico, no aún en el partido 2D. Ya existe sustitución local cuando hay banquillo disponible.
- El modo carrera guarda el progreso localmente e incluye entrenamiento, fatiga, recuperación, lesiones simuladas, tarjetas amarillas/rojas, suspensiones, renovación de contrato y cambio de club dentro de la partida; los partidos de carrera siguen siendo simulaciones estadísticas y no están conectados al partido jugable.
- Se añadió un gestor local de ligas con calendario de ida y vuelta, jornadas simuladas, clasificación y resultados guardados.\n- Se añadió un torneo de copa eliminatoria simulado y guardado localmente.\n- Los calendarios y resultados son generados por el juego; no son calendarios ni resultados oficiales.\n- Siguen pendientes ascensos/descensos, fichajes, contratos y multijugador.
- No se han incorporado escudos, retratos ni uniformes oficiales de todas las entidades.

## Próximas tareas
- [ ] Importar y verificar plantillas oficiales de los 122 clubes.
- [ ] Ampliar las convocatorias absolutas y juveniles de las selecciones con fuentes federativas.
- [ ] Vincular jugadoras reales de los JSON con los equipos del partido.
- [x] Crear un primer gestor de ligas, calendarios, tablas y copa simulada.\n- [ ] Validar participantes y formatos oficiales de cada competición; añadir temporadas, ascensos y descensos.\n- [x] Añadir comprobaciones automáticas de integridad de los datos con GitHub Actions.
- [ ] Conectar el modo carrera al partido real y añadir entrenamientos, contratos y fichajes.
- [ ] Añadir porteras, tácticas, sustituciones, faltas, tarjetas, lesiones y estadísticas.
- [ ] Añadir escudos, retratos y uniformes con recursos autorizados.
- [ ] Probar el juego en móvil y escritorio con pruebas de navegador.

## Calidad de datos
- No inventar nombres, edades, dorsales ni afiliaciones.
- Registrar fuente y fecha al añadir cada plantilla.
- Los OVR y atributos serán estimaciones del videojuego, nunca valoraciones oficiales.
