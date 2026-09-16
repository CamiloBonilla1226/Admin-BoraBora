/**
 * Único lugar del proyecto que habla con la API de Apps Script (lectura
 * pública) y con la función serverless propia (escritura). No dupliques
 * estas llamadas en otro lado — importa desde aquí.
 *
 * @typedef {'activo' | 'inactivo'} Estado
 */

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxmJqewydDnu7urqQlL6HT_xhact8efuM8JoU5l4-A-lUw5kj0uMCkiE90nYrGXvg/exec'

/**
 * Trae el estado actual de disponibilidad de todos los ids desde la hoja
 * de Google Sheets. Es la API pública de Apps Script (GET), no necesita
 * token. Responde un objeto plano { id: boolean, ... } (true = activo).
 * @returns {Promise<Record<string, Estado>>} mapa id -> 'activo' | 'inactivo'
 */
export async function obtenerDisponibilidad() {
  const respuesta = await fetch(APPS_SCRIPT_URL)
  if (!respuesta.ok) {
    throw new Error('No se pudo consultar la disponibilidad')
  }

  const datos = await respuesta.json()

  /** @type {Record<string, Estado>} */
  const mapa = {}
  for (const [id, disponible] of Object.entries(datos)) {
    mapa[id] = disponible ? 'activo' : 'inactivo'
  }
  return mapa
}

/**
 * Cambia el estado de un id (producto o adición). Llama a la función
 * serverless propia del proyecto (nunca directo a Apps Script), que es
 * la única que conoce el ADMIN_TOKEN.
 * @param {string} id
 * @param {Estado} estado
 * @returns {Promise<void>}
 */
export async function actualizarDisponibilidad(id, estado) {
  const respuesta = await fetch('/api/toggle-disponibilidad', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, estado }),
  })

  if (!respuesta.ok) {
    throw new Error('No se pudo guardar el cambio')
  }
}
