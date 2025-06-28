import app from '@src/app';
import { HttpStatus } from '@src/constants/httpStatus';
import { generateUniqueEmail } from '@src/utils/emailGenerator';
import request from 'supertest';

const agent = request.agent(app);

describe('Auth Integration Tests', () => {
  const baseUser = {
    name: 'Iqbal',
    password: 'Iqbal@123',
  };

  let user: typeof baseUser & { email: string };

  const registerAndLoginUser = async () => {
    user = { ...baseUser, email: generateUniqueEmail() };
    await agent.post('/api/v1/auth/register').send(user);
    return agent.post('/api/v1/auth/login').send({
      email: user.email,
      password: user.password,
    });
  };

  describe('POST /api/v1/auth/register', () => {
    it('should create a new user', async () => {
      user = { ...baseUser, email: generateUniqueEmail('register') };

      const res = await agent.post('/api/v1/auth/register').send(user);

      expect(res.status).toBe(HttpStatus.CREATED);
      expect(res.body.data).toHaveProperty('_id');
      expect(res.body.data.email).toBe(user.email);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    it('should log in and set refresh token cookie', async () => {
      const loginRes = await registerAndLoginUser();

      expect(loginRes.status).toBe(HttpStatus.OK);
      expect(loginRes.body.data.accessToken).toBeDefined();

      const cookies = loginRes.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toMatch(/refreshToken=/);
    });
  });

  describe('GET /api/v1/auth/refresh-token', () => {
    beforeEach(async () => {
      await registerAndLoginUser();
    });

    it('should return new access token using cookie', async () => {
      const res = await agent.get('/api/v1/auth/refresh-token');

      expect(res.status).toBe(HttpStatus.OK);
      expect(res.body.data.accessToken).toBeDefined();
    });
  });

  describe('POST /api/v1/auth/logout', () => {
    beforeEach(async () => {
      await registerAndLoginUser();
    });

    it('should clear refresh token cookie', async () => {
      const res = await agent.post('/api/v1/auth/logout');

      expect(res.status).toBe(HttpStatus.OK);

      const cookies = res.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies[0]).toMatch(/refreshToken=;/); // cookie cleared
    });
  });

  describe('GET /api/v1/auth/refresh-token after logout', () => {
    beforeEach(async () => {
      await registerAndLoginUser();
      await agent.post('/api/v1/auth/logout');
    });

    it('should fail to refresh token after logout', async () => {
      const res = await agent.get('/api/v1/auth/refresh-token');
      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
