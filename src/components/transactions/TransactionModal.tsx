import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore, type Transaction, type Category, type TransactionType, type TransactionStatus } from '@/store/useStore';
import { toast } from 'sonner';

const categories: Category[] = ['Food', 'Shopping', 'Bills', 'Travel', 'Entertainment', 'Investments', 'Salary', 'Freelance'];

export function TransactionModal() {
  const { modalOpen, setModalOpen, editingTransaction, setEditingTransaction, addTransaction, updateTransaction } = useStore();

  const [form, setForm] = useState({
    date: '', description: '', category: 'Food' as Category, type: 'expense' as TransactionType, amount: '', status: 'completed' as TransactionStatus,
  });

  useEffect(() => {
    if (editingTransaction) {
      setForm({ ...editingTransaction, amount: String(editingTransaction.amount) });
    } else {
      setForm({ date: new Date().toISOString().split('T')[0], description: '', category: 'Food', type: 'expense', amount: '', status: 'completed' });
    }
  }, [editingTransaction, modalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tx: Transaction = { ...form, amount: Number(form.amount), id: editingTransaction?.id || crypto.randomUUID() };
    if (editingTransaction) {
      updateTransaction(tx);
      toast.success('Transaction updated');
    } else {
      addTransaction(tx);
      toast.success('Transaction added');
    }
    setModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={(o) => { setModalOpen(o); if (!o) setEditingTransaction(null); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">{editingTransaction ? 'Edit' : 'Add'} Transaction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Date</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></div>
            <div><Label>Amount (₹)</Label><Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required min="1" /></div>
          </div>
          <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as Category })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as TransactionType })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="income">Income</SelectItem><SelectItem value="expense">Expense</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Status</Label>
            <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as TransactionStatus })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="completed">Completed</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="failed">Failed</SelectItem></SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">{editingTransaction ? 'Update' : 'Add'} Transaction</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
