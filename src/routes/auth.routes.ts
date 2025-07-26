import { Router } from 'express';
import { login, logout } from '../controllers/auth.controller';

const router = Router();

router.post('/auth/login', login);
router.post('/auth/logout', logout);

export default router;
