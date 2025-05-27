import { createUserSchema } from '@src/modules/user/v1/user.validation';

describe('User Validation', () => {
  it('should fail when required field name is missing', () => {
    const user = {
      email: 'iqbal@gmail.com',
      password: 'Iqbal@123',
    };
    expect(() => createUserSchema.parse(user)).toThrow();
  });
  it('should fail when required field email is missing', () => {
    const user = {
      name: 'Iqbal',
      password: 'Iqbal@123',
    };
    expect(() => createUserSchema.parse(user)).toThrow();
  });
  it('should fail when required field password is missing', () => {
    const user = {
      name: 'Iqbal',
      email: 'iqbal@gmail.com',
    };
    expect(() => createUserSchema.parse(user)).toThrow();
  });
  it('should fail if name is too short', () => {
    const user = {
      name: 'Iq',
      email: 'iqbal@gmail.com',
      password: 'Iqbal@123',
    };
    expect(() => createUserSchema.parse(user)).toThrow();
  });
  it('should fail if email is invalid', () => {
    const user = {
      name: 'Iqbal',
      email: 'iqbalgmail.com',
      password: 'Iqbal@123',
    };
    expect(() => createUserSchema.parse(user)).toThrow();
  });
  it('should fail if password does not meet criteria', () => {
    const user = {
      name: 'Iqbal',
      email: 'iqbal@gmail.com',
      password: 'password',
    };
    expect(() => createUserSchema.parse(user)).toThrow();
  });
  it('should pass with valid data', () => {
    const user = {
      name: 'Iqbal',
      email: 'iqbal@gmail.com',
      password: 'Iqbal@123',
    };
    const parsed = createUserSchema.parse(user);
    expect(parsed).toEqual(user);
  });
});
