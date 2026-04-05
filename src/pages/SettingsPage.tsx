import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';

export default function SettingsPage() {
  const { darkMode, toggleDarkMode, selectedRole, setRole } = useStore();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-heading font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm">Customize your dashboard preferences</p>
      </div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl border divide-y">
        <div className="p-5 flex items-center justify-between">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-sm text-muted-foreground">Toggle dark theme</p>
          </div>
          <button onClick={toggleDarkMode} className={`relative w-12 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-muted'}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
          </button>
        </div>
        <div className="p-5 flex items-center justify-between">
          <div>
            <p className="font-medium">Current Role</p>
            <p className="text-sm text-muted-foreground">Switch between Admin and Viewer</p>
          </div>
          <span className="text-sm font-medium capitalize bg-primary/10 text-primary px-3 py-1 rounded-full">{selectedRole}</span>
        </div>
        <div className="p-5">
          <p className="font-medium">Currency</p>
          <p className="text-sm text-muted-foreground">Indian Rupee (₹) — INR</p>
        </div>
      </motion.div>
    </div>
  );
}
