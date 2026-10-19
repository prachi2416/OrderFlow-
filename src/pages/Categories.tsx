import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Monitor, Keyboard, LampDesk, Armchair, Briefcase, Home as HomeIcon, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

const categories = [
  { id: 'electronics', name: 'Electronics', icon: Monitor, count: 24, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800' },
  { id: 'accessories', name: 'Accessories', icon: Keyboard, count: 18, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800' },
  { id: 'home', name: 'Home', icon: HomeIcon, count: 12, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' },
  { id: 'furniture', name: 'Furniture', icon: Armchair, count: 8, image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=800' },
  { id: 'fashion', name: 'Fashion', icon: Briefcase, count: 15, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800' },
  { id: 'lighting', name: 'Lighting', icon: LampDesk, count: 6, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=800' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function Categories() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Shop by Category</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Explore our curated collections of premium products designed to elevate your lifestyle.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div key={category.id} variants={itemVariants}>
              <Link to={`/products?category=${category.id}`}>
                <Card className="group overflow-hidden cursor-pointer h-full border-primary/10 hover:border-primary/30 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="bg-background/80 backdrop-blur-sm p-4 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                        <Icon className="h-8 w-8 text-foreground" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-muted-foreground mt-1">{category.count} Products</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
