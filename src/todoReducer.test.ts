import { describe, it, expect } from 'vitest';
import { todoReducer } from './todoReducer';
import type { Todo } from './types';

const base: Todo[] = [
  { id: 'a', title: 'First', completed: false, createdAt: 1000 },
  { id: 'b', title: 'Second', completed: true, createdAt: 2000 },
];

describe('todoReducer', () => {
  it('add produces a new todo with unique id, given title, completed false, and a createdAt timestamp', () => {
    const result = todoReducer(base, { type: 'add', title: 'New task' });
    expect(result).toHaveLength(3);
    const added = result[2];
    expect(added.title).toBe('New task');
    expect(added.completed).toBe(false);
    expect(typeof added.id).toBe('string');
    expect(added.id).not.toBe('a');
    expect(added.id).not.toBe('b');
    expect(typeof added.createdAt).toBe('number');
  });

  it('toggle flips completed for the target todo, leaving others unchanged', () => {
    const result = todoReducer(base, { type: 'toggle', id: 'a' });
    expect(result[0].completed).toBe(true);
    expect(result[1]).toEqual(base[1]);
  });

  it('delete removes the target todo, leaving others unchanged', () => {
    const result = todoReducer(base, { type: 'delete', id: 'a' });
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(base[1]);
  });

  it('edit updates the title for the target todo, leaving others unchanged', () => {
    const result = todoReducer(base, { type: 'edit', id: 'a', title: 'Updated' });
    expect(result[0].title).toBe('Updated');
    expect(result[1]).toEqual(base[1]);
  });
});
