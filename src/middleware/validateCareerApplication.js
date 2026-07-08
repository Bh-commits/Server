import { ApiError } from '../utils/ApiError.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().replace(/[<>]/g, '');
}

function isValidUrl(value) {
  try {
    const parsed = new URL(value);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function validateCareerApplication(req, res, next) {
  const normalized = {
    fullName: cleanString(req.body.fullName || req.body.name),
    email: cleanString(req.body.email).toLowerCase(),
    phone: cleanString(req.body.phone),
    linkedin: cleanString(req.body.linkedin),
    portfolio: cleanString(req.body.portfolio),
    resumeLink: cleanString(req.body.resumeLink || req.body.resume),
    coverMessage: cleanString(req.body.coverMessage || req.body.message)
  };

  const errors = [];

  if (!normalized.fullName) errors.push('Full Name is required');
  if (!normalized.email) errors.push('Email Address is required');
  if (!normalized.phone) errors.push('Phone Number is required');
  if (!normalized.resumeLink) errors.push('Resume Link is required');
  if (normalized.email && !emailPattern.test(normalized.email)) errors.push('Email Address is invalid');
  if (normalized.resumeLink && !isValidUrl(normalized.resumeLink)) errors.push('Resume Link must be a valid URL');
  if (normalized.linkedin && !isValidUrl(normalized.linkedin)) errors.push('LinkedIn Profile URL must be a valid URL');
  if (normalized.portfolio && !isValidUrl(normalized.portfolio)) errors.push('Portfolio / GitHub must be a valid URL');

  if (errors.length) {
    throw new ApiError(400, errors.join(', '));
  }

  req.body = normalized;
  next();
}
