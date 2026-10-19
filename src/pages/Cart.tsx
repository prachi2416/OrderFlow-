import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';

export function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const navigate = useNavigate();

  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-24">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted mb-8">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. 
          Discover our premium collection and elevate your workspace.
        </p>
        <Button size="lg" onClick={() => navigate('/')}>
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="rounded-2xl border bg-card overflow-hidden">
            <div className="p-6 border-b bg-muted/30 hidden sm:grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Price</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            <ul className="divide-y">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center flex flex-col gap-4"
                  >
                    <div className="sm:col-span-6 flex items-center gap-4">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground line-clamp-2">
                          <Link to={`/products/${item.id}`}>{item.name}</Link>
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-2 flex items-center text-sm text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="mr-1 h-3 w-3" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2 flex items-center justify-between sm:justify-center border rounded-md p-1 w-32 sm:w-auto">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="flex h-8 w-8 items-center justify-center rounded hover:bg-muted transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded hover:bg-muted transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <div className="sm:col-span-2 text-right hidden sm:block text-muted-foreground">
                      {formatCurrency(item.price)}
                    </div>
                    
                    <div className="sm:col-span-2 text-right font-medium flex justify-between sm:block">
                      <span className="sm:hidden text-muted-foreground">Total:</span>
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="rounded-2xl border bg-card p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Tax</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              
              <div className="border-t pt-4 mt-4 flex justify-between">
                <span className="text-base font-bold">Total</span>
                <span className="text-xl font-bold">{formatCurrency(total)}</span>
              </div>
            </div>
            
            <Button className="w-full mt-8" size="lg" onClick={() => navigate('/checkout')}>
              Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <div className="mt-6 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Checkout - 256-bit SSL Encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
