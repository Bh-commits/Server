import { cloudinary, isCloudinaryConfigured } from '../config/cloudinary.js';
import { ApiError } from './ApiError.js';

export function uploadBufferToCloudinary(file, folder = 'ideaclap-india') {
  if (!file) return null;
  if (!isCloudinaryConfigured) {
    return {
      url: null,
      publicId: null,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size
    };
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true
      },
      (error, result) => {
        if (error) {
          reject(new ApiError(500, 'File upload failed'));
          return;
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size
        });
      }
    );

    stream.end(file.buffer);
  });
}

