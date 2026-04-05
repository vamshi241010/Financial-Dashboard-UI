import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'admin' | 'viewer';
export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'completed' | 'pending' | 'failed';
export type Category = 'Food' | 'Shopping' | 'Bills' | 'Travel' | 'Entertainment' | 'Investments' | 'Salary' | 'Freelance';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: Category;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
}

interface AppState {
  transactions: Transaction[];
  selectedRole: Role;
  filters: { category: string; type: string };
  searchTerm: string;
  darkMode: boolean;
  modalOpen: boolean;
  editingTransaction: Transaction | null;
  setRole: (role: Role) => void;
  setSearchTerm: (term: string) => void;
  setFilters: (f: Partial<AppState['filters']>) => void;
  toggleDarkMode: () => void;
  setModalOpen: (open: boolean) => void;
  setEditingTransaction: (t: Transaction | null) => void;
  addTransaction: (t: Transaction) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

const mockTransactions: Transaction[] = [
  { id: '1', date: '2025-04-01', description: 'Monthly Salary', category: 'Salary', type: 'income', amount: 85000, status: 'completed' },
  { id: '2', date: '2025-04-02', description: 'Swiggy Order', category: 'Food', type: 'expense', amount: 450, status: 'completed' },
  { id: '3', date: '2025-04-03', description: 'Amazon Purchase', category: 'Shopping', type: 'expense', amount: 2999, status: 'completed' },
  { id: '4', date: '2025-04-04', description: 'Electricity Bill', category: 'Bills', type: 'expense', amount: 1800, status: 'completed' },
  { id: '5', date: '2025-04-05', description: 'Goa Trip Booking', category: 'Travel', type: 'expense', amount: 12500, status: 'pending' },
  { id: '6', date: '2025-04-06', description: 'Netflix Subscription', category: 'Entertainment', type: 'expense', amount: 649, status: 'completed' },
  { id: '7', date: '2025-04-07', description: 'Mutual Fund SIP', category: 'Investments', type: 'expense', amount: 5000, status: 'completed' },
  { id: '8', date: '2025-04-08', description: 'Freelance Project', category: 'Freelance', type: 'income', amount: 25000, status: 'completed' },
  { id: '9', date: '2025-04-10', description: 'Grocery Shopping', category: 'Food', type: 'expense', amount: 3200, status: 'completed' },
  { id: '10', date: '2025-04-12', description: 'Mobile Recharge', category: 'Bills', type: 'expense', amount: 599, status: 'completed' },
  { id: '11', date: '2025-04-14', description: 'Movie Tickets', category: 'Entertainment', type: 'expense', amount: 800, status: 'completed' },
  { id: '12', date: '2025-04-15', description: 'Uber Rides', category: 'Travel', type: 'expense', amount: 1200, status: 'completed' },
  { id: '13', date: '2025-04-18', description: 'Myntra Sale', category: 'Shopping', type: 'expense', amount: 4500, status: 'completed' },
  { id: '14', date: '2025-04-20', description: 'Stock Dividend', category: 'Investments', type: 'income', amount: 3200, status: 'completed' },
  { id: '15', date: '2025-04-22', description: 'Zomato Gold', category: 'Food', type: 'expense', amount: 350, status: 'failed' },
  { id: '16', date: '2025-03-01', description: 'March Salary', category: 'Salary', type: 'income', amount: 82000, status: 'completed' },
  { id: '17', date: '2025-03-05', description: 'Rent Payment', category: 'Bills', type: 'expense', amount: 15000, status: 'completed' },
  { id: '18', date: '2025-03-10', description: 'Flipkart Order', category: 'Shopping', type: 'expense', amount: 6200, status: 'completed' },
  { id: '19', date: '2025-02-01', description: 'February Salary', category: 'Salary', type: 'income', amount: 80000, status: 'completed' },
  { id: '20', date: '2025-02-14', description: 'Valentine Dinner', category: 'Food', type: 'expense', amount: 3500, status: 'completed' },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      selectedRole: 'admin',
      filters: { category: '', type: '' },
      searchTerm: '',
      darkMode: false,
      modalOpen: false,
      editingTransaction: null,
      setRole: (role) => set({ selectedRole: role }),
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setFilters: (f) => set((s) => ({ filters: { ...s.filters, ...f } })),
      toggleDarkMode: () => set((s) => ({ darkMode: !s.darkMode })),
      setModalOpen: (modalOpen) => set({ modalOpen }),
      setEditingTransaction: (editingTransaction) => set({ editingTransaction }),
      addTransaction: (t) => set((s) => ({ transactions: [t, ...s.transactions] })),
      updateTransaction: (t) => set((s) => ({ transactions: s.transactions.map((tx) => tx.id === t.id ? t : tx) })),
      deleteTransaction: (id) => set((s) => ({ transactions: s.transactions.filter((tx) => tx.id !== id) })),
    }),
    { name: 'finance-dashboard', partialize: (s) => ({ transactions: s.transactions, selectedRole: s.selectedRole, darkMode: s.darkMode }) }
  )
);

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 }).format(amount);
