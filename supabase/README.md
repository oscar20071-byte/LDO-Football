# Activar la sincronización en la nube de LDO Football

La sincronización usa Supabase Auth por código de correo y una tabla privada con Row Level Security (RLS).

## 1. Crear el proyecto
1. Crea un proyecto en Supabase.
2. En Project Settings > API, copia la **Project URL** y la clave pública **anon** o **publishable**.
3. Nunca uses la clave **service_role** o una clave secreta en el navegador ni en GitHub.

## 2. Crear la tabla privada
1. Abre SQL Editor en Supabase.
2. Copia y ejecuta todo el contenido de [schema.sql](schema.sql).
3. La tabla `public.ldo_saves` guarda una fila por usuario. Las políticas RLS limitan lectura y escritura al usuario autenticado cuyo UUID coincide con `user_id`.

## 3. Activar acceso por correo
1. En Authentication > Providers, habilita Email.
2. En Authentication > URL Configuration, agrega el dominio publicado de LDO Football a los sitios permitidos.
3. Configura el proveedor de correo y la plantilla para enviar un código OTP numérico (el valor de plantilla habitual es `{{ .Token }}`).
4. Si el proyecto requiere confirmación de correo, déjala activada.

## 4. Conectar el juego
1. Abre LDO Football y ve a **Respaldar y transferir progreso**.
2. Introduce Project URL, clave pública anon/publishable y tu correo.
3. Pulsa **Guardar configuración** y luego **Enviar código**.
4. Escribe el código recibido y pulsa **Verificar código**.
5. Usa **Subir progreso** para guardar en la nube o **Descargar progreso** para restaurarlo en otro dispositivo.

## Seguridad y límites
- La clave pública anon/publishable está diseñada para el cliente; la seguridad real la aplican Auth y RLS.
- Nunca pegues una clave service_role ni una contraseña de administrador en el juego.
- Cada cuenta solo puede leer y modificar su propia fila.
- La sincronización es manual mediante los botones de subir y descargar; no es automática en segundo plano.
- Descargar reemplaza las partidas locales equivalentes y pide confirmación. Subir reemplaza el respaldo anterior de esa cuenta y también pide confirmación.
- Carrera, competición y disciplina se sincronizan. Otros datos del navegador no se envían.
- El correo y los tokens de sesión se guardan en el navegador. Cerrar sesión elimina el token local, pero conserva el progreso local.
