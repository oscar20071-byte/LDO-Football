# ⚽ LDO FOOTBALL

Juego web de fútbol femenino con vista 2D desde arriba.

## Probar el juego
1. Abre la página publicada en GitHub Pages, si está activada.
2. Elige dos clubes distintos.
3. Pulsa **Comenzar partido**.
4. Muévete con WASD o las flechas, usa **ESPACIO** para chutar, **X** para pasar y **Q** para cambiar de jugadora.
5. En móvil aparecen controles táctiles.

## Funciones actuales
- Partido arcade 2D 5 contra 5 con IA básica.
- Usa jugadoras registradas en los clubes que ya tienen datos y permite sustituciones cuando existe banquillo.
- Gestor de ligas con calendario de ida y vuelta, clasificación y copa eliminatoria simulada.
- Validación automática de datos con GitHub Actions.
- Marcador, reloj, pausa y reinicio.
- Modo carrera local con entrenamiento, fatiga, recuperación, contratos y cambios de club guardados en el navegador.
- Catálogo de clubes, selecciones, jugadoras y competiciones.
- Gestor de ligas con calendario, clasificación y resultados simulados.
- Copa eliminatoria simulada.

## Datos y transparencia
Los datos están en `data/`. Las plantillas incompletas se indican como pendientes; los catálogos no equivalen a plantillas completas.

Los resultados de ligas y copas se generan dentro del juego y no representan resultados oficiales. Las plantillas que aún no están cargadas se muestran como pendientes o alineaciones de prueba; no se inventan jugadoras reales.

Consulta [BASE_DATOS.md](BASE_DATOS.md) para ver la cobertura y las limitaciones actuales y [data/FUENTES.md](data/FUENTES.md) para las fuentes utilizadas.

## Estado
Proyecto en desarrollo. El partido actual es una base jugable, no un simulador completo ni una reproducción de FIFA.
