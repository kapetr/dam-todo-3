import { useRef } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

export function TodoInput({ onAdd }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    const title = ref.current?.value.trim() ?? '';
    if (!title) return;
    onAdd(title);
    ref.current!.value = '';
  }

  return (
    <input
      ref={ref}
      type="text"
      placeholder="Add a todo..."
      onKeyDown={handleKeyDown}
      autoFocus
    />
  );
}
