import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux-toolkit/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateCategoriesPage from './pages/categories/createCategories.jsx'
import CategoriesPage from './pages/categories/categories.jsx'
import ProductsPage from './pages/products/products.jsx'
import CreateProductsPage from './pages/products/createProducts.jsx'
import LoginPage from './pages/auth/login.jsx'
import OrdersPage from './pages/orders/orders.jsx'


const router = createBrowserRouter([
  {
    path: '/products',
    element: <ProductsPage />
  },
  {
    path: '/create-products',
    element: <CreateProductsPage />
  },
  {
    path: '/categories',
    element: <CategoriesPage />
  },
  {
    path: '/create-categories',
    element: <CreateCategoriesPage />
  },
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: '/orders',
    element: <OrdersPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
