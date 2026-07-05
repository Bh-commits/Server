import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { sendMail } from '../config/mailer.js';
import { Career } from '../models/Career.js';
import { JobApplication } from '../models/JobApplication.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { applicationAdminTemplate } from '../utils/mailTemplates.js';
import { uploadBufferToCloudinary } from '../utils/uploadToCloudinary.js';

export const applyForJob = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone) {
    throw new ApiError(400, 'Name, email, and phone are required');
  }

  const careerFilter = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id };
  const career = await Career.findOne({ ...careerFilter, active: true });

  if (!career) {
    throw new ApiError(404, 'Job opening not found');
  }

  const resume = await uploadBufferToCloudinary(req.file, 'ideaclap-india/resumes');
  const application = await JobApplication.create({
    career: career._id,
    roleTitle: career.title,
    name,
    email,
    phone,
    message,
    resume
  });

  // Email notification disabled per request
  /*
  void sendMail({ to: env.adminEmail, ...applicationAdminTemplate(application) }).catch((error) => {
    console.error('Application email failed', error);
  });
  */

  res.status(201).json({ message: 'Application submitted', item: application });
});
