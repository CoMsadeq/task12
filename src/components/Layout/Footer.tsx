export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-12 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Designed by Co.msadeq © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
} 