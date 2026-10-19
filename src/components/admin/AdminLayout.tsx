import React, { useState } from 'react';
import { Link, Outlet, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, ShoppingCart, Package, CreditCard, Server,
  Settings, LogOut, Menu, X, Bell, Search, User
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Input } from '../ui/Input';

const navItems = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, path: '/admin' },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
  { id: 'inventory', label: 'Inventory', icon: Package, path: '/admin/inventory' },
  { id: 'payments', label: 'Payments', icon: CreditCard, path: '/admin/payments' },
  { id: 'events', label: 'Event Logs (DLT)', icon: Server, path: '/admin/events' },
];

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Order #ORD-847291', time: '5m ago', read: false },
    { id: 2, title: 'Payment Failed for #ORD-102938', time: '1h ago', read: false },
    { id: 3, title: 'Low Stock: Keychron Q1 Pro', time: '2h ago', read: true },
  ]);

  const isAuthenticated = localStorage.getItem('admin_auth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const unreadCount = notifications.filter(n => !n.read).length;
  const markAllRead = () => setNotifications(notifications.map(n => ({ ...n, read: true })));
  const clearNotifications = () => setNotifications([]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    window.location.href = '/admin/login';
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r flex flex-col transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center justify-between h-16 border-b">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Admin Console</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t space-y-1">
          <Link 
            to="/admin/settings" 
            onClick={() => setIsSidebarOpen(false)}
            className={cn(
              "w-full flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
              location.pathname === '/admin/settings'
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Link>
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 border-b bg-card/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold capitalize">
                {navItems.find(i => location.pathname === i.path || (i.path !== '/admin' && location.pathname.startsWith(i.path)))?.label || 'Dashboard'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="w-64 pl-9 h-9 bg-muted/50 focus:bg-background transition-colors" />
            </div>
            <ThemeToggle />
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell className="h-5 w-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
                )}
              </Button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-80 bg-card border rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    <div className="p-3 border-b flex items-center justify-between bg-muted/30">
                      <h3 className="font-semibold text-sm">Notifications</h3>
                      <div className="flex gap-2">
                        <button onClick={markAllRead} className="text-xs text-primary hover:underline">Mark all read</button>
                        <button onClick={clearNotifications} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(n => (
                          <div key={n.id} className={cn("p-3 border-b last:border-0 text-sm", !n.read && "bg-primary/5")}>
                            <p className={cn("font-medium", !n.read && "text-primary")}>{n.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">No new notifications</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm border border-primary/20 cursor-pointer">
              <User className="h-4 w-4" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
