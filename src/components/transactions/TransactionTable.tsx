import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, Pencil, Trash2, Download, FileX } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore, formatCurrency, type Category } from '@/store/useStore';
import { toast } from 'sonner';

const categories: Category[] = ['Food', 'Shopping', 'Bills', 'Travel', 'Entertainment', 'Investments', 'Salary', 'Freelance'];

export function TransactionTable() {
  const { transactions, selectedRole, searchTerm, setSearchTerm, filters, setFilters, deleteTransaction, setModalOpen, setEditingTransaction } = useStore();
  const [sortKey, setSortKey] = useState<'date' | 'amount'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = useMemo(() => {
    let result = [...transactions];
    if (searchTerm) result = result.filter((t) => t.description.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filters.category) result = result.filter((t) => t.category === filters.category);
    if (filters.type) result = result.filter((t) => t.type === filters.type);
    result.sort((a, b) => {
      const m = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'date') return m * (new Date(a.date).getTime() - new Date(b.date).getTime());
      return m * (a.amount - b.amount);
    });
    return result;
  }, [transactions, searchTerm, filters, sortKey, sortDir]);

  const toggleSort = (key: 'date' | 'amount') => {
    if (sortKey === key) setSortDir((d) => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const exportCSV = () => {
    const header = 'Date,Description,Category,Type,Amount,Status\n';
    const rows = filtered.map((t) => `${t.date},${t.description},${t.category},${t.type},${t.amount},${t.status}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'transactions.csv'; a.click();
    toast.success('CSV exported');
  };

  const statusColor = (s: string) => s === 'completed' ? 'default' : s === 'pending' ? 'secondary' : 'destructive';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text" placeholder="Search transactions..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Select value={filters.category || 'all'} onValueChange={(v) => setFilters({ category: v === 'all' ? '' : v })}>
          <SelectTrigger className="w-[140px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Categories</SelectItem>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={filters.type || 'all'} onValueChange={(v) => setFilters({ type: v === 'all' ? '' : v })}>
          <SelectTrigger className="w-[130px]"><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent><SelectItem value="all">All Types</SelectItem><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expense</SelectItem></SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={exportCSV}><Download className="h-4 w-4 mr-1" />CSV</Button>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <FileX className="h-16 w-16 mb-4 opacity-40" />
          <p className="text-lg font-heading font-semibold">No transactions found</p>
          <p className="text-sm">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className='sticky top-0 bg-white z-10'>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium cursor-pointer" onClick={() => toggleSort('date')}>
                    <span className="inline-flex items-center gap-1">Date <ArrowUpDown className="h-3 w-3" /></span>
                  </th>
                  <th className="text-left p-3 font-medium">Description</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">Category</th>
                  <th className="text-left p-3 font-medium hidden sm:table-cell">Type</th>
                  <th className="text-right p-3 font-medium cursor-pointer" onClick={() => toggleSort('amount')}>
                    <span className="inline-flex items-center gap-1 justify-end">Amount <ArrowUpDown className="h-3 w-3" /></span>
                  </th>
                  <th className="text-left p-3 font-medium hidden lg:table-cell">Status</th>
                  {selectedRole === 'admin' && <th className="text-right p-3 font-medium">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <motion.tr key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3 tabular-nums">{new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td className="p-3">{t.description}</td>
                    <td className="p-3 hidden md:table-cell"><Badge variant="secondary" className="text-xs">{t.category}</Badge></td>
                    <td className="p-3 hidden sm:table-cell">
                      <span className={t.type === 'income' ? 'text-accent font-medium' : 'text-destructive font-medium'}>{t.type === 'income' ? 'Income' : 'Expense'}</span>
                    </td>
                    <td className={`p-3 text-right font-medium tabular-nums ${t.type === 'income' ? 'text-accent' : 'text-destructive'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                    <td className="p-3 hidden lg:table-cell"><Badge variant={statusColor(t.status)} className="text-xs capitalize">{t.status}</Badge></td>
                    {selectedRole === 'admin' && (
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => { setEditingTransaction(t); setModalOpen(true); }} className="p-1.5 rounded-md hover:bg-muted transition-colors"><Pencil className="h-3.5 w-3.5" /></button>
                          <button onClick={() => { deleteTransaction(t.id); toast.success('Transaction deleted'); }} className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </motion.div>
  );
}
