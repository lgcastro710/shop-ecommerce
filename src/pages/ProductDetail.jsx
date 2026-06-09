import { useParams, Link } from 'react-router-dom'
import { useProduct } from '../hooks/useProducts'
import { useShop } from '../context/ShopContext'
import { finalPrice, fmt, stars } from '../utils/helpers'

export default function ProductDetail() {
  const { id } = useParams()
  const { product, loading, error } = useProduct(id)
  const { addToCart, toggleFav, isFav } = useShop()

  if (loading) return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-pulse">
      <div className="grid sm:grid-cols-2 gap-10">
        <div className="bg-gray-100 rounded-3xl aspect-square" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-100 rounded-full w-1/4" />
          <div className="h-8 bg-gray-100 rounded-full w-3/4" />
          <div className="h-4 bg-gray-100 rounded-full w-1/3" />
          <div className="h-24 bg-gray-100 rounded-xl" />
          <div className="h-12 bg-gray-100 rounded-full" />
        </div>
      </div>
    </div>
  )

  if (error || !product) return (
    <div className="text-center py-24 text-gray-400">
      <p className="text-5xl mb-4">😕</p>
      <p className="font-medium text-lg">{error || 'Producto no encontrado'}</p>
      <Link to="/" className="mt-4 inline-block text-brand-600 hover:underline text-sm">← Volver al catálogo</Link>
    </div>
  )

  const price   = finalPrice(product)
  const hasDisc = product.discountPercentage > 1
  const fav     = isFav(product.id)

  function handleCart() {
    addToCart({ id: product.id, title: product.title, price, thumbnail: product.thumbnail })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6 flex gap-2 items-center">
        <Link to="/" className="hover:text-brand-600 transition">Inicio</Link>
        <span>/</span>
        <Link to={`/?cat=${product.category}`} className="hover:text-brand-600 capitalize transition">{product.category?.replace(/-/g, ' ')}</Link>
        <span>/</span>
        <span className="text-gray-600 line-clamp-1">{product.title}</span>
      </nav>

      <div className="grid sm:grid-cols-2 gap-8 lg:gap-14">
        {/* Image */}
        <div className="relative">
          <div className="bg-gray-50 rounded-3xl aspect-square flex items-center justify-center p-8 border border-gray-100">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
          {hasDisc && (
            <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              -{Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs text-brand-600 font-semibold uppercase tracking-widest mb-2 capitalize">
            {product.category?.replace(/-/g, ' ')} {product.brand ? `· ${product.brand}` : ''}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-amber-400 text-sm">{stars(product.rating)}</span>
            <span className="text-sm text-gray-500 font-medium">{product.rating?.toFixed(1)}</span>
            <span className="text-gray-300">|</span>
            <span className={`text-xs font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-500' : 'text-red-500'}`}>
              {product.stock > 10 ? '✓ En stock' : product.stock > 0 ? `⚠ Últimas ${product.stock} unidades` : '✗ Sin stock'}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-extrabold text-gray-900">{fmt(price)}</span>
            {hasDisc && (
              <span className="text-gray-400 text-lg line-through">{fmt(product.price)}</span>
            )}
          </div>

          {hasDisc && (
            <p className="text-sm text-green-600 font-medium mb-4">
              Ahorrás {fmt(product.price - price)} con este descuento 🎉
            </p>
          )}

          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {[
              { label: 'Categoría', val: product.category?.replace(/-/g, ' ') },
              { label: 'Marca',     val: product.brand || '—' },
              { label: 'Stock',     val: `${product.stock} uds.` },
              { label: 'Rating',    val: `${product.rating?.toFixed(1)} / 5` },
            ].map(({ label, val }) => (
              <div key={label} className="bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">{label}</p>
                <p className="text-sm text-gray-700 font-medium capitalize">{val}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleCart}
              disabled={product.stock === 0}
              className="flex-1 bg-gradient-to-r from-brand-600 to-purple-600 hover:opacity-90 disabled:opacity-40 text-white font-semibold py-3.5 rounded-full transition active:scale-95"
            >
              🛒 Agregar al carrito
            </button>
            <button
              onClick={() => toggleFav(product.id)}
              className={`w-12 h-12 rounded-full border-2 text-xl flex items-center justify-center transition ${
                fav
                  ? 'border-rose-400 bg-rose-50 text-rose-500'
                  : 'border-gray-200 hover:border-rose-300 hover:text-rose-400 text-gray-300'
              }`}
            >
              {fav ? '♥' : '♡'}
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex gap-4 mt-6 pt-6 border-t border-gray-100">
            {[
              { icon: '🚚', text: 'Envío gratis +$50' },
              { icon: '🔄', text: '30 días devolución' },
              { icon: '🔒', text: 'Pago seguro' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-xs text-gray-400">
                <span>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
