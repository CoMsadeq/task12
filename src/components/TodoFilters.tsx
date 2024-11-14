import React from 'react';
import { Category } from '../types/todo';

interface TodoFiltersProps {
  filters: {
    status: 'all' | 'completed' | 'active';
    category: Category | 'all';
    sortBy: 'dueDate' | 'priority' | 'created';
  };
  onFilterChange: (filters: Partial<TodoFiltersProps['filters']>) => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm border-r-4 border-yellow-400">
      <select
        value={filters.status}
        onChange={(e) =>
          onFilterChange({ status: e.target.value as 'all' | 'completed' | 'active' })
        }
        className="px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
      >
        <option value="all">All Tasks</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={filters.category}
        onChange={(e) =>
          onFilterChange({ category: e.target.value as Category | 'all' })
        }
        className="px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
      >
        <option value="all">All Categories</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="shopping">Shopping</option>
        <option value="health">Health</option>
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) =>
          onFilterChange({
            sortBy: e.target.value as 'dueDate' | 'priority' | 'created',
          })
        }
        className="px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
      >
        <option value="created">Sort by Created Date</option>
        <option value="dueDate">Sort by Due Date</option>
        <option value="priority">Sort by Priority</option>
      </select>
    </div>
  );
};