import { Routes, Route } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Favoritos from './pages/Favoritos'

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/producto/:id"   element={<ProductDetail />} />
          <Route path="/favoritos"      element={<Favoritos />} />
        </Routes>

        <footer className="border-t border-gray-100 bg-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center text-sm text-gray-400">
            <p className="font-bold text-gray-600 mb-1">🛍️ shop — Gerar.Dev</p>
            <p>Construido con React + Tailwind CSS · API: DummyJSON</p>
          </div>
        </footer>
      </div>
    </ShopProvider>
  )
}
