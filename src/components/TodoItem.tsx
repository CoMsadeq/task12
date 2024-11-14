import React from 'react';
import { format } from 'date-fns';
import { Todo } from '../types/todo';
import { Check, Trash2, Edit2 } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const categoryColors = {
  work: 'bg-blue-100 text-blue-800',
  personal: 'bg-yellow-100 text-yellow-800',
  shopping: 'bg-blue-100 text-blue-800',
  health: 'bg-yellow-100 text-yellow-800',
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500"
    >
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
          ${
            todo.completed
              ? 'bg-blue-500 border-blue-500'
              : 'border-gray-300 hover:border-blue-500'
          }`}
      >
        {todo.completed && <Check size={14} className="text-white" />}
      </button>

      <div className="flex-1">
        <h3
          className={`text-lg font-medium ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todo.title}
        </h3>
        <div className="flex gap-2 mt-2">
          <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[todo.priority]}`}>
            {todo.priority}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${categoryColors[todo.category]}`}>
            {todo.category}
          </span>
          <span className="text-xs text-gray-500">
            Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}
          </span>
        </div>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-2 text-gray-400 hover:text-blue-500 rounded-full hover:bg-gray-100"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};