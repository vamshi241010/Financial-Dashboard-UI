import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { BalanceChart } from '@/components/dashboard/BalanceChart';
import { SpendingPieChart } from '@/components/dashboard/SpendingPieChart';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Your financial overview at a glance</p>
      </div>
      <SummaryCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BalanceChart />
        <SpendingPieChart />
      </div>
    </div>
  );
}
