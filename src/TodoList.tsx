import type { Todo } from './types';

interface Props {
  todos: Todo[];
}

export function TodoList({ todos }: Props) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
