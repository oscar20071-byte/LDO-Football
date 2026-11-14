# ⚽ LDO FOOTBALL

Juego web de fútbol femenino con partido arcade 2D desde arriba y sistemas locales de carrera y competiciones.

## Probarlo
1. Publica el repositorio con GitHub Pages.
2. Abre la página publicada.
3. Selecciona dos clubes diferentes y pulsa **Comenzar partido**.
4. Usa WASD o las flechas para moverte, ESPACIO para chutar, X para pasar y Q para cambiar de jugadora.
5. En móvil aparecen controles táctiles.

## Funciones disponibles
- Partido 2D arcade 5 contra 5 con IA básica.
- Jugadoras registradas en alineaciones cuando hay datos disponibles; jugadoras genéricas de prueba si falta la plantilla.
- Sustituciones locales: eliges desde un selector qué titular sale y entra una jugadora del banquillo.
- Sustituciones automáticas del rival alrededor de los minutos 60 y 75 cuando tiene banquillo.
- Tarjetas amarillas, segunda amarilla y rojas durante el partido; las tarjetas a jugadoras verificadas se guardan en el registro disciplinario compartido con las ligas.
- Las jugadoras suspendidas por la competición quedan fuera de las alineaciones y del banquillo del partido 2D hasta cumplir sus jornadas; al terminar el partido se descuenta una jornada de sanción.
- Modo carrera con progresión, entrenamiento, fatiga, recuperación, lesiones simuladas, tarjetas, suspensiones y contratos locales.
- Ligas con calendario de ida y vuelta, clasificación y resultados simulados.
- Disciplina en ligas: amarillas acumulables, segunda amarilla, rojas directas y suspensiones persistentes entre jornadas para jugadoras verificadas; las sanciones pendientes reducen el rendimiento simulado del club.
- Exportación e importación de respaldos JSON para transferir carrera, liga activa y disciplina entre dispositivos de forma manual.
- Copa eliminatoria simulada.
- Catálogos de clubes, jugadoras, selecciones y competiciones.
- Validación de datos y pruebas de calendario en GitHub Actions.

## Datos y transparencia
La base contiene 137 registros de jugadoras: Chelsea Women (27), London City Lionesses (27), Manchester City Women (26), Real Madrid femenino (32) y USWNT (26). Las plantillas de los demás clubes y selecciones todavía son parciales. Los grupos competitivos son catálogos iniciales y necesitan confirmación de formato y participantes. Los resultados de ligas y copas son generados por el juego y no son resultados oficiales. Las lesiones siguen en el modo carrera estadístico. El partido 2D y el motor de ligas comparten el registro local de disciplina para jugadoras verificadas. Las sanciones pendientes las excluyen de las alineaciones del partido 2D y se descuentan al finalizar el encuentro. La sincronización sigue siendo local al navegador y no se comparte entre dispositivos.

Consulta [BASE_DATOS.md](BASE_DATOS.md) para el estado detallado y [data/FUENTES.md](data/FUENTES.md) para las fuentes.

## Estado
Proyecto en desarrollo. El prototipo actual no es un simulador completo ni una reproducción de FIFA.
