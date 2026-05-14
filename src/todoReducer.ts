import type { Todo } from './types';

type Action =
  | { type: 'add'; title: string }
  | { type: 'toggle'; id: string }
  | { type: 'delete'; id: string };

export function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          title: action.title,
          completed: false,
          createdAt: Date.now(),
        },
      ];
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'delete':
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
}
