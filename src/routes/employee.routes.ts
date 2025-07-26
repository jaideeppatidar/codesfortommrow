import { Router } from 'express';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware';
import { createEmployee, getEmployeeById } from '../controllers/employee.controller';

const router = Router();

router.post('/', authenticate, authorizeRoles('HR', 'admin'), createEmployee);
router.get('/:id', authenticate, authorizeRoles('HR', 'admin', 'employee'), getEmployeeById);

export default router;
