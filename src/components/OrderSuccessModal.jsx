import { useEffect, useState } from 'react'
import { fmt } from '../utils/helpers'

// Genera un número de orden aleatorio tipo e-commerce real
function generateOrderId() {
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const prefix  = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join('')
  const number  = Math.floor(100000 + Math.random() * 900000)
  return `${prefix}-${number}`
}

export default function OrderSuccessModal({ open, onClose, items, total }) {
  const [orderId]   = useState(() => generateOrderId())
  const [showCheck, setShowCheck] = useState(false)

  // Animación del check con delay
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setShowCheck(true), 200)
      return () => clearTimeout(t)
    } else {
      setShowCheck(false)
    }
  }, [open])

  if (!open) return null

  const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    .toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay con blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-500 ${open ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>

        {/* Header degradado */}
        <div className="bg-gradient-to-br from-brand-500 via-brand-600 to-purple-600 px-6 pt-10 pb-16 text-white text-center relative overflow-hidden">
          {/* Círculos decorativos de fondo */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full" />

          {/* Ícono animado */}
          <div className={`mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl mb-4 shadow-lg transition-all duration-700 ${showCheck ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            ✅
          </div>

          <h2 className="text-2xl font-extrabold mb-1">¡Compra realizada!</h2>
          <p className="text-white/80 text-sm">Gracias por tu compra. Te esperamos pronto 🎉</p>
        </div>

        {/* Ticket recortado */}
        <div className="-mt-6 mx-5 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

            {/* Número de orden */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-dashed border-gray-200">
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Número de orden</p>
                <p className="font-bold text-gray-900 text-lg tracking-wider"># {orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Fecha</p>
                <p className="text-sm font-medium text-gray-700">
                  {new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Items comprados */}
            <div className="px-5 py-3 max-h-40 overflow-y-auto space-y-2.5">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-9 h-9 object-contain bg-gray-50 rounded-lg border border-gray-100 flex-shrink-0 p-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 font-medium leading-tight truncate">{item.title}</p>
                    <p className="text-[11px] text-gray-400">x{item.qty}</p>
                  </div>
                  <p className="text-xs font-bold text-gray-800 flex-shrink-0">{fmt(item.price * item.qty)}</p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-gray-50 border-t border-dashed border-gray-200">
              <span className="text-sm text-gray-500 font-medium">Total pagado</span>
              <span className="text-lg font-extrabold text-brand-600">{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Info entrega */}
        <div className="px-5 mt-4">
          <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
            <span className="text-2xl">🚚</span>
            <div>
              <p className="text-xs font-semibold text-green-700">Entrega estimada</p>
              <p className="text-sm text-green-600 capitalize">{deliveryDate}</p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="px-5 py-5 flex flex-col gap-2">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-brand-600 to-purple-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition active:scale-95"
          >
            Seguir comprando 🛍
          </button>
          <button
            onClick={onClose}
            className="w-full text-gray-400 text-xs hover:text-gray-600 transition py-1"
          >
            Ver mis pedidos (próximamente)
          </button>
        </div>
      </div>
    </div>
  )
}
