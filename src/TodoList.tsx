import type { Todo } from './types';
import { TodoItem } from './TodoItem';

interface Props {
  todos: Todo[];
  emptyMessage: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export function TodoList({ todos, emptyMessage, onToggle, onDelete, onEdit }: Props) {
  if (todos.length === 0) {
    return <p style={{ color: '#888', fontStyle: 'italic' }}>{emptyMessage}</p>;
  }
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
}
