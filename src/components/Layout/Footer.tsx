export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-14 md:h-16 bg-white dark:bg-gray-800 shadow-md z-30">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} TaskMaster
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500">Privacy</a>
          <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500">Terms</a>
        </div>
      </div>
    </footer>
  );
} 