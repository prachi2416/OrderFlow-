import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Search, Plus, AlertTriangle, Package } from 'lucide-react';
import { inventory } from '../../data/adminMockData';

export function AdminInventory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInventory = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inventory Management</h2>
          <p className="text-sm text-muted-foreground">Monitor stock levels and update product availability.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full text-primary">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Products</p>
              <h3 className="text-2xl font-bold">{inventory.length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-full text-amber-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Low Stock</p>
              <h3 className="text-2xl font-bold">{inventory.filter(i => i.status === 'low_stock').length}</h3>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-500/5 border-red-500/20">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 bg-red-500/10 rounded-full text-red-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Out of Stock</p>
              <h3 className="text-2xl font-bold">{inventory.filter(i => i.status === 'out_of_stock').length}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="p-4 border-b">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products or SKUs..." 
              className="pl-9 h-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium">SKU</th>
                  <th className="px-6 py-3 font-medium">Available Stock</th>
                  <th className="px-6 py-3 font-medium">Reserved</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredInventory.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded border overflow-hidden bg-muted">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <span className="font-medium text-foreground">{item.name}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{item.sku}</td>
                    <td className="px-6 py-4 font-mono font-medium">{item.stock}</td>
                    <td className="px-6 py-4 font-mono text-muted-foreground">{item.reserved}</td>
                    <td className="px-6 py-4">
                      <Badge variant={
                        item.status === 'in_stock' ? 'success' : 
                        item.status === 'low_stock' ? 'secondary' : 'destructive'
                      }>
                        {item.status.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="outline" size="sm">Update Stock</Button>
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

