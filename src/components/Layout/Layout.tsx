import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Sidebar } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <aside>
        <Sidebar />
      </aside>
      
      <main className={`
        pt-16 pb-12 transition-all duration-300
        lg:ml-64 min-h-screen
      `}>
        <div className="p-4">
          {children}
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 