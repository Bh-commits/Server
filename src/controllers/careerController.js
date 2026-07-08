import { env } from '../config/env.js';
import { sendMail } from '../config/mailer.js';
import { CareerApplication } from '../models/CareerApplication.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { careerApplicationAdminTemplate } from '../utils/mailTemplates.js';

export const applyForJob = asyncHandler(async (req, res) => {
  const application = await CareerApplication.create(req.body);

  try {
    await sendMail({
      to: env.adminEmail,
      ...careerApplicationAdminTemplate(application)
    });
  } catch (error) {
    console.error('Career application email failed', error);
    throw new ApiError(502, 'Application was saved, but email notification could not be sent');
  }

  res.status(201).json({
    success: true,
    message: "Application submitted successfully. We'll contact you soon.",
    item: application
  });
});
