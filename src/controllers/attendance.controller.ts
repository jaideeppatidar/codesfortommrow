import { Request, Response } from 'express';
import { Attendance } from '../models/attendance.model';

export const markAttendance = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    const attendance = await Attendance.create({
      employee: req.user.id,
      date: new Date(),
    });

    res.status(201).json({ message: 'Attendance marked', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
