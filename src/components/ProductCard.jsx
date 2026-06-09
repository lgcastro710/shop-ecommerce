import { Link } from 'react-router-dom'
import { useShop } from '../context/ShopContext'
import { finalPrice, fmt, stars } from '../utils/helpers'

export default function ProductCard({ product }) {
  const { addToCart, toggleFav, isFav } = useShop()
  const fav      = isFav(product.id)
  const price    = finalPrice(product)
  const hasDisc  = product.discountPercentage > 1
  const discount = Math.round(product.discountPercentage)

  function handleCart(e) {
    e.preventDefault()
    addToCart({ id: product.id, title: product.title, price, thumbnail: product.thumbnail })
  }

  function handleFav(e) {
    e.preventDefault()
    toggleFav(product.id)
  }

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      {/* Image */}
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {hasDisc && (
          <span className="absolute top-2 left-2 bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}

        <button
          onClick={handleFav}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all ${
            fav
              ? 'bg-rose-50 text-rose-500 scale-110'
              : 'bg-white/80 text-gray-300 hover:text-rose-400 hover:bg-rose-50'
          }`}
        >
          {fav ? '♥' : '♡'}
        </button>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-[11px] text-brand-500 font-semibold uppercase tracking-wide mb-0.5 capitalize">
          {product.category?.replace(/-/g, ' ')}
        </p>
        <p className="text-sm text-gray-800 font-medium line-clamp-2 leading-snug mb-2 flex-1">
          {product.title}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <span className="text-amber-400 text-xs">{stars(product.rating)}</span>
          <span className="text-xs text-gray-400">({product.rating?.toFixed(1)})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-gray-900 font-bold text-base">{fmt(price)}</span>
          {hasDisc && (
            <span className="text-gray-400 text-xs line-through">{fmt(product.price)}</span>
          )}
        </div>

        <button
          onClick={handleCart}
          className="w-full bg-brand-600 hover:bg-brand-700 active:scale-95 text-white text-xs font-semibold py-2 rounded-full transition-all"
        >
          Agregar al carrito
        </button>
      </div>
    </Link>
  )
}
