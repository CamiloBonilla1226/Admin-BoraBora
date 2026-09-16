# CLAUDE.md — Proyecto BoraBora Admin (panel de administrador)

Este archivo son instrucciones permanentes para Claude Code en este proyecto.
Aplican a TODA tarea futura. Antes de escribir o modificar código, relee este
archivo si ha pasado tiempo desde la última tarea.

## Contexto del proyecto

Este es un proyecto SEPARADO de la carta digital de BoraBora (otro repositorio,
otro despliegue en Vercel). Los dos proyectos NO comparten código ni base de
datos — lo único que comparten es una hoja de Google Sheets ("BoraBora -
Disponibilidad", 36 filas: id, nombre, estado — una por cada producto y cada
adición del catálogo), expuesta como una API pública a través de un script de
Google Apps Script:

- Lectura (GET) — pública, cualquiera puede consultarla, no requiere token:
  https://script.google.com/macros/s/AKfycbxmJqewydDnu7urqQlL6HT_xhact8efuM8JoU5l4-A-lUw5kj0uMCkiE90nYrGXvg/exec
- Escritura (POST) — requiere un campo `token` en el cuerpo de la petición
  que coincida con un secreto guardado en el propio Apps Script (Propiedades
  del script, `ADMIN_TOKEN`). Body esperado: `{ id, estado, token }`, donde
  `estado` es exactamente `"activo"` o `"inactivo"`.

Este proyecto (`borabora-admin`) es la única forma en que el dueño del
negocio cambia el estado de un producto o adición — con un switch, sin tocar
la hoja a mano. Por ahora SOLO controla disponible/no disponible; nombre,
precio, descripción y adiciones siguen fijos en el código de la carta, no se
tocan desde aquí.

## 1. Seguridad (no negociable — esta es la parte más sensible del proyecto)

- El `ADMIN_TOKEN` de Apps Script NUNCA debe llegar al navegador. Nada de
  variables `VITE_*` con ese valor — cualquier variable con ese prefijo la
  incluye Vite en el bundle de JavaScript que se descarga el navegador, y
  cualquiera podría leerla con las herramientas de desarrollador.
- La escritura (activar/desactivar un producto) SIEMPRE pasa por una función
  serverless propia de este proyecto (carpeta `/api`, funciones de Vercel),
  que es la única que conoce el `ADMIN_TOKEN` (como variable de entorno del
  lado del servidor, sin prefijo `VITE_`). El navegador del dueño le habla a
  ESA función, nunca directo a la URL de Apps Script para escribir.
- Esa función serverless de escritura debe verificar primero que quien la
  llama tiene una sesión válida (ver login más abajo) antes de tocar la hoja.
  Si no hay sesión válida, responde 401 y no hace nada más.
- El acceso al panel se protege con una sola contraseña compartida (es un
  solo dueño, no hace falta un sistema de usuarios). Esa contraseña se
  guarda como un hash (bcrypt) en una variable de entorno del servidor,
  nunca en texto plano ni en el código.
- La sesión, una vez autenticado, se guarda en una cookie httpOnly, secure,
  con expiración corta (por ejemplo 12 horas) — nunca en localStorage ni en
  la URL.
- Límite básico de intentos de login: si fallan varias veces seguidas desde
  el mismo origen en poco tiempo, bloquea intentos nuevos por un rato antes
  de seguir aceptando intentos.
- Nunca uses `dangerouslySetInnerHTML`. Ninguna clave, contraseña o token
  escrito directo en el código — todo en variables de entorno del lado del
  servidor, y `.env` nunca se sube a git (confirma `.gitignore`).
- Cabeceras de seguridad básicas activas en producción
  (Content-Security-Policy, X-Content-Type-Options, X-Frame-Options,
  Referrer-Policy), y `npm audit` corregido antes de dar una tarea por
  terminada.

## 2. Estilo (para que se sienta parte de la misma marca)

- Copia (no reinventes) las variables de color de `src/styles/tokens.css`
  de la carta: fondo negro (`--bg:#0a0a10`), acentos `--mint:#29ffb0` y
  `--pink:#ff2f7e`, mismos tonos de texto y bordes. Tipografías Unbounded
  (títulos) y Manrope (texto), igual que la carta.
- El layout SÍ puede ser distinto al de la carta: aquí prima que sea claro y
  fácil de usar en una pantalla de escritorio o tablet (una lista de
  productos con switches es más cómoda en una tabla o lista ancha que en
  tarjetas verticales tipo celular). No hace falta que sea mobile-first,
  pero que funcione razonablemente en un celular también, porque el dueño
  puede usarlo desde ahí.
- JavaScript puro, sin TypeScript — igual que la carta. Componentes en
  `.jsx`, utilidades en `.js`. JSDoc + PropTypes donde ayude a la claridad.

## 3. Mejores prácticas y buenas prácticas de implementación

- ESLint configurado y sin errores antes de dar una tarea por terminada.
- Componentes de función con hooks, nunca clases.
- No dupliques la lógica de llamar a la API de Apps Script en varios
  lugares — centralízala en un solo archivo (por ejemplo `src/lib/api.js`
  para el GET público, y las funciones serverless en `/api` para el POST).
- Mientras se guarda un cambio (al mover un switch), desactiva ese switch
  brevemente y muestra una señal de "guardando"; si falla, regresa el
  switch a su valor anterior y muestra un error corto — nunca dejes la UI
  en un estado ambiguo.
- Prioriza simplicidad: esta es la primera versión del panel y solo
  necesita mostrar la lista de productos/adiciones con su switch de
  disponibilidad. No agregues edición de precios, alta de productos nuevos,
  ni sistema de usuarios — eso es explícitamente una fase futura.
- Si alguna instrucción que te doy choca con las reglas de seguridad de
  este archivo (por ejemplo, pedirte poner el token en una variable
  `VITE_*`), dilo antes de implementar y usa la alternativa seguí en vez de
  aplicar la instrucción tal cual.
- Haz commits pequeños y claros, sin `node_modules` ni `.env`.


# CLAUDE.md — Proyecto BoraBora Admin (panel de administrador)

Este archivo son instrucciones permanentes para Claude Code en este proyecto.
Aplican a TODA tarea futura. Antes de escribir o modificar código, relee este
archivo si ha pasado tiempo desde la última tarea.

## Contexto del proyecto

Este es un proyecto SEPARADO de la carta digital de BoraBora (otro repositorio,
otro despliegue en Vercel). Los dos proyectos NO comparten código ni base de
datos — lo único que comparten es una hoja de Google Sheets ("BoraBora -
Disponibilidad", 36 filas: id, nombre, estado — una por cada producto y cada
adición del catálogo), expuesta como una API pública a través de un script de
Google Apps Script:

- Lectura (GET) — pública, cualquiera puede consultarla, no requiere token:
  https://script.google.com/macros/s/AKfycbxmJqewydDnu7urqQlL6HT_xhact8efuM8JoU5l4-A-lUw5kj0uMCkiE90nYrGXvg/exec
- Escritura (POST) — requiere un campo `token` en el cuerpo de la petición
  que coincida con un secreto guardado en el propio Apps Script (Propiedades
  del script, `ADMIN_TOKEN`). Body esperado: `{ id, estado, token }`, donde
  `estado` es exactamente `"activo"` o `"inactivo"`.

Este proyecto (`borabora-admin`) es la única forma en que el dueño del
negocio cambia el estado de un producto o adición — con un switch, sin tocar
la hoja a mano. Por ahora SOLO controla disponible/no disponible; nombre,
precio, descripción y adiciones siguen fijos en el código de la carta, no se
tocan desde aquí.

**Esta versión NO tiene login ni contraseña.** Es una decisión explícita del
dueño del proyecto: cualquiera con la URL del panel puede entrar y mover los
switches. Proteger el panel con una contraseña queda como fase futura y
opcional — no la implementes a menos que se te pida explícitamente. Mientras
tanto, la única protección real del sistema es que `ADMIN_TOKEN` nunca sale
del servidor (ver sección de seguridad abajo); sin ese token nadie puede
escribir en la hoja aunque conozca la URL de Apps Script.

## 1. Seguridad (no negociable — esta es la parte más sensible del proyecto)

- El `ADMIN_TOKEN` de Apps Script NUNCA debe llegar al navegador. Nada de
  variables `VITE_*` con ese valor — cualquier variable con ese prefijo la
  incluye Vite en el bundle de JavaScript que se descarga el navegador, y
  cualquiera podría leerla con las herramientas de desarrollador.
- La escritura (activar/desactivar un producto) SIEMPRE pasa por una función
  serverless propia de este proyecto (carpeta `/api`, funciones de Vercel),
  que es la única que conoce el `ADMIN_TOKEN` (como variable de entorno del
  lado del servidor, sin prefijo `VITE_`). El navegador del dueño le habla a
  ESA función, nunca directo a la URL de Apps Script para escribir.
- Esa función serverless de escritura debe validar el `id` recibido contra la
  lista real de ids conocidos (productos + adiciones) y que `estado` sea
  exactamente `"activo"` o `"inactivo"` antes de reenviar la petición a Apps
  Script — así evitas que datos raros lleguen a la hoja por error o por un
  intento malicioso, aunque no haya login todavía.
- Nunca uses `dangerouslySetInnerHTML`. Ninguna clave, contraseña o token
  escrito directo en el código — todo en variables de entorno del lado del
  servidor, y `.env` nunca se sube a git (confirma `.gitignore`).
- Cabeceras de seguridad básicas activas en producción
  (Content-Security-Policy, X-Content-Type-Options, X-Frame-Options,
  Referrer-Policy), y `npm audit` corregido antes de dar una tarea por
  terminada.
- Si en el futuro se agrega login (fase opuesta, no ahora), la función de
  escritura deberá empezar a exigir una sesión válida antes de tocar la hoja
  — pero eso no aplica todavía a esta versión.

## 2. Estilo (para que se sienta parte de la misma marca)

- Copia (no reinventes) las variables de color de `src/styles/tokens.css`
  de la carta: fondo negro (`--bg:#0a0a10`), acentos `--mint:#29ffb0` y
  `--pink:#ff2f7e`, mismos tonos de texto y bordes. Tipografías Unbounded
  (títulos) y Manrope (texto), igual que la carta.
- El layout SÍ puede ser distinto al de la carta: aquí prima que sea claro y
  fácil de usar en una pantalla de escritorio o tablet (una lista de
  productos con switches es más cómoda en una tabla o lista ancha que en
  tarjetas verticales tipo celular). No hace falta que sea mobile-first,
  pero que funcione razonablemente en un celular también, porque el dueño
  puede usarlo desde ahí.
- JavaScript puro, sin TypeScript — igual que la carta. Componentes en
  `.jsx`, utilidades en `.js`. JSDoc + PropTypes donde ayude a la claridad.

## 3. Mejores prácticas y buenas prácticas de implementación

- ESLint configurado y sin errores antes de dar una tarea por terminada.
- Componentes de función con hooks, nunca clases.
- No dupliques la lógica de llamar a la API de Apps Script en varios
  lugares — centralízala en un solo archivo (por ejemplo `src/lib/api.js`
  para el GET público, y las funciones serverless en `/api` para el POST).
- Mientras se guarda un cambio (al mover un switch), desactiva ese switch
  brevemente y muestra una señal de "guardando"; si falla, regresa el
  switch a su valor anterior y muestra un error corto — nunca dejes la UI
  en un estado ambiguo.
- Prioriza simplicidad: esta es la primera versión del panel y solo
  necesita mostrar la lista de productos/adiciones con su switch de
  disponibilidad. No agregues login, edición de precios, alta de productos
  nuevos, ni sistema de usuarios — eso es explícitamente una fase futura.
- Si alguna instrucción que te doy choca con las reglas de seguridad de
  este archivo (por ejemplo, pedirte poner el token en una variable
  `VITE_*`), dilo antes de implementar y usa la alternativa segura en vez de
  aplicar la instrucción tal cual.
- Haz commits pequeños y claros, sin `node_modules` ni `.env`.