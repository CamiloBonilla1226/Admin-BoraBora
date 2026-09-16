/**
 * Función serverless de Vercel: activa/desactiva un producto o adición
 * del catálogo, escribiendo en la hoja de Google Sheets a través del
 * Apps Script. El navegador nunca ve el ADMIN_TOKEN: esta función lo
 * lee de una variable de entorno del servidor y lo agrega al body antes
 * de reenviar la petición.
 *
 * TODO (seguridad, ver CLAUDE.md sección 1): esta función debe verificar
 * primero que quien la llama tiene una sesión válida (cookie httpOnly)
 * antes de tocar la hoja, y responder 401 si no la hay. El sistema de
 * login todavía no existe en este proyecto — hay que añadir esa
 * verificación aquí en cuanto esté implementado, antes de desplegar a
 * producción.
 */

const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxmJqewydDnu7urqQlL6HT_xhact8efuM8JoU5l4-A-lUw5kj0uMCkiE90nYrGXvg/exec'

const ESTADOS_VALIDOS = new Set(['activo', 'inactivo'])

/** Lista fija de los 36 ids conocidos (productos y adiciones del catálogo). */
const IDS_VALIDOS = new Set([
  // Productos — Granizados
  'mora',
  'mango',
  'maracuya',
  'tropical',
  // Productos — Micheladas
  'michClasica',
  'michBora',
  // Productos — Peceras
  'pecTropical',
  'pecExplosiva',
  // Productos — Licor
  'shot',
  'botella',

  // Adiciones — Granizados (compartidas por mora, mango, maracuya, tropical)
  'add_gomitas',
  'add_chispas_chocolate',
  'add_caramelo',
  'add_fruta_surtida',
  'add_sal_sabores_extra',
  'add_chile_polvo',
  'add_perlas_fresa',
  'add_jeringa_tequila',
  'add_jeringa_vodka',
  'add_jeringa_ron',

  // Adiciones — Micheladas (compartidas por michClasica, michBora)
  'add_doble_escarchado_tajin',
  'add_chamoy_extra',
  'add_limon_extra',
  'add_mango',
  'add_pina',
  'add_fresa',
  'add_maracuya',

  // Adiciones — Peceras (compartidas por pecTropical, pecExplosiva)
  'add_pina_adicional',
  'add_fresa_adicional',
  'add_maracuya_adicional',
  'add_shot_extra_ron',
  'add_shot_extra_vodka',

  // Adiciones — Licor (propias de cada producto)
  'add_doble_onza',
  'add_limon_sal_extra',
  'add_gaseosa_aparte',
  'add_vaso_adicional',
])

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { id, estado } = req.body ?? {}

  if (typeof id !== 'string' || !IDS_VALIDOS.has(id)) {
    return res.status(400).json({ error: 'id inválido' })
  }

  if (typeof estado !== 'string' || !ESTADOS_VALIDOS.has(estado)) {
    return res.status(400).json({ error: 'estado inválido' })
  }

  const token = process.env.ADMIN_TOKEN

  try {
    const respuesta = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, estado, token }),
    })

    const datos = await respuesta.json()
    return res.status(respuesta.status).json(datos)
  } catch {
    return res.status(502).json({ error: 'No se pudo contactar Apps Script' })
  }
}
