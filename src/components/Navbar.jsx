import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const { cartCount, favs } = useShop()
  const [cartOpen, setCartOpen] = useState(false)
  const [query, setQuery]       = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) navigate(`/?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <>
      {/* Top bar */}
      <div className="bg-gradient-to-r from-brand-600 to-purple-600 text-white text-center text-xs py-2 font-medium tracking-wide">
        🎉 Envío gratis en compras mayores a $50 · Hasta 12 cuotas sin interés
      </div>

      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4 h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-1.5">
            <span className="text-2xl">🛍️</span>
            <span className="font-bold text-xl bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">
              shop
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar productos, marcas..."
                className="w-full bg-gray-100 rounded-full px-5 py-2.5 pr-12 text-sm outline-none focus:ring-2 focus:ring-brand-400 transition"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-600 transition"
              >
                🔍
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/favoritos"
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition text-xl"
              title="Favoritos"
            >
              ♡
              {favs.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favs.length > 9 ? '9+' : favs.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
            >
              🛒
              <span className="hidden sm:inline">Carrito</span>
              {cartCount > 0 && (
                <span className="bg-white text-brand-600 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Category nav */}
        <nav className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-6 overflow-x-auto scrollbar-hide py-2">
            {['smartphones','laptops','fragrances','skincare','groceries','home-decoration','furniture','tops','womens-dresses','mens-shirts'].map(cat => (
              <Link
                key={cat}
                to={`/?cat=${cat}`}
                className="text-xs text-gray-500 hover:text-brand-600 whitespace-nowrap capitalize transition font-medium"
              >
                {cat.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
