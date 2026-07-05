import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema(
  {
    career: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Career'
    },
    roleTitle: String,
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    message: String,
    resume: {
      url: String,
      publicId: String,
      originalName: String,
      mimeType: String,
      size: Number
    },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'],
      default: 'new',
      index: true
    }
  },
  { timestamps: true }
);

export const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

