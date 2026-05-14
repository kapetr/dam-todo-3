import { describe, it, expect, beforeEach } from 'vitest';
import { load, save } from './todoStore';
import type { Todo } from './types';

function makeStorage(initial: Record<string, string> = {}): Pick<Storage, 'getItem' | 'setItem'> {
  const store: Record<string, string> = { ...initial };
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
  };
}

const sampleTodo: Todo = {
  id: '1',
  title: 'Test todo',
  completed: false,
  createdAt: 1000,
};

describe('todoStore', () => {
  it('load returns empty array when localStorage is empty', () => {
    const storage = makeStorage();
    expect(load(storage)).toEqual([]);
  });

  it('load returns saved todos after a save round-trip', () => {
    const storage = makeStorage();
    const todos = [sampleTodo];
    save(todos, storage);
    expect(load(storage)).toEqual(todos);
  });

  it('load returns empty array when localStorage contains corrupt JSON', () => {
    const storage = makeStorage({ todos: '{corrupt' });
    expect(load(storage)).toEqual([]);
  });
});
