import { Request, Response } from 'express';

import { Todo } from '../models/todo.model.js';

const todos: Todo[] = [
  {
    id: 1,
    title: 'Faire les courses',
    description: 'Pomme, poire, lessive',
    priority: 2,
    updatedAt: Date.now(),
  },
  {
    id: 2,
    title: 'Envoyer le courrier',
    description: 'Urgent',
    priority: 3,
    updatedAt: Date.now(),
  },
  {
    id: 3,
    title: 'Lire le journal',
    description: 'Smashing magazine, sidebar.io, Hacker News',
    priority: 1,
    updatedAt: Date.now(),
  },
];

let id = 4;

/*
* GET todos listing.
*/
export const findAll = function (req: Request, res: Response) {
  /*const todo: Todo = { id: 4, title: 'Test', description: 'Test description', priority: 1, updatedAt: Date.now() }
  todos.push(todo);*/
  res.status(200).json(todos);
};

/*
* GET todo by identifier.
*/
export const findById = function (req: Request, res: Response) {
  res.status(404).json({ error: 'Not found' });
};

/*
* Create a todo.
*/
export const addTodo = function (req: Request, res: Response) {
  try {
    const todo: Todo = req.body;
    const id: number = todos[todos.length - 1].id + 1;
    todo.id = id;
    todo.updatedAt = Date.now();

    todos.push(todo);
    res.status(201).json(todo);

  } catch (error) {
    res.status(500).json({ message: 'Failed to create a todo' });
  }
};

/*
* Update a todo by its identifier.
*/
export const updateTodo = function (req: Request, res: Response) {
  const todo = req.body;

  const index = todos.findIndex((t) => t.id = parseInt(todo.id));
  if (index === -1) {
    res.status(404).json({ error: 'Not found' });
  }

  const existingTodo = todos[index];
  const updateTodo = {
    ...existingTodo, title: todo.title,
    description: todo.description, priority: todo.priority
  };

  todos[index] = updateTodo;
  res.status(200).json(updateTodo);
};

/*
* Delete a todo
*/
export const deleteTodo = function (req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(todo => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.status(204).json({ message: 'Todo deleted successfully' });
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
  return;
};
