import { Router } from 'express';
import {
  getBlog,
  listBlogs,
  listCareers,
  listPortfolio,
  listServices,
  listTestimonials
} from '../controllers/publicController.js';

export const publicRoutes = Router();

publicRoutes.get('/services', listServices);
publicRoutes.get('/portfolio', listPortfolio);
publicRoutes.get('/testimonials', listTestimonials);
publicRoutes.get('/careers', listCareers);
publicRoutes.get('/blogs', listBlogs);
publicRoutes.get('/blogs/:slug', getBlog);

