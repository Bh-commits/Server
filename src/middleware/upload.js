import multer from 'multer';
import { ApiError } from '../utils/ApiError.js';

const allowedTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new ApiError(400, 'Resume must be a PDF, DOC, or DOCX file'));
    }
    cb(null, true);
  }
});

