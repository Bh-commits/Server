import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { applyForJob } from '../controllers/careerController.js';
import { validateCareerApplication } from '../middleware/validateCareerApplication.js';
import { upload } from '../middleware/upload.js';
import { uploadBufferToCloudinary } from '../utils/uploadToCloudinary.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const careerRoutes = Router();

const careerApplicationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10, // increased limit slightly to accommodate re-tries
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many application submissions. Please try again later.' }
});

// Custom middleware to handle resume file upload and save the secure URL
const handleResumeUpload = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const result = await uploadBufferToCloudinary(req.file, 'ideaclap-resumes');
    if (result && result.url) {
      req.body.resumeLink = result.url;
    }
  }
  next();
});

// Support both multipart file uploads and raw json links
careerRoutes.post(
  '/apply',
  careerApplicationLimiter,
  upload.single('resume'),
  handleResumeUpload,
  validateCareerApplication,
  applyForJob
);

careerRoutes.post(
  '/:id/apply',
  careerApplicationLimiter,
  upload.single('resume'),
  handleResumeUpload,
  validateCareerApplication,
  applyForJob
);
