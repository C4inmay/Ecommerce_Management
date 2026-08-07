import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import Home from '../pages/Home.jsx'
import Products from '../pages/Products.jsx'
import ProductDetails from '../pages/ProductDetails.jsx'
import Categories from '../pages/Categories.jsx'
import Customers from '../pages/Customers.jsx'
import Orders from '../pages/Orders.jsx'
import NotFound from '../pages/NotFound.jsx'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="customers" element={<Customers />} />
        <Route path="orders" element={<Orders />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
