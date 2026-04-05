import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, PiggyBank } from 'lucide-react';
import { useStore, formatCurrency } from '@/store/useStore';

export function SummaryCards() {
  const transactions = useStore((s) => s.transactions);

  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((a, t) => a + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((a, t) => a + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;

  const cards = [
    { title: 'Total Balance', value: formatCurrency(balance), icon: Wallet, change: '+12.5%', up: true, color: 'text-primary' },
    { title: 'Income', value: formatCurrency(totalIncome), icon: ArrowUpRight, change: '+8.2%', up: true, color: 'text-accent' },
    { title: 'Expenses', value: formatCurrency(totalExpenses), icon: ArrowDownRight, change: '+3.1%', up: false, color: 'text-destructive' },
    { title: 'Savings Rate', value: `${savingsRate}%`, icon: PiggyBank, change: '+2.4%', up: true, color: 'text-primary' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-card rounded-xl border p-5 card-hover"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">{card.title}</span>
            <card.icon className={`h-5 w-5 ${card.color}`} />
          </div>
          <p className="text-2xl font-heading font-bold">{card.value}</p>
          <div className="flex items-center gap-1 mt-2">
            {card.up ? <TrendingUp className="h-3 w-3 text-accent" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
            <span className={`text-xs font-medium ${card.up ? 'text-accent' : 'text-destructive'}`}>{card.change}</span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
