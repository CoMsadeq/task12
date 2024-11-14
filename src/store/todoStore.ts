import { create } from 'zustand';
import { Todo, Priority, Category } from '../types/todo';

interface TodoStore {
  todos: Todo[];
  filter: {
    status: 'all' | 'completed' | 'active';
    category: Category | 'all';
    sortBy: 'dueDate' | 'priority' | 'created';
  };
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  setFilter: (filter: Partial<TodoStore['filter']>) => void;
  reorderTodos: (oldIndex: number, newIndex: number) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  filter: {
    status: 'all',
    category: 'all',
    sortBy: 'created',
  },
  addTodo: (todo) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          ...todo,
          id: Math.random().toString(36).substring(7),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  updateTodo: (id, updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      ),
    })),
  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),
  reorderTodos: (oldIndex, newIndex) =>
    set((state) => {
      const todos = [...state.todos];
      const [removed] = todos.splice(oldIndex, 1);
      todos.splice(newIndex, 0, removed);
      return { todos };
    }),
}));