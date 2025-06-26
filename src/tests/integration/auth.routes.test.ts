import app from '@src/app';
import request from 'supertest';

const agent = request.agent(app);

const user = {
  name: 'Iqbal',
  email: 'iqbal@gmail.com',
  password: 'Iqbal@123',
};

describe('Auth Integration - Register, Login, Refresh, Logout', () => {
  it('POST /api/v1/auth/register should create a new user', async () => {
    const res = await agent.post('/api/v1/auth/register').send(user);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('_id');
    expect(res.body.data.email).toBe(user.email);
  });

  it('POST /api/v1/auth/login should log in and set refresh token cookie', async () => {
    const res = await agent.post('/api/v1/auth/login').send({
      email: user.email,
      password: user.password,
    });

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();

    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toMatch(/refreshToken=/);
  });

  it('POST /api/v1/auth/refresh-token should return new access token using cookie', async () => {
    const res = await agent.get('/api/v1/auth/refresh-token');

    expect(res.status).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
  });

  it('POST /api/v1/auth/logout should clear refresh token cookie', async () => {
    const res = await agent.post('/api/v1/auth/logout');

    expect(res.status).toBe(200);
    const cookies = res.headers['set-cookie'];
    expect(cookies).toBeDefined();
    expect(cookies[0]).toMatch(/refreshToken=;/); // cookie cleared
  });

  it('POST /api/v1/auth/refresh-token should fail after logout', async () => {
    const res = await agent.get('/api/v1/auth/refresh-token');
    expect(res.status).toBe(400);
  });
});
