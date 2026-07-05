import { Router } from 'express';
import { applyForJob } from '../controllers/careerController.js';
import { upload } from '../middleware/upload.js';

export const careerRoutes = Router();

careerRoutes.post('/:id/apply', upload.single('resume'), applyForJob);

