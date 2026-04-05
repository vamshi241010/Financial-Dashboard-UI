import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Trophy, PiggyBank, BarChart3, AlertTriangle } from 'lucide-react';
import { useStore, formatCurrency } from '@/store/useStore';

export default function InsightsPage() {
  const transactions = useStore((s) => s.transactions);

  const expenses = transactions.filter((t) => t.type === 'expense');
  const income = transactions.filter((t) => t.type === 'income');
  const totalIncome = income.reduce((a, t) => a + t.amount, 0);
  const totalExpenses = expenses.reduce((a, t) => a + t.amount, 0);
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

  const categorySpend: Record<string, number> = {};
  expenses.forEach((t) => { categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount; });
  const topCategory = Object.entries(categorySpend).sort((a, b) => b[1] - a[1])[0];
  const largestTx = [...transactions].sort((a, b) => b.amount - a.amount)[0];

  const aprExpenses = expenses.filter((t) => t.date.startsWith('2025-04')).reduce((a, t) => a + t.amount, 0);
  const marExpenses = expenses.filter((t) => t.date.startsWith('2025-03')).reduce((a, t) => a + t.amount, 0);
  const expenseChange = marExpenses > 0 ? Math.round(((aprExpenses - marExpenses) / marExpenses) * 100) : 0;

  const insights = [
    {
      title: 'Top Spending Category',
      value: topCategory ? topCategory[0] : 'N/A',
      detail: topCategory ? formatCurrency(topCategory[1]) : '',
      icon: Trophy,
      color: 'text-chart-3',
    },
    {
      title: 'Monthly Expense Trend',
      value: `${expenseChange > 0 ? '+' : ''}${expenseChange}%`,
      detail: expenseChange > 0 ? 'Expenses increased vs last month' : 'Expenses decreased vs last month',
      icon: expenseChange > 0 ? TrendingUp : TrendingDown,
      color: expenseChange > 0 ? 'text-destructive' : 'text-accent',
    },
    {
      title: 'Largest Transaction',
      value: largestTx ? formatCurrency(largestTx.amount) : 'N/A',
      detail: largestTx?.description || '',
      icon: BarChart3,
      color: 'text-primary',
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate}%`,
      detail: savingsRate >= 20 ? 'Great! Above recommended 20%' : 'Below recommended 20%',
      icon: PiggyBank,
      color: savingsRate >= 20 ? 'text-accent' : 'text-chart-3',
    },
    {
      title: 'Income vs Expenses',
      value: formatCurrency(totalIncome - totalExpenses),
      detail: `Income: ${formatCurrency(totalIncome)} | Expenses: ${formatCurrency(totalExpenses)}`,
      icon: BarChart3,
      color: 'text-primary',
    },
    {
      title: 'Spending Observation',
      value: topCategory && topCategory[1] > totalExpenses * 0.3 ? 'Spending concentrated' : 'Balanced spending',
      detail: topCategory ? `${topCategory[0]} contributes ${Math.round((topCategory[1] / totalExpenses) * 100)}% of total monthly expenses` : '',
      icon: AlertTriangle,
      color: 'text-chart-3',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Insights</h1>
        <p className="text-muted-foreground text-sm">AI-powered observations about your finances</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((ins, i) => (
          <motion.div
            key={ins.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card rounded-xl border p-5 card-hover"
          >
            <div className="flex items-center gap-3 mb-3">
              <ins.icon className={`h-5 w-5 ${ins.color}`} />
              <span className="text-sm text-muted-foreground">{ins.title}</span>
            </div>
            <p className="text-xl font-heading font-bold">{ins.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{ins.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
