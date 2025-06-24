import app from '@src/app';
import supertest from 'supertest';

const user = {
  name: 'Iqbal',
  email: 'iqbal@gmail.com',
  password: 'Iqbal@123',
};

describe('Auth - Registration', () => {
  it('POST /api/v1/auth/register should create a new user', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/register')
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data.email).toBe(user.email);
  });
});

describe('Auth - Login', () => {
  beforeAll(async () => {
    await supertest(app).post('/api/v1/auth/register').send(user);
  });
  it('POST /api/v1/auth/login should log in successfully', async () => {
    const response = await supertest(app)
      .post('/api/v1/auth/login')
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('accessToken');
    expect(response.body.data).toHaveProperty('refreshToken');
  });
});
