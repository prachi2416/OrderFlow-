import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle2, CircleDashed, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const steps = [
  { id: 'placed', label: 'Order Placed', icon: Package, date: 'Oct 19, 2026 10:24 AM' },
  { id: 'processing', label: 'Processing', icon: CircleDashed, date: 'Oct 19, 2026 02:15 PM' },
  { id: 'shipped', label: 'Shipped', icon: Truck, date: 'Oct 20, 2026 09:30 AM' },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle2, date: 'Pending' },
];

export function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const currentStep = 2; // 0-based index, so 'shipped' is current

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setIsTracking(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Track Your Order</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Enter your order ID below to get real-time updates on your shipment status.
        </p>
      </div>

      <Card className="mb-12 border-primary/20 shadow-lg shadow-primary/5">
        <CardContent className="p-6">
          <form onSubmit={handleTrack} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="e.g. ORD-123456" 
                className="pl-10 h-12 text-lg"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              Track
            </Button>
          </form>
        </CardContent>
      </Card>

      {isTracking && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-semibold">Order #{orderId.toUpperCase()}</h2>
              <p className="text-muted-foreground">Arriving by Oct 22, 2026</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              In Transit
            </span>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="relative">
                {/* Progress Bar Background */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-muted sm:left-1/2 sm:-ml-0.5 sm:top-6 sm:bottom-auto sm:h-0.5 sm:w-full sm:right-6"></div>
                
                {/* Active Progress Bar */}
                <div 
                  className="absolute left-6 top-8 w-0.5 bg-primary transition-all duration-1000 ease-in-out sm:left-1/2 sm:-ml-0.5 sm:top-6 sm:h-0.5"
                  style={{ 
                    height: window.innerWidth < 640 ? `${(currentStep / (steps.length - 1)) * 100}%` : '0.5px',
                    width: window.innerWidth >= 640 ? `${(currentStep / (steps.length - 1)) * 100}%` : '0.5px',
                    left: window.innerWidth >= 640 ? '6px' : '24px'
                  }}
                ></div>

                <div className="relative flex flex-col sm:flex-row justify-between gap-8 sm:gap-4">
                  {steps.map((step, index) => {
                    const isCompleted = index <= currentStep;
                    const isCurrent = index === currentStep;
                    const Icon = step.icon;
                    
                    return (
                      <div key={step.id} className="relative flex sm:flex-col items-start sm:items-center gap-4 z-10">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.2 }}
                          className={`flex h-12 w-12 items-center justify-center rounded-full border-4 border-card ${
                            isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.div>
                        <div className="pt-2 sm:pt-0 sm:text-center">
                          <h4 className={`font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {step.label}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Details</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p className="font-medium">John Doe</p>
                <p className="text-muted-foreground">123 Innovation Drive</p>
                <p className="text-muted-foreground">Suite 400</p>
                <p className="text-muted-foreground">San Francisco, CA 94105</p>
                <p className="text-muted-foreground mt-4">Tracking: 1Z9999999999999999 (UPS)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded bg-muted overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=200" alt="Item" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sony WH-1000XM5</p>
                    <p className="text-xs text-muted-foreground">Qty: 1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}
