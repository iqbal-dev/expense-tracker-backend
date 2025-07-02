import { TCategory } from '@src/modules/category/v1/category.type';
import { Schema, model } from 'mongoose';
const userSchema = new Schema<TCategory>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 2 characters'],
      maxlength: [60, 'Name should be less than 60 characters'],
    },
    icon: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Category = model<TCategory>('Category', userSchema);
export default Category;
