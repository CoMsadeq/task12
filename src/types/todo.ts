export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'shopping' | 'health';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: Category;
  priority: Priority;
  dueDate: string;
  createdAt: string;
}