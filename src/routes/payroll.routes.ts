import { Router } from 'express';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware';
import { distributePayroll } from '../controllers/payroll.controller';

const router = Router();

router.post('/distribute', authenticate, authorizeRoles('HR', 'admin'), distributePayroll);

export default router;
