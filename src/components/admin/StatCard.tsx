import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color?: string;
  delay?: number;
}

export function StatCard({ title, value, icon: Icon, trend, color, delay = 0 }: StatCardProps) {
  const isPositive = trend?.startsWith('+');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={cn("p-2 rounded-md bg-muted/50", color)}>
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold tracking-tight">{value}</div>
          {trend && (
            <p className={cn("text-xs flex items-center mt-1", isPositive ? "text-emerald-500" : "text-red-500")}>
              {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {trend} from last month
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
