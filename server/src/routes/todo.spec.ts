import request from 'supertest';
import { findAll } from './todo.js';

describe('Todo', () => {
  it('should return an array of todos', async () => {
    const response = await request(findAll).get('/api/todos');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
