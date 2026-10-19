import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, CreditCard, ShieldCheck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { formatCurrency } from '../lib/utils';

export function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-24">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500 mb-8"
        >
          <Check className="h-12 w-12" />
        </motion.div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Order Confirmed!</h2>
        <p className="text-muted-foreground mb-2 text-center max-w-md">
          Thank you for your purchase. We've received your order and will begin processing it right away.
        </p>
        <p className="font-mono bg-muted px-3 py-1 rounded text-sm mb-8">
          Order ID: #ORD-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate('/orders')}>
            Track Order
          </Button>
          <Button onClick={() => navigate('/')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="grid gap-4">
                <Input placeholder="Email address" type="email" required />
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First name" required />
                  <Input placeholder="Last name" required />
                </div>
                <Input placeholder="Address" required />
                <Input placeholder="Apartment, suite, etc. (optional)" />
                <div className="grid grid-cols-3 gap-4">
                  <Input placeholder="City" required className="col-span-1" />
                  <Input placeholder="State" required className="col-span-1" />
                  <Input placeholder="ZIP code" required className="col-span-1" />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="text-primary h-5 w-5" />
                  <span className="font-medium">Credit Card</span>
                </div>
                <div className="grid gap-4">
                  <Input placeholder="Card number" required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM / YY" required />
                    <Input placeholder="CVC" required />
                  </div>
                  <Input placeholder="Name on card" required />
                </div>
              </div>
            </div>
          </form>
        </div>
        
        <div className="lg:col-span-5">
          <div className="rounded-2xl border bg-card p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-16 w-16 flex-shrink-0 rounded bg-muted border overflow-hidden relative">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                    <span className="text-sm text-muted-foreground">{formatCurrency(item.price)}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 text-sm border-t pt-4">
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
            
            <Button 
              type="submit" 
              form="checkout-form" 
              className="w-full mt-8" 
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="mr-2 h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent"
                />
              ) : (
                <ShieldCheck className="mr-2 h-5 w-5" />
              )}
              {isProcessing ? 'Processing...' : `Pay ${formatCurrency(total)}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
