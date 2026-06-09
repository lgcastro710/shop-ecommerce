export default function FilterSidebar({ categories, filters, onChange, onClear }) {
  return (
    <aside className="w-56 flex-shrink-0 hidden lg:block">
      <div className="sticky top-36 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800">Filtros</h3>
          <button onClick={onClear} className="text-xs text-brand-600 hover:underline">Limpiar</button>
        </div>

        {/* Categorías */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Categoría</p>
          <div className="space-y-1">
            <button
              onClick={() => onChange({ category: 'all' })}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${filters.category === 'all' ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              Todas
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => onChange({ category: cat })}
                className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm capitalize transition ${filters.category === cat ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {cat.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Precio</p>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="Min"
              min={0}
              value={filters.minPrice}
              onChange={e => onChange({ minPrice: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-300"
            />
            <span className="text-gray-300 flex-shrink-0">—</span>
            <input
              type="number"
              placeholder="Max"
              min={0}
              value={filters.maxPrice}
              onChange={e => onChange({ maxPrice: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
        </div>

        {/* Rating */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Calificación mínima</p>
          <div className="space-y-1">
            {[0, 3, 4, 4.5].map(r => (
              <button
                key={r}
                onClick={() => onChange({ minRating: r })}
                className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${filters.minRating === r ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {r === 0 ? 'Todas' : `★ ${r}+`}
              </button>
            ))}
          </div>
        </div>

        {/* Ordenar */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ordenar por</p>
          <select
            value={filters.sort}
            onChange={e => onChange({ sort: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300 bg-white"
          >
            <option value="default">Por defecto</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor calificados</option>
            <option value="name">Nombre A-Z</option>
            <option value="discount">Mayor descuento</option>
          </select>
        </div>
      </div>
    </aside>
  )
}
