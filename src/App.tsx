import { useReducer, useEffect, useState } from 'react';
import { todoReducer } from './todoReducer';
import { load, save } from './todoStore';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';
import { TodoFooter } from './TodoFooter';
import type { Filter } from './TodoFooter';

function App() {
  const [todos, dispatch] = useReducer(todoReducer, undefined, () =>
    load(localStorage)
  );
  const [filter, setFilter] = useState<Filter>('All');

  useEffect(() => {
    save(todos, localStorage);
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <main>
      <h1>Todo</h1>
      <TodoInput onAdd={(title) => dispatch({ type: 'add', title })} />
      <TodoList
        todos={filteredTodos}
        emptyMessage={
          todos.length === 0
            ? 'No todos yet — add one above'
            : `No ${filter.toLowerCase()} todos`
        }
        onToggle={(id) => dispatch({ type: 'toggle', id })}
        onDelete={(id) => dispatch({ type: 'delete', id })}
        onEdit={(id, title) => dispatch({ type: 'edit', id, title })}
      />
      <TodoFooter activeCount={activeCount} filter={filter} onFilterChange={setFilter} />
    </main>
  );
}

export default App;
