import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/products/ProductCard';
import { mockProducts } from '../data/mockData';
import { Link } from 'react-router-dom';

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

export function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="container relative z-10 mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="max-w-2xl"
            >
              <motion.div variants={itemVariants} className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                New Collection 2026
              </motion.div>
              <motion.h1 variants={itemVariants} className="mb-6 text-5xl sm:text-6xl font-extrabold tracking-tight text-foreground lg:text-7xl">
                Elevate your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
                  digital lifestyle.
                </span>
              </motion.h1>
              <motion.p variants={itemVariants} className="mb-8 text-lg text-muted-foreground sm:text-xl">
                Discover premium gear designed for modern professionals. 
                Exceptional quality, minimalist design, and unparalleled performance.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="rounded-full px-8">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/categories">
                  <Button size="lg" variant="outline" className="rounded-full px-8">
                    View Categories
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 to-violet-500/20 blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200" 
                alt="Premium Headphones" 
                className="relative rounded-3xl border border-white/10 shadow-2xl object-cover h-[500px] w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Free Express Shipping</h3>
                <p className="text-sm text-muted-foreground">On all orders over $150</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">256-bit encryption</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold">Instant Support</h3>
                <p className="text-sm text-muted-foreground">24/7 customer service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked essentials for your setup.</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center text-sm font-medium text-primary hover:underline">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 flex justify-center sm:hidden">
            <Link to="/products" className="w-full">
              <Button variant="outline" className="w-full">
                View all products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
