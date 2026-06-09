import { useShop } from '../context/ShopContext'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'

export default function Favoritos() {
  const { favs } = useShop()
  const { products, loading } = useProducts()

  const favProducts = products.filter(p => favs.includes(p.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Mis favoritos ♥</h1>
        <p className="text-gray-400 text-sm mt-1">{favProducts.length} producto{favProducts.length !== 1 ? 's' : ''} guardado{favProducts.length !== 1 ? 's' : ''}</p>
      </div>

      {!loading && favProducts.length === 0 && (
        <div className="text-center py-24">
          <p className="text-6xl mb-4">♡</p>
          <p className="font-semibold text-gray-600 text-lg">Todavía no tenés favoritos</p>
          <p className="text-gray-400 text-sm mt-1 mb-6">Hacé clic en el corazón de cualquier producto para guardarlo acá</p>
          <Link to="/" className="inline-block bg-brand-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-brand-700 transition text-sm">
            Explorar productos
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {favProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
