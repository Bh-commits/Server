import { Router } from 'express';
import { login, me } from '../controllers/authController.js';
import { protect, requireAdmin } from '../middleware/auth.js';

export const authRoutes = Router();

authRoutes.post('/login', login);
authRoutes.get('/me', protect, requireAdmin, me);

