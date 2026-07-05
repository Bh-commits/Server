import { Router } from 'express';
import { robots, sitemap } from '../controllers/seoController.js';

export const seoRoutes = Router();

seoRoutes.get('/sitemap.xml', sitemap);
seoRoutes.get('/robots.txt', robots);

