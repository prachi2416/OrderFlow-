import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../lib/utils';
import { Link } from 'react-router-dom';

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    rating: number;
    isNew?: boolean;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-card border shadow-sm transition-all hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden bg-muted/30">
        {product.isNew && (
          <Badge className="absolute left-3 top-3 z-10" variant="default">
            New Arrival
          </Badge>
        )}
        <button className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-muted-foreground opacity-0 transition-all hover:text-red-500 group-hover:opacity-100">
          <Heart className="h-4 w-4" />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-t from-black/50 to-transparent">
          <Button 
            className="w-full bg-white text-black hover:bg-white/90"
            onClick={(e) => {
              e.preventDefault();
              addItem({ ...product, quantity: 1 });
            }}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center text-amber-500">
            <Star className="h-3 w-3 fill-current" />
            <span className="ml-1 text-xs font-medium">{product.rating}</span>
          </div>
        </div>
        <Link to={`/products/${product.id}`} className="flex-1">
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold">{formatCurrency(product.price)}</span>
        </div>
      </div>
    </motion.div>
  );
}
