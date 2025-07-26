// src/app.ts
import express, { Application, Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import EmployeeRoutes from './routes/employee.routes';
import Attendance from './routes/attendance.routes';
import SalaryRoutes from './routes/salary.routes';
import payroll from './routes/payroll.routes';




import cookieParser from 'cookie-parser';

const app: Application = express();
app.use(cookieParser());
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api/employee',EmployeeRoutes)
app.use('/api/attendance',Attendance)
app.use('/api', SalaryRoutes);
app.use('/api', payroll);



app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'API is working with MongoDB ✅' });
});

export default app;
