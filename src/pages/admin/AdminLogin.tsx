import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function AdminLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate successful login
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('admin_auth', 'true');
      navigate('/admin');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="bg-primary/10 p-4 rounded-2xl mb-4 border border-primary/20">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">Sign in to access the OrderFlow dashboard</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md flex items-center">
              <ShieldAlert className="h-4 w-4 mr-2" />
              {error}
            </div>
          )}
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Admin Email</label>
              <Input
                id="email"
                placeholder="admin@orderflow.com"
                type="email"
                required
                disabled={isLoading}
                defaultValue="admin@orderflow.com"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Password</label>
              </div>
              <Input
                id="password"
                placeholder="••••••••"
                type="password"
                required
                disabled={isLoading}
                defaultValue="password123"
              />
            </div>
            
            <Button className="w-full mt-6 h-11" disabled={isLoading}>
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent"
                />
              ) : (
                'Sign In to Dashboard'
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
