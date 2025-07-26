// controllers/employee.controller.ts
import { Request, Response } from 'express';
import { Employee } from '../models/employee.model';

// Create a new employee
export const createEmployee = async (req: Request, res: Response) => {
  const { name, email, role, salary } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: User not found' });
  }

  try {
    const employee = await Employee.create({ name, email, role, salary });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: User not found' });
  }

  if (req.user.role === 'employee' && req.user.id !== id) {
    return res.status(403).json({ message: 'Forbidden: Access denied' });
  }

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
