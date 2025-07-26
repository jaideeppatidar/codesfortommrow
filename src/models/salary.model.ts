import mongoose, { Schema, Document } from 'mongoose';

export interface ISalary extends Document {
  employee: mongoose.Types.ObjectId;
  month: string;
  amount: number;
}

const SalarySchema: Schema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  month: { type: String, required: true },
  amount: { type: Number, required: true },
});

export const Salary = mongoose.model<ISalary>('Salary', SalarySchema);
