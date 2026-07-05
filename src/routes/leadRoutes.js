import { Router } from 'express';
import { createConsultationLead, createContactLead, subscribeNewsletter } from '../controllers/leadController.js';

export const leadRoutes = Router();

leadRoutes.post('/contact', createContactLead);
leadRoutes.post('/consultation', createConsultationLead);
leadRoutes.post('/newsletter', subscribeNewsletter);

