import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import { finalPrice } from '../utils/helpers'
import ProductCard from '../components/ProductCard'
import ProductSkeleton from '../components/ProductSkeleton'
import FilterSidebar from '../components/FilterSidebar'

const DEFAULT_FILTERS = {
  category: 'all',
  minPrice: '',
  maxPrice: '',
  minRating: 0,
  sort: 'default',
}

export default function Home() {
  const { products, categories, loading, error } = useProducts()
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS })

  // Sync URL params
  useEffect(() => {
    const cat = searchParams.get('cat')
    const q   = searchParams.get('q')
    setFilters(f => ({
      ...f,
      category: cat || 'all',
      search: q || '',
    }))
  }, [searchParams])

  function handleFilter(updates) {
    setFilters(f => ({ ...f, ...updates }))
  }

  function handleClear() {
    setFilters({ ...DEFAULT_FILTERS })
  }

  const filtered = useMemo(() => {
    let list = [...products]
    const q = (filters.search || searchParams.get('q') || '').toLowerCase()

    if (filters.category !== 'all') list = list.filter(p => p.category === filters.category)
    if (q) list = list.filter(p => p.title.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q))
    if (filters.minPrice) list = list.filter(p => finalPrice(p) >= parseFloat(filters.minPrice))
    if (filters.maxPrice) list = list.filter(p => finalPrice(p) <= parseFloat(filters.maxPrice))
    if (filters.minRating > 0) list = list.filter(p => p.rating >= filters.minRating)

    if (filters.sort === 'price-asc')  list.sort((a, b) => finalPrice(a) - finalPrice(b))
    if (filters.sort === 'price-desc') list.sort((a, b) => finalPrice(b) - finalPrice(a))
    if (filters.sort === 'rating')     list.sort((a, b) => b.rating - a.rating)
    if (filters.sort === 'name')       list.sort((a, b) => a.title.localeCompare(b.title))
    if (filters.sort === 'discount')   list.sort((a, b) => b.discountPercentage - a.discountPercentage)

    return list
  }, [products, filters, searchParams])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero banner */}
      {!searchParams.get('q') && !searchParams.get('cat') && (
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-brand-500 via-brand-600 to-purple-600 p-8 sm:p-12 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 70% 50%, white 0%, transparent 60%)'}} />
          <p className="text-sm font-semibold tracking-widest uppercase opacity-80 mb-2">Nuevos ingresos</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
            Los mejores productos<br />al mejor precio 🔥
          </h1>
          <p className="opacity-80 text-sm mb-5 max-w-md">
            Explorá más de 80 productos de todas las categorías. Envío gratis en tu primera compra.
          </p>
          <button className="bg-white text-brand-600 font-bold px-6 py-2.5 rounded-full hover:bg-brand-50 transition text-sm">
            Ver ofertas
          </button>
        </div>
      )}

      {searchParams.get('q') && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Resultados para: <span className="text-brand-600">"{searchParams.get('q')}"</span>
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">{filtered.length} productos encontrados</p>
        </div>
      )}

      <div className="flex gap-8">
        <FilterSidebar
          categories={categories}
          filters={filters}
          onChange={handleFilter}
          onClear={handleClear}
        />

        <main className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">
              <span className="font-semibold text-gray-800">{filtered.length}</span> producto{filtered.length !== 1 ? 's' : ''}
            </p>
            {/* Mobile sort */}
            <select
              value={filters.sort}
              onChange={e => handleFilter({ sort: e.target.value })}
              className="lg:hidden border border-gray-200 rounded-lg px-2 py-1.5 text-xs outline-none"
            >
              <option value="default">Ordenar</option>
              <option value="price-asc">Precio ↑</option>
              <option value="price-desc">Precio ↓</option>
              <option value="rating">Rating</option>
              <option value="discount">Descuento</option>
            </select>
          </div>

          {error && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-4xl mb-3">⚠️</p>
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {loading
              ? <ProductSkeleton count={8} />
              : filtered.length === 0
                ? (
                  <div className="col-span-full text-center py-20 text-gray-400">
                    <p className="text-4xl mb-3">🔍</p>
                    <p className="font-medium">No encontramos productos con esos filtros</p>
                    <button onClick={handleClear} className="mt-4 text-brand-600 text-sm hover:underline">Limpiar filtros</button>
                  </div>
                )
                : filtered.map(p => <ProductCard key={p.id} product={p} />)
            }
          </div>
        </main>
      </div>
    </div>
  )
}
