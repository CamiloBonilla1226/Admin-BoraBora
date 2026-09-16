/**
 * Catálogo fijo de los 36 ids (productos y adiciones) que existen en la
 * hoja de Google Sheets. Es independiente de products.js de la carta —
 * solo sirve para que este panel sepa qué mostrar, en qué orden, y cómo
 * agrupar cada fila (por categoría y, si es una adición, a qué producto o
 * productos pertenece).
 *
 * Cada adición es una sola fila en la hoja (un solo switch), aunque se
 * ofrezca para varios productos de la misma categoría — por eso
 * `productos` es un arreglo.
 *
 * @typedef {'producto' | 'adicion'} TipoItem
 *
 * @typedef {Object} ItemCatalogo
 * @property {string} id - Id tal cual está en la hoja de cálculo (único).
 * @property {string} nombre - Nombre para mostrar en el panel.
 * @property {TipoItem} tipo - 'producto' o 'adicion'.
 * @property {string} categoria - Categoría a la que pertenece (Granizados, Micheladas, Peceras, Licor).
 * @property {string[]} [productos] - Ids de los productos a los que aplica la adición (solo cuando tipo es 'adicion').
 */

/** @type {ItemCatalogo[]} */
export const catalogo = [
  // Granizados
  { id: 'mora', nombre: 'Mora Azul', tipo: 'producto', categoria: 'Granizados' },
  { id: 'mango', nombre: 'Mango Biche', tipo: 'producto', categoria: 'Granizados' },
  { id: 'maracuya', nombre: 'Maracuyá', tipo: 'producto', categoria: 'Granizados' },
  { id: 'tropical', nombre: 'Tropical (multifruta)', tipo: 'producto', categoria: 'Granizados' },
  {
    id: 'add_gomitas',
    nombre: 'Gomitas',
    tipo: 'adicion',
    categoria: 'Granizados',
    productos: ['mora', 'mango', 'maracuya', 'tropical'],
  },
  {
    id: 'add_chispas_chocolate',
    nombre: 'Chispas de chocolate',
    tipo: 'adicion',
    categoria: 'Granizados',
    productos: ['mora', 'mango', 'maracuya', 'tropical'],
  },
  {
    id: 'add_caramelo',
    nombre: 'Caramelo',
    tipo: 'adicion',
    categoria: 'Granizados',
    productos: ['mora', 'mango', 'maracuya', 'tropical'],
  },
  {
    id: 'add_fruta_surtida',
    nombre: 'Fruta surtida',
    tipo: 'adicion',
    categoria: 'Granizados',
    productos: ['mora', 'mango', 'maracuya', 'tropical'],
  },
  {
    id: 'add_sal_sabores_extra',
    nombre: 'Sal de sabores extra',
    tipo: 'adicion',
    categoria: 'Granizados',
    productos: ['mora', 'mango', 'maracuya', 'tropical'],
  },
  {
    id: 'add_chile_polvo',
    nombre: 'Chile en polvo',
    tipo: 'adicion',
    categoria: 'Granizados',
    productos: ['mora', 'mango', 'maracuya', 'tropical'],
  },
  {
    id: 'add_perlas_fresa',
    nombre: 'Perlas de fresa',
    tipo: 'adicion',
    categoria: 'Granizados',
    productos: ['mora', 'mango', 'maracuya', 'tropical'],
  },
  {
    id: 'add_jeringa_tequila',
    nombre: 'Jeringa tequila',
    tipo: 'adicion',
    categoria: 'Granizados',
    productos: ['mora', 'mango', 'maracuya', 'tropical'],
  },
  {
    id: 'add_jeringa_vodka',
    nombre: 'Jeringa vodka',
    tipo: 'adicion',
    categoria: 'Granizados',
    productos: ['mora', 'mango', 'maracuya', 'tropical'],
  },
  {
    id: 'add_jeringa_ron',
    nombre: 'Jeringa ron',
    tipo: 'adicion',
    categoria: 'Granizados',
    productos: ['mora', 'mango', 'maracuya', 'tropical'],
  },

  // Micheladas
  { id: 'michClasica', nombre: 'Michelada Clásica', tipo: 'producto', categoria: 'Micheladas' },
  { id: 'michBora', nombre: 'Michelada BoraBora', tipo: 'producto', categoria: 'Micheladas' },
  {
    id: 'add_doble_escarchado_tajin',
    nombre: 'Doble escarchado de tajín',
    tipo: 'adicion',
    categoria: 'Micheladas',
    productos: ['michClasica', 'michBora'],
  },
  {
    id: 'add_chamoy_extra',
    nombre: 'Chamoy extra',
    tipo: 'adicion',
    categoria: 'Micheladas',
    productos: ['michClasica', 'michBora'],
  },
  {
    id: 'add_limon_extra',
    nombre: 'Limón extra',
    tipo: 'adicion',
    categoria: 'Micheladas',
    productos: ['michClasica', 'michBora'],
  },
  {
    id: 'add_mango',
    nombre: 'Mango',
    tipo: 'adicion',
    categoria: 'Micheladas',
    productos: ['michClasica', 'michBora'],
  },
  {
    id: 'add_pina',
    nombre: 'Piña',
    tipo: 'adicion',
    categoria: 'Micheladas',
    productos: ['michClasica', 'michBora'],
  },
  {
    id: 'add_fresa',
    nombre: 'Fresa',
    tipo: 'adicion',
    categoria: 'Micheladas',
    productos: ['michClasica', 'michBora'],
  },
  {
    id: 'add_maracuya',
    nombre: 'Maracuyá',
    tipo: 'adicion',
    categoria: 'Micheladas',
    productos: ['michClasica', 'michBora'],
  },

  // Peceras
  { id: 'pecTropical', nombre: 'Pecera Tropical', tipo: 'producto', categoria: 'Peceras' },
  { id: 'pecExplosiva', nombre: 'Pecera Explosiva', tipo: 'producto', categoria: 'Peceras' },
  {
    id: 'add_pina_adicional',
    nombre: 'Piña adicional',
    tipo: 'adicion',
    categoria: 'Peceras',
    productos: ['pecTropical', 'pecExplosiva'],
  },
  {
    id: 'add_fresa_adicional',
    nombre: 'Fresa adicional',
    tipo: 'adicion',
    categoria: 'Peceras',
    productos: ['pecTropical', 'pecExplosiva'],
  },
  {
    id: 'add_maracuya_adicional',
    nombre: 'Maracuyá adicional',
    tipo: 'adicion',
    categoria: 'Peceras',
    productos: ['pecTropical', 'pecExplosiva'],
  },
  {
    id: 'add_shot_extra_ron',
    nombre: 'Shot extra de ron',
    tipo: 'adicion',
    categoria: 'Peceras',
    productos: ['pecTropical', 'pecExplosiva'],
  },
  {
    id: 'add_shot_extra_vodka',
    nombre: 'Shot extra de vodka',
    tipo: 'adicion',
    categoria: 'Peceras',
    productos: ['pecTropical', 'pecExplosiva'],
  },

  // Licor
  { id: 'shot', nombre: 'Shot Tequila / Vodka / Ron', tipo: 'producto', categoria: 'Licor' },
  {
    id: 'add_doble_onza',
    nombre: 'Doble onza',
    tipo: 'adicion',
    categoria: 'Licor',
    productos: ['shot'],
  },
  {
    id: 'add_limon_sal_extra',
    nombre: 'Limón y sal extra',
    tipo: 'adicion',
    categoria: 'Licor',
    productos: ['shot'],
  },
  { id: 'botella', nombre: 'Botella Aguardiente', tipo: 'producto', categoria: 'Licor' },
  {
    id: 'add_gaseosa_aparte',
    nombre: 'Gaseosa aparte',
    tipo: 'adicion',
    categoria: 'Licor',
    productos: ['botella'],
  },
  {
    id: 'add_vaso_adicional',
    nombre: 'Vaso adicional',
    tipo: 'adicion',
    categoria: 'Licor',
    productos: ['botella'],
  },
]
