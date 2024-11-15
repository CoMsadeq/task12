import { Menu } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">TaskMaster</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600" /> {/* Profil placeholder */}
        </div>
      </div>
    </header>
  );
} 