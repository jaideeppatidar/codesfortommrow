import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'standard_user' | 'super_admin'| 'employee';
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'standard_user', 'super_admin','employee'], default: 'standard_user' }
});

export const User = mongoose.model<IUser>('User', userSchema);
