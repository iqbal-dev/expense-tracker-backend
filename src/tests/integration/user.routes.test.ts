import app from '@src/app';
import supertest from 'supertest';
describe('User API Routes', () => {
  it('POST /api/v1/users should create new user', async () => {
    const newUser = {
      name: 'Iqbal',
      email: 'Iqbal@gmail.com',
      password: 'Iqbal@123',
    };

    const response = await supertest(app).post('/api/v1/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('_id');
  });
});
