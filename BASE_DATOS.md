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
- `data/selecciones.json`: 216 entradas de catálogo, no 216 plantillas completas.

## Cobertura actual de plantillas
- 27 registros vinculados al Chelsea Women 2026/27, con dorsales publicados por el club; no todos los campos de posición/nacionalidad están completados.
- 27 registros vinculados al London City Lionesses 2026/27, según la plantilla oficial del club.
- 26 registros de la selección absoluta de Estados Unidos.
- Las demás plantillas de clubes y selecciones siguen pendientes de importación y verificación.
- Una asociación miembro FIFA no demuestra por sí sola que exista una selección femenina activa ni una convocatoria vigente.

## Limitaciones actuales del juego
- El partido es una demostración arcade 5 contra 5; todavía no utiliza las plantillas reales de los JSON como futbolistas seleccionables en el campo.
- La IA es básica; faltan tácticas, formaciones configurables, porteras especializadas, faltas, tarjetas, lesiones, sustituciones y estadísticas detalladas.
- El modo carrera guarda el progreso localmente, pero su partido es una simulación estadística sencilla; todavía no está conectado al partido jugable.
- No hay aún ligas completas jugables, calendarios, tablas de posiciones, copas, ascensos/descensos, fichajes, contratos ni multijugador.
- No se han incorporado escudos, retratos ni uniformes oficiales de todas las entidades.

## Próximas tareas
- [ ] Importar y verificar plantillas oficiales de los 122 clubes.
- [ ] Ampliar las convocatorias absolutas y juveniles de las selecciones con fuentes federativas.
- [ ] Vincular jugadoras reales de los JSON con los equipos del partido.
- [ ] Crear competiciones, calendarios, tablas, copas y temporadas.
- [ ] Conectar el modo carrera al partido real y añadir entrenamientos, contratos y fichajes.
- [ ] Añadir porteras, tácticas, sustituciones, faltas, tarjetas, lesiones y estadísticas.
- [ ] Añadir escudos, retratos y uniformes con recursos autorizados.
- [ ] Probar el juego en móvil y escritorio con pruebas de navegador.

## Calidad de datos
- No inventar nombres, edades, dorsales ni afiliaciones.
- Registrar fuente y fecha al añadir cada plantilla.
- Los OVR y atributos serán estimaciones del videojuego, nunca valoraciones oficiales.
