import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { TransactionModal } from '@/components/transactions/TransactionModal';
import { useStore } from '@/store/useStore';

export default function TransactionsPage() {
  const { selectedRole, setModalOpen, setEditingTransaction } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Transactions</h1>
          <p className="text-muted-foreground text-sm">Manage and track all your transactions</p>
        </div>
      </div>
      <TransactionTable />
      <TransactionModal />
      {selectedRole === 'admin' && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setEditingTransaction(null); setModalOpen(true); }}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow z-50"
        >
          <Plus className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
}
