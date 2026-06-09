import { createContext, useContext, useState, useEffect } from 'react'

const ShopContext = createContext(null)

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shop_cart') || '[]') } catch { return [] }
  })
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('shop_favs') || '[]') } catch { return [] }
  })

  useEffect(() => { localStorage.setItem('shop_cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('shop_favs', JSON.stringify(favs)) }, [favs])

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  function addToCart(product) {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  function updateQty(id, qty) {
    if (qty <= 0) return removeFromCart(id)
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  function clearCart() { setCart([]) }

  function toggleFav(id) {
    setFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id])
  }

  const isFav = (id) => favs.includes(id)

  return (
    <ShopContext.Provider value={{
      cart, cartCount, cartTotal,
      addToCart, removeFromCart, updateQty, clearCart,
      favs, toggleFav, isFav,
    }}>
      {children}
    </ShopContext.Provider>
  )
}

export const useShop = () => useContext(ShopContext)
