import PropTypes from 'prop-types'
import './FilaDisponibilidad.css'

/**
 * Una fila de la lista: nombre del producto/adición y su switch. Mientras
 * `guardando` es true el switch queda deshabilitado y muestra "Guardando…";
 * si `error` tiene texto, se muestra debajo (el estado ya fue revertido
 * por quien llama antes de pasar el error).
 *
 * @param {Object} props
 * @param {string} props.nombre
 * @param {'activo' | 'inactivo'} props.estado
 * @param {boolean} props.guardando
 * @param {string} [props.error]
 * @param {string} [props.detalle] - Texto secundario opcional (p. ej. a qué productos aplica una adición).
 * @param {() => void} props.onCambiar
 */
export default function FilaDisponibilidad({ nombre, estado, guardando, error, detalle, onCambiar }) {
  const activo = estado === 'activo'

  return (
    <li className="fila">
      <div className="fila__info">
        <span className="fila__nombre">{nombre}</span>
        {detalle && <span className="fila__detalle">{detalle}</span>}
        {guardando && <span className="fila__estado fila__estado--guardando">Guardando…</span>}
        {!guardando && error && <span className="fila__estado fila__estado--error">{error}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={activo}
        aria-label={nombre}
        className={`switch${activo ? ' switch--activo' : ''}`}
        disabled={guardando}
        onClick={onCambiar}
      >
        <span className="switch__perilla" />
      </button>
    </li>
  )
}

FilaDisponibilidad.propTypes = {
  nombre: PropTypes.string.isRequired,
  estado: PropTypes.oneOf(['activo', 'inactivo']),
  guardando: PropTypes.bool.isRequired,
  error: PropTypes.string,
  detalle: PropTypes.string,
  onCambiar: PropTypes.func.isRequired,
}
