import { Router } from 'express';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware';
import { calculateSalary, getSalary } from '../controllers/salary.controller';

const router = Router();

router.post('/calculate', authenticate, authorizeRoles('admin'), calculateSalary);
router.get('/:employeeId', authenticate, authorizeRoles('admin', 'employee'), getSalary);


export default router;
