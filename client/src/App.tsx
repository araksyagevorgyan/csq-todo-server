import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface Todo {
  id: number;
  title: string;
  description: string;
  updatedAt: number;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3000/api/todos');
    setTodos(response.data);
  };

  const handleAddClick = async () => {
    if (!title.trim()) return;
    const todo = { title, description: '', updatedAt: Date.now() };
    await axios.post('http://localhost:3000/api/todos', todo);
    setTitle('');
    await fetchTodos();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/todos/${id}`);
    await fetchTodos();
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="todo-card header-row">
        <h1 className="app-title">MY TODOS</h1>
        <input
          type="text"
          className="filter-input"
          placeholder="Filter todos..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="todos-list">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="todo-card">
            <div className="todo-header">
              <h2 className="todo-title">{todo.title}</h2>
              <button
                className="delete-text-button"
                onClick={() => handleDelete(todo.id)}
              >
                X DELETE
              </button>
            </div>
            <p className="todo-description">{todo.description}</p>
          </div>
        ))}
      </div>
      <div className="todo-card add-todo-inline">
        <input
          type="text"
          placeholder="Add a todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="plus-add-button"
          onClick={handleAddClick}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;