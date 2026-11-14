# LDO FOOTBALL — Estado del proyecto

Temporada de referencia declarada para el catálogo: **2026-2027**. Los participantes y plantillas deben confirmarse con las fuentes oficiales de cada competición.

## Funciones implementadas
- Partido arcade 2D desde arriba, 5 contra 5, con movimiento, pase, disparo, cambio de jugadora, marcador, reloj, pausa y reinicio.
- Controles de teclado y controles táctiles básicos.
- Navegador de clubes, selecciones y jugadoras registradas.
- Alineaciones de partido que aprovechan registros verificados disponibles y muestran jugadoras genéricas de prueba cuando no hay plantilla.
- Sustituciones locales en el equipo del usuario cuando existe banquillo; se puede elegir desde un selector qué titular sale.
- Sustituciones automáticas del rival alrededor de los minutos 60 y 75 cuando hay suplentes.
- Tarjetas amarillas, doble amarilla y rojas aleatorias durante el partido; las expulsiones retiran a la jugadora del juego y dejan al equipo con una menos.
- Modo carrera local con progresión estadística, entrenamiento, fatiga, recuperación, lesiones simuladas, tarjetas, suspensiones, contratos y cambio de club.
- Gestor local de ligas con calendario de ida y vuelta, jornadas simuladas y clasificación.
- Copa eliminatoria simulada.
- Validador de datos y pruebas automáticas de calendario mediante GitHub Actions.

## Cobertura de datos actual
- `data/equipos.json`: 122 registros de clubes.
- `data/jugadoras.json`: 137 registros de jugadoras.
- `data/selecciones.json`: 216 entradas de catálogo; no equivalen a 216 plantillas completas ni certifican actividad de todas las selecciones femeninas.
- `data/competiciones.json`: 10 grupos competitivos iniciales derivados del campo de competición de los clubes.
- Hay registros de Chelsea Women (27), London City Lionesses (27), Manchester City Women (26), Real Madrid CF femenino (32) y la selección absoluta de Estados Unidos (26). La cobertura de plantillas sigue siendo parcial.
- Una asociación miembro de FIFA no demuestra por sí sola que exista una selección femenina activa ni que haya una convocatoria vigente.

## Límites conocidos
- El partido es un prototipo arcade, no un simulador de fútbol completo. La IA, la posesión y las colisiones son básicas.
- El partido utiliza cinco jugadoras por equipo e incluye una portera con posicionamiento defensivo y movimiento lateral básico. Solo asigna una jugadora real a portera cuando su posición está confirmada; si no hay dato, usa una portera genérica. No implementa todavía formaciones configurables, tácticas avanzadas, faltas ni reglas completas.
- Las sustituciones del usuario son manuales y las del rival son automáticas y simplificadas.
- El sistema de tarjetas del partido es aleatorio y básico; no calcula todavía faltas, sanciones acumuladas entre encuentros ni suspensiones de competición. Las lesiones y suspensiones detalladas siguen en el modo carrera estadístico.
- El modo carrera no está conectado al partido 2D. El cambio de club y los contratos son mecánicas locales simplificadas, no negociaciones de mercado.
- Las ligas y copas producen resultados aleatorios simulados; no son resultados oficiales. Sus grupos iniciales necesitan validación de formato, división y participantes.
- No están completas las plantillas de todos los clubes ni las convocatorias de selecciones absolutas y juveniles.
- No se han incorporado todos los escudos, retratos ni uniformes oficiales.
- No hay multijugador, economía completa, fichajes negociados ni ascensos y descensos.

## Próximas tareas
- [ ] Completar y verificar plantillas de clubes con fuentes oficiales y fecha de consulta.
- [ ] Completar selecciones femeninas absolutas y juveniles, distinguiendo asociaciones, equipos activos y convocatorias publicadas.
- [ ] Validar formato, división, calendario y participantes oficiales de cada liga.
- [ ] Conectar la carrera con partidos jugables.
- [x] Añadir una portera con comportamiento defensivo básico.
- [ ] Mejorar IA, porteras, tácticas, formaciones y reglas.
- [ ] Implementar sustituciones para ambos equipos, tarjetas, lesiones y sanciones dentro del partido.
- [ ] Añadir fichajes, contratos negociables, presupuestos y temporadas.
- [ ] Añadir escudos, retratos y equipaciones con recursos autorizados.
- [ ] Probar el juego en navegadores de escritorio y móvil.

## Reglas de calidad
- No inventar nombres, edades, dorsales, nacionalidades, posiciones ni afiliaciones.
- Guardar fuente y fecha de consulta de cada plantilla.
- Marcar como estimados los atributos deportivos creados para el videojuego.
- No presentar catálogos iniciales, resultados aleatorios ni plantillas parciales como datos oficiales completos.
