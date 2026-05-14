import { useState, useRef, useEffect } from 'react';
import type { Todo } from './types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  function startEdit() {
    setDraft(todo.title);
    setEditing(true);
  }

  function confirmEdit() {
    const trimmed = draft.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed);
    }
    setEditing(false);
  }

  function cancelEdit() {
    setEditing(false);
  }

  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') confirmEdit();
            else if (e.key === 'Escape') cancelEdit();
          }}
          onBlur={confirmEdit}
          style={{ flex: 1 }}
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none', flex: 1, cursor: 'default' }}
        >
          {todo.title}
        </span>
      )}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}
