import type { Todo } from './types';

type Action = { type: 'add'; title: string };

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
    default:
      return state;
  }
}
