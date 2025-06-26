import { MONGODB_TEST_URI } from '@src/config';
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(MONGODB_TEST_URI!);
});

// afterEach(async () => {
//   await mongoose.connection.dropDatabase();
// });

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});
