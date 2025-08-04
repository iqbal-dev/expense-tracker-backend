import app from '@src/app'; // Your Express app
import Category from '@src/modules/category/v1/category.model';
import Expense from '@src/modules/expense/v1/expense.model';
import User from '@src/modules/user/v1/user.model';
import request from 'supertest';
const agent = request.agent(app);
describe('POST /expenses', () => {
  it('should create a new expense', async () => {
    // Create mock user and category
    const user = await User.create({
      name: 'Test User',
      email: 'user@test.com',
      password: '123456',
    });
    const category = await Category.create({
      name: 'Food',
      userId: user._id,
      code: '#fff',
    });

    const expenseData = {
      userId: user._id,
      title: 'Lunch at restaurant',
      amount: 25.5,
      date: new Date().toISOString(),
      categoryId: category._id,
      notes: 'Business meeting',
      tags: ['food', 'business'],
    };

    const response = await agent
      .post('/api/v1/expenses')
      .send(expenseData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Expense created successfully');
    expect(response.body.data.title).toBe(expenseData.title);

    const expenseInDb = await Expense.findById(response.body.data._id);
    expect(expenseInDb).toBeTruthy();
    expect(expenseInDb?.title).toBe(expenseData.title);
    expect(expenseInDb?.amount).toBe(expenseData.amount);
  });

  it('should return validation error for missing fields', async () => {
    const res = await agent
      .post('/api/v1/expenses')
      .send({}) // Missing required fields
      .expect(400);

    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe('Validation Error');
  });
});
