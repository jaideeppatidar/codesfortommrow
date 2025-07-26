import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  employee: mongoose.Types.ObjectId;
  date: Date;
}

const AttendanceSchema: Schema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
});

export const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema);
