# 🛍 Shop — E-commerce Portfolio Project

React + Tailwind CSS · API: [DummyJSON](https://dummyjson.com)

## Stack

- **React 18** + React Router v6
- **Tailwind CSS** v3
- **Vite** (bundler)
- **DummyJSON** (fake API, no backend necesario)

## Features

- 🗂 Catálogo con 80+ productos reales
- 🔍 Búsqueda en tiempo real
- 🏷 Filtros por categoría, precio y rating
- ↕️ Ordenamiento por precio, rating, descuento y nombre
- 🛒 Carrito con drawer lateral (persistido en localStorage)
- ♥ Favoritos (persistidos en localStorage)
- 📄 Página de detalle de producto
- 💀 Skeleton loaders mientras cargan los datos
- 📱 Responsive (mobile first)

## Instalación

```bash
# 1. Instalá dependencias
npm install

# 2. Corré el servidor de desarrollo
npm run dev

# 3. Abrí http://localhost:5173
```

## Estructura

```
src/
├── components/
│   ├── Navbar.jsx          # Header + nav de categorías
│   ├── CartDrawer.jsx      # Carrito lateral
│   ├── ProductCard.jsx     # Tarjeta de producto
│   ├── FilterSidebar.jsx   # Filtros laterales
│   └── ProductSkeleton.jsx # Loader animado
├── pages/
│   ├── Home.jsx            # Catálogo principal
│   ├── ProductDetail.jsx   # Detalle de producto
│   └── Favoritos.jsx       # Lista de favoritos
├── context/
│   └── ShopContext.jsx     # Estado global (carrito + favs)
├── hooks/
│   └── useProducts.js      # Fetch de productos
└── utils/
    └── helpers.js          # Precio final, formato, estrellas
```

## Deploy en GitHub Pages

```bash
# 1. Instalá el plugin
npm install --save-dev gh-pages

# 2. Agregá en package.json:
#    "homepage": "https://tuusuario.github.io/shop",
#    "predeploy": "npm run build",
#    "deploy": "gh-pages -d dist"

# 3. En vite.config.js agregá:
#    base: '/shop/'

# 4. Deploy
npm run deploy
```
