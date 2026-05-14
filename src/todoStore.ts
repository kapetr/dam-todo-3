import type { Todo } from './types';

const STORAGE_KEY = 'todos';

export function load(storage: Pick<Storage, 'getItem'>): Todo[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Todo[];
  } catch {
    return [];
  }
}

export function save(todos: Todo[], storage: Pick<Storage, 'setItem'>): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
