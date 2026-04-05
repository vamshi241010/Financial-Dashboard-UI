import { Search, Moon, Sun, Bell } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useStore } from '@/store/useStore';
import type { Role } from '@/store/useStore';

export function Navbar() {
  const { selectedRole, setRole, darkMode, toggleDarkMode, searchTerm, setSearchTerm } = useStore();

  return (
    <header className="h-14 border-b flex items-center gap-3 px-4 bg-card">
      <SidebarTrigger />
      <div className="flex-1 flex items-center gap-3">
        <div className="relative max-w-xs w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <Select value={selectedRole} onValueChange={(v) => setRole(v as Role)}>
        <SelectTrigger className="w-[120px] h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="viewer">Viewer</SelectItem>
        </SelectContent>
      </Select>
      <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
        <Bell className="h-4 w-4" />
        <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
      </button>
      <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-muted transition-colors">
        {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </header>
  );
}
