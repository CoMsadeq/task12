import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TodoItem } from './components/TodoItem';
import { TodoForm } from './components/TodoForm';
import { TodoFilters } from './components/TodoFilters';
import { useTodoStore } from './store/todoStore';
import { Todo } from './types/todo';
import { Layout } from './components/Layout/Layout';

function App() {
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const { todos, filter, addTodo, toggleTodo, deleteTodo, updateTodo, setFilter, reorderTodos } =
    useTodoStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  const filteredTodos = todos
    .filter((todo) => {
      if (filter.status === 'completed') return todo.completed;
      if (filter.status === 'active') return !todo.completed;
      return true;
    })
    .filter((todo) => {
      if (filter.category === 'all') return true;
      return todo.category === filter.category;
    })
    .sort((a, b) => {
      if (filter.sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (filter.sortBy === 'priority') {
        const priorityOrder = { low: 0, medium: 1, high: 2 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">My Tasks</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Organize your life, one task at a time</p>
        </div>

        <TodoForm
          onSubmit={(data) => {
            if (editingTodo) {
              updateTodo(editingTodo.id, data);
              setEditingTodo(null);
            } else {
              addTodo({ ...data, completed: false });
            }
          }}
          initialValues={editingTodo ?? undefined}
          onCancel={editingTodo ? () => setEditingTodo(null) : undefined}
        />

        <TodoFilters filters={filter} onFilterChange={setFilter} />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(event) => {
            const { active, over } = event;
            if (over && active.id !== over.id) {
              const oldIndex = todos.findIndex((todo) => todo.id === active.id);
              const newIndex = todos.findIndex((todo) => todo.id === over.id);
              reorderTodos(oldIndex, newIndex);
            }
          }}
        >
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggleTodo(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                  onEdit={() => setEditingTodo(todo)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {filteredTodos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No tasks found. Add some tasks to get started!
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;