# Activar la nube de LDO Football con Firebase

La aplicación utiliza Firebase Authentication (correo y contraseña) y Cloud Firestore. Cada usuario solo puede leer y modificar su propio documento.

## 1. Crear el proyecto y la aplicación web
1. Abre https://console.firebase.google.com/ y crea un proyecto para LDO Football.
2. En la configuración del proyecto, añade una aplicación web (icono </>).
3. Copia estos cuatro valores de la configuración web: **apiKey**, **authDomain**, **projectId** y **appId**. No copies claves privadas de cuentas de servicio.

## 2. Activar las cuentas
1. En Authentication > Sign-in method, habilita **Email/Password**.
2. En Authentication > Settings > Authorized domains, comprueba que esté el dominio donde publicas LDO Football (por ejemplo, tu dominio de GitHub Pages).

## 3. Crear la base de datos y protegerla
1. En Firestore Database, crea una base de datos.
2. Abre la pestaña Rules.
3. Sustituye las reglas de ejemplo por todo el contenido de [firestore.rules](firestore.rules) y pulsa Publish.

Las reglas limitan el acceso a users/{uid}/saves/main al usuario cuya sesión tiene exactamente ese UID. No publiques reglas abiertas.

## 4. Conectar LDO Football
1. Abre el juego y entra en **Respaldar y transferir progreso**.
2. Pega los cuatro valores de la aplicación web Firebase.
3. Escribe tu correo y una contraseña de al menos seis caracteres.
4. Pulsa **Guardar Firebase** y luego **Crear cuenta**. Si ya tienes cuenta, pulsa **Iniciar sesión**.
5. Al iniciar sesión, el juego buscará una partida guardada. Puedes cargarla o conservar el progreso local.
6. A partir de ahí, los cambios de carrera, liga y disciplina se guardan automáticamente en Firebase.

## Importante
- Nunca compartas una clave privada de cuenta de servicio ni la incluyas en GitHub.
- La API Key de Firebase para aplicaciones web es visible en el navegador; la protección de datos depende de Authentication y las reglas de Firestore.
- El sistema sincroniza carrera, competición y disciplina (ldoCareerV1, ldoCompetitionV1, ldoDisciplineV1).
- Para cambiar de dispositivo, abre LDO Football, introduce la misma configuración Firebase e inicia sesión con la misma cuenta.
- Los respaldos manuales JSON siguen disponibles como alternativa.
- Si ya tenías datos en Supabase, expórtalos desde la versión anterior antes de migrar; Firebase no importa automáticamente esos registros.
- La integración de código está preparada, pero la conexión real solo podrá probarse después de crear y configurar el proyecto Firebase.