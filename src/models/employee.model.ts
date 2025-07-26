import { Document, Schema, model } from "mongoose";

export interface IEmployee extends Document {
  name: string;
  email: string;
  role: string;
  basicSalary: number;
  hra: number;
  allowances: number;
  otherDeductions?: number;
  attendance?: {
    fullDays: number;
    halfDays: number;
  };
  // add any additional fields you use
}

const employeeSchema = new Schema<IEmployee>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },

  basicSalary: { type: Number, required: true },
  hra: { type: Number, required: true },
  allowances: { type: Number, required: true },
  otherDeductions: { type: Number, default: 0 },

  attendance: {
    fullDays: { type: Number, default: 0 },
    halfDays: { type: Number, default: 0 },
  },
});

export const Employee = model<IEmployee>("Employee", employeeSchema);
