import mongoose, { Schema, Document } from 'mongoose';

export interface IPayroll extends Document {
  employee: mongoose.Types.ObjectId;
  amount: number;
  month: string;
  distributedAt: Date;
}

const PayrollSchema: Schema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
  distributedAt: { type: Date, default: Date.now },
});

export const Payroll = mongoose.model<IPayroll>('Payroll', PayrollSchema);
