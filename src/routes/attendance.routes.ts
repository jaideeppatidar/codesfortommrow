import { Router } from 'express';
import { authenticate, authorizeRoles } from '../middlewares/authMiddleware';
import { markAttendance } from '../controllers/attendance.controller';

const router = Router();

router.post('/mark', authenticate, authorizeRoles('admin', 'employee'), markAttendance);

export default router;
