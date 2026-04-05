import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useStore, formatCurrency } from '@/store/useStore';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
];

export function SpendingPieChart() {
  const transactions = useStore((s) => s.transactions);
  const expenses = transactions.filter((t) => t.type === 'expense');

  const categoryMap: Record<string, number> = {};
  expenses.forEach((t) => { categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount; });
  const data = Object.entries(categoryMap).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-xl border p-5 card-hover"
    >
      <h3 className="font-heading font-semibold mb-4">Spending by Category</h3>
      <div className="h-[280px] flex items-center">
        <div className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '0.5rem' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 space-y-2">
          {data.slice(0, 6).map((item, i) => (
            <div key={item.name} className="flex items-center gap-2 text-sm">
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="truncate text-muted-foreground">{item.name}</span>
              <span className="ml-auto font-medium tabular-nums">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
