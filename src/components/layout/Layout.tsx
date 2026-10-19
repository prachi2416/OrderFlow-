import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import { ShoppingBag, Search, Menu, User, Package } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { motion } from 'framer-motion';

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">OrderFlow</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">Products</Link>
            <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">Categories</Link>
            <Link to="/orders" className="text-muted-foreground hover:text-foreground transition-colors">Track Order</Link>
            <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">Admin</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative group">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              className="h-9 w-64 rounded-full border bg-muted/50 pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all group-hover:bg-background"
            />
          </div>
          
          <ThemeToggle />
          
          <Link to="/login" className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent transition-colors">
            <User className="h-5 w-5" />
          </Link>
          
          <Link to="/cart" className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
          
          <button className="md:hidden flex items-center justify-center h-10 w-10 rounded-full hover:bg-accent transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-12">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">OrderFlow</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium e-commerce experience designed for the modern web.
              Beautiful, fast, and secure.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-foreground transition-colors">Categories</Link></li>
              <li><Link to="/products?category=sale" className="hover:text-foreground transition-colors">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/orders" className="hover:text-foreground transition-colors">Track Order</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Returns</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} OrderFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1 flex flex-col relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
