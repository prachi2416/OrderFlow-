import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';
import { OrderHistory } from './pages/OrderHistory';
import { ProductDetails } from './pages/ProductDetails';
import { Categories } from './pages/Categories';
import { Products } from './pages/Products';

import { AdminLayout } from './components/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminOrders } from './pages/admin/AdminOrders';
import { AdminInventory } from './pages/admin/AdminInventory';
import { AdminPayments } from './pages/admin/AdminPayments';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminLogin } from './pages/admin/AdminLogin';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="orderflow-theme">
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetails />} />
              <Route path="categories" element={<Categories />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<OrderTracking />} />
              <Route path="history" element={<OrderHistory />} />
            </Route>
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="payments" element={<AdminPayments />} />
              <Route path="events" element={<AdminEvents />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
