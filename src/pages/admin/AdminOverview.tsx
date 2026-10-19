import React from 'react';
import { IndianRupee, ShoppingCart, CheckCircle2, XCircle } from 'lucide-react';
import { StatCard } from '../../components/admin/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';
import { overviewMetrics, recentOrders, revenueData, orderStatusData } from '../../data/adminMockData';
import { Badge } from '../../components/ui/Badge';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ICONS = {
  IndianRupee,
  ShoppingCart,
  CheckCircle2,
  XCircle
};

const COLORS = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b'];

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-sm text-muted-foreground">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="h-9 rounded-md border bg-background px-3 py-1 text-sm outline-none focus:ring-1 focus:ring-primary">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewMetrics.map((metric, i) => (
          <StatCard
            key={metric.title}
            title={metric.title}
            value={metric.type === 'currency' ? formatCurrency(metric.value as number) : metric.value.toLocaleString()}
            icon={ICONS[metric.icon as keyof typeof ICONS]}
            trend={metric.trend}
            color={metric.color}
            delay={i * 0.1}
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888888' }} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                  formatter={(value: any) => [formatCurrency(Number(value)), 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-6 flex flex-wrap justify-center gap-4 text-xs">
              {orderStatusData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium">Order ID</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">Amount</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{order.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-xs text-muted-foreground">{order.email}</div>
                    </td>
                    <td className="px-4 py-3 font-medium">{formatCurrency(order.amount)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant={order.status === 'completed' ? 'success' : order.status === 'failed' ? 'destructive' : 'secondary'}
                        className="capitalize"
                      >
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
