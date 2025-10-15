const request = require('supertest');
const server = require('./server');

describe('Server Tests', () => {
  afterAll((done) => {
    server.close(done);
  });

  test('GET / should return welcome message', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello from CI/CD Pipeline Demo!');
    expect(response.body.timestamp).toBeDefined();
  });

  test('GET /health should return OK status', async () => {
    const response = await request(server).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.timestamp).toBeDefined();
  });

  test('GET /api/users should return users array', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0].id).toBe(1);
    expect(response.body[0].name).toBe('John Doe');
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(server).get('/nonexistent');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Route not found');
  });
});
