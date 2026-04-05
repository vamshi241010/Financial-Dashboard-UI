import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', balance: 45000 },
  { month: 'Feb', balance: 52000 },
  { month: 'Mar', balance: 48000 },
  { month: 'Apr', balance: 61000 },
  { month: 'May', balance: 55000 },
  { month: 'Jun', balance: 67000 },
  { month: 'Jul', balance: 72000 },
  { month: 'Aug', balance: 69000 },
  { month: 'Sep', balance: 78000 },
  { month: 'Oct', balance: 82000 },
  { month: 'Nov', balance: 88000 },
  { month: 'Dec', balance: 95000 },
];

export function BalanceChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-xl border p-5 card-hover"
    >
      <h3 className="font-heading font-semibold mb-4">Monthly Balance Trend</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Balance']}
            />
            <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: 'hsl(var(--primary))' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
