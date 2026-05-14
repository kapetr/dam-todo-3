import { useReducer, useEffect } from 'react';
import { todoReducer } from './todoReducer';
import { load, save } from './todoStore';
import { TodoInput } from './TodoInput';
import { TodoList } from './TodoList';

function App() {
  const [todos, dispatch] = useReducer(todoReducer, undefined, () =>
    load(localStorage)
  );

  useEffect(() => {
    save(todos, localStorage);
  }, [todos]);

  return (
    <main>
      <h1>Todo</h1>
      <TodoInput onAdd={(title) => dispatch({ type: 'add', title })} />
      <TodoList todos={todos} />
    </main>
  );
}

export default App;
