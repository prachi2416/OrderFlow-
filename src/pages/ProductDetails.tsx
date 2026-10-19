import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../lib/utils';
import { mockProducts } from '../data/mockData';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find(p => p.id === id) || mockProducts[0];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-square rounded-3xl overflow-hidden bg-muted border"
        >
          {product.isNew && (
            <Badge className="absolute left-4 top-4 z-10" variant="default">
              New Arrival
            </Badge>
          )}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              {product.category}
            </span>
            <div className="flex items-center text-amber-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="ml-1 text-sm font-medium">{product.rating} (128 reviews)</span>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-6">{formatCurrency(product.price)}</p>
          
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            {product.description} This premium product is designed to elevate your daily experience with unparalleled quality and attention to detail.
          </p>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center border rounded-lg p-1">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded transition-colors"
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded transition-colors"
              >
                +
              </button>
            </div>
            <p className="text-sm text-muted-foreground">Only 12 left in stock</p>
          </div>

          <div className="flex gap-4 mb-12">
            <Button 
              size="lg" 
              className="flex-1 h-14 text-lg"
              onClick={() => addItem({ ...product, quantity })}
            >
              <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="h-14 w-14 px-0">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-8 border-t">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Free Delivery</p>
                <p className="text-xs text-muted-foreground">2-3 business days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">1 Year Warranty</p>
                <p className="text-xs text-muted-foreground">Full coverage</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
