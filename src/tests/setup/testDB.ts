import { MONGODB_TEST_URI } from '@src/config';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(MONGODB_TEST_URI!);
});

afterEach(async () => {
  const db = mongoose.connection.db;
  if (!db) return;
  await db.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});
