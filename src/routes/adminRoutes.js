import { Router } from 'express';
import {
  analytics,
  createResource,
  deleteResource,
  listResource,
  updateResource
} from '../controllers/adminController.js';
import { protect, requireAdmin } from '../middleware/auth.js';

export const adminRoutes = Router();

adminRoutes.use(protect, requireAdmin);
adminRoutes.get('/analytics', analytics);
adminRoutes.get('/:resource', listResource);
adminRoutes.post('/:resource', createResource);
adminRoutes.put('/:resource/:id', updateResource);
adminRoutes.delete('/:resource/:id', deleteResource);

