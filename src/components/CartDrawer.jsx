import { useShop } from '../context/ShopContext'
import { fmt } from '../utils/helpers'

export default function CartDrawer({ open, onClose }) {
  const { cart, cartTotal, updateQty, removeFromCart, clearCart } = useShop()

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-50 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-lg">Tu carrito 🛒</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
              <span className="text-6xl">🛒</span>
              <p className="font-semibold text-gray-700">Tu carrito está vacío</p>
              <p className="text-sm text-gray-400">Agregá productos para empezar</p>
              <button onClick={onClose} className="mt-2 bg-brand-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-brand-700 transition">
                Ver productos
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 items-start">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-contain bg-gray-50 rounded-lg border border-gray-100 flex-shrink-0 p-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 leading-tight line-clamp-2">{item.title}</p>
                    <p className="text-brand-600 font-bold text-sm mt-0.5">{fmt(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 rounded-full border border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-600 transition flex items-center justify-center text-base font-medium"
                      >−</button>
                      <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 rounded-full border border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-600 transition flex items-center justify-center text-base font-medium"
                      >+</button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-300 hover:text-red-400 transition text-lg flex-shrink-0"
                  >✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Subtotal</span>
              <span className="font-bold text-lg">{fmt(cartTotal)}</span>
            </div>
            <button className="w-full bg-gradient-to-r from-brand-600 to-purple-600 text-white py-3 rounded-full font-semibold hover:opacity-90 transition">
              Finalizar compra →
            </button>
            <button
              onClick={clearCart}
              className="w-full text-gray-400 text-xs hover:text-gray-600 transition"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  )
}
