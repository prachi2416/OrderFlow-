import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Search, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { Link } from 'react-router-dom';

const mockOrders = [
  { id: 'ORD-847291', date: 'Oct 15, 2026', total: 413.00, status: 'delivered', items: 1 },
  { id: 'ORD-928374', date: 'Oct 19, 2026', total: 214.00, status: 'shipped', items: 1 },
  { id: 'ORD-102938', date: 'Sep 02, 2026', total: 1045.50, status: 'delivered', items: 3 },
  { id: 'ORD-564738', date: 'Aug 14, 2026', total: 89.99, status: 'returned', items: 1 },
];

export function OrderHistory() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-8 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
          <p className="text-muted-foreground">View and manage your past purchases.</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search orders..." className="pl-9" />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Total</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{order.id}</td>
                  <td className="px-6 py-4 text-muted-foreground">{order.date}</td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={
                        order.status === 'delivered' ? 'success' : 
                        order.status === 'shipped' ? 'default' : 'secondary'
                      }
                      className="capitalize"
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right font-medium">{formatCurrency(order.total)}</td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/orders`} className="inline-flex items-center text-primary hover:underline">
                      View details <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
