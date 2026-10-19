import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../components/products/ProductCard';
import { mockProducts } from '../data/mockData';
import { Button } from '../components/ui/Button';

export function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update active category if URL changes
  useEffect(() => {
    setActiveCategory(searchParams.get('category'));
  }, [location.search]);

  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  const filteredProducts = activeCategory 
    ? mockProducts.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase())
    : mockProducts;

  return (
    <div className="container mx-auto px-4 py-12 sm:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            {activeCategory ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}` : 'All Products'}
          </h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="md:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center mr-2">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filter by:
            </span>
            <Button 
              variant={activeCategory === null ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setActiveCategory(null)}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map(cat => (
              <Button 
                key={cat}
                variant={activeCategory?.toLowerCase() === cat.toLowerCase() ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveCategory(cat.toLowerCase())}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile filters */}
      {isFilterOpen && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden mb-8 overflow-hidden"
        >
          <div className="p-4 bg-muted/30 rounded-xl border flex flex-wrap gap-2">
            <Button 
              variant={activeCategory === null ? 'default' : 'outline'} 
              size="sm"
              onClick={() => { setActiveCategory(null); setIsFilterOpen(false); }}
              className="rounded-full"
            >
              All
            </Button>
            {categories.map(cat => (
              <Button 
                key={cat}
                variant={activeCategory?.toLowerCase() === cat.toLowerCase() ? 'default' : 'outline'} 
                size="sm"
                onClick={() => { setActiveCategory(cat.toLowerCase()); setIsFilterOpen(false); }}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border rounded-2xl bg-muted/10 border-dashed">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-6">We couldn't find any products matching your current filters.</p>
          <Button onClick={() => setActiveCategory(null)}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
