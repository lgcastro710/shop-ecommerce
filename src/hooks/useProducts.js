import { useState, useEffect } from 'react'

const BASE = 'https://dummyjson.com'

export function useProducts() {
  const [products, setProducts]     = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${BASE}/products?limit=80&select=id,title,price,discountPercentage,rating,stock,category,thumbnail,description,brand`),
          fetch(`${BASE}/products/categories`),
        ])
        const prodData = await prodRes.json()
        const catData  = await catRes.json()
        setProducts(prodData.products)
        setCategories(catData.map(c => (typeof c === 'string' ? c : c.slug)))
      } catch (e) {
        setError('No se pudieron cargar los productos.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { products, categories, loading, error }
}

export function useProduct(id) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`${BASE}/products/${id}`)
      .then(r => r.json())
      .then(data => setProduct(data))
      .catch(() => setError('Producto no encontrado.'))
      .finally(() => setLoading(false))
  }, [id])

  return { product, loading, error }
}
