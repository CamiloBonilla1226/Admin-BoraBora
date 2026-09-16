import { useEffect, useMemo, useState } from 'react'
import { catalogo } from '../data/catalogo'
import { actualizarDisponibilidad, obtenerDisponibilidad } from '../lib/api'
import FilaDisponibilidad from './FilaDisponibilidad'
import './PanelDisponibilidad.css'

const CATEGORIAS = ['Granizados', 'Micheladas', 'Peceras', 'Licor']

/** Agrupa el catálogo fijo por categoría, separando productos de adiciones. */
function agruparPorCategoria() {
  return CATEGORIAS.map((categoria) => ({
    categoria,
    productos: catalogo.filter((item) => item.categoria === categoria && item.tipo === 'producto'),
    adiciones: catalogo.filter((item) => item.categoria === categoria && item.tipo === 'adicion'),
  }))
}

const grupos = agruparPorCategoria()

/** @param {string[]} ids */
function nombresDe(ids) {
  return ids
    .map((id) => catalogo.find((item) => item.id === id)?.nombre ?? id)
    .join(', ')
}

/** Panel principal: lista de productos y adiciones con su switch de disponibilidad. */
export default function PanelDisponibilidad() {
  const [estados, setEstados] = useState({})
  const [guardando, setGuardando] = useState({})
  const [errores, setErrores] = useState({})
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState(null)

  useEffect(() => {
    obtenerDisponibilidad()
      .then((mapa) => setEstados(mapa))
      .catch(() => setErrorCarga('No se pudo cargar la disponibilidad. Intenta recargar la página.'))
      .finally(() => setCargando(false))
  }, [])

  const detallesAdiciones = useMemo(() => {
    /** @type {Record<string, string>} */
    const mapa = {}
    for (const grupo of grupos) {
      for (const adicion of grupo.adiciones) {
        mapa[adicion.id] = adicion.productos ? `Aplica a: ${nombresDe(adicion.productos)}` : undefined
      }
    }
    return mapa
  }, [])

  async function cambiarEstado(id) {
    const estadoAnterior = estados[id]
    const nuevoEstado = estadoAnterior === 'activo' ? 'inactivo' : 'activo'

    setEstados((prev) => ({ ...prev, [id]: nuevoEstado }))
    setGuardando((prev) => ({ ...prev, [id]: true }))
    setErrores((prev) => ({ ...prev, [id]: undefined }))

    try {
      await actualizarDisponibilidad(id, nuevoEstado)
    } catch {
      setEstados((prev) => ({ ...prev, [id]: estadoAnterior }))
      setErrores((prev) => ({ ...prev, [id]: 'No se pudo guardar, intenta de nuevo.' }))
    } finally {
      setGuardando((prev) => ({ ...prev, [id]: false }))
    }
  }

  if (cargando) {
    return <p className="panel-mensaje">Cargando disponibilidad…</p>
  }

  if (errorCarga) {
    return <p className="panel-mensaje panel-mensaje--error">{errorCarga}</p>
  }

  return (
    <main className="panel">
      <h1 className="panel__titulo">Disponibilidad</h1>

      {grupos.map((grupo) => (
        <section key={grupo.categoria} className="panel__categoria">
          <h2>{grupo.categoria}</h2>

          <ul className="panel__lista">
            {grupo.productos.map((item) => (
              <FilaDisponibilidad
                key={item.id}
                nombre={item.nombre}
                estado={estados[item.id]}
                guardando={Boolean(guardando[item.id])}
                error={errores[item.id]}
                onCambiar={() => cambiarEstado(item.id)}
              />
            ))}
          </ul>

          {grupo.adiciones.length > 0 && (
            <>
              <h3>Adiciones</h3>
              <ul className="panel__lista">
                {grupo.adiciones.map((item) => (
                  <FilaDisponibilidad
                    key={item.id}
                    nombre={item.nombre}
                    estado={estados[item.id]}
                    guardando={Boolean(guardando[item.id])}
                    error={errores[item.id]}
                    detalle={detallesAdiciones[item.id]}
                    onCambiar={() => cambiarEstado(item.id)}
                  />
                ))}
              </ul>
            </>
          )}
        </section>
      ))}
    </main>
  )
}
