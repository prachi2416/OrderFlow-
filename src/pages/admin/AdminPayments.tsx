import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { formatCurrency } from '../../lib/utils';
import { paymentFailures } from '../../data/adminMockData';

export function AdminPayments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Payments</h2>
          <p className="text-sm text-muted-foreground">View payment history and manage failures.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payment Failures</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-3 font-medium">Payment ID</th>
                  <th className="px-6 py-3 font-medium">Order ID</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Reason</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {paymentFailures.length > 0 ? (
                  paymentFailures.map((pay) => (
                    <tr key={pay.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">{pay.id}</td>
                      <td className="px-6 py-4 text-primary font-medium hover:underline cursor-pointer">{pay.orderId}</td>
                      <td className="px-6 py-4 font-medium">{formatCurrency(pay.amount)}</td>
                      <td className="px-6 py-4 text-destructive font-medium">{pay.reason}</td>
                      <td className="px-6 py-4 text-muted-foreground">{pay.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                      No payment failures to display.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
