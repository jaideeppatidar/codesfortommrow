import { Request, Response } from 'express';
import { Salary } from '../models/salary.model';

interface AuthenticatedUser {
    id: string;
    role: string;
    email?: string;
}
interface CustomRequest extends Request {
    user?: AuthenticatedUser;
}
export const calculateSalary = async (req: CustomRequest, res: Response) => {
    const { employeeId, month, baseSalary } = req.body;

    try {
        const salary = await Salary.create({
            employee: employeeId,
            month,
            amount: baseSalary,
        });
        res.status(201).json(salary);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getSalary = async (req: CustomRequest, res: Response) => {
    const { employeeId } = req.params;
    const { month } = req.query;

    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (user.role === 'employee' && user.id !== employeeId) {
        return res.status(403).json({ message: 'Forbidden access' });
    }

    try {
        const salary = await Salary.findOne({ employee: employeeId, month });
        if (!salary)
            return res.status(404).json({ message: 'No salary record found' });

        res.status(200).json(salary);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
