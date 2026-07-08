import mongoose from 'mongoose';

const careerApplicationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 180
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30
    },
    linkedin: {
      type: String,
      trim: true,
      default: '',
      maxlength: 500
    },
    portfolio: {
      type: String,
      trim: true,
      default: '',
      maxlength: 500
    },
    resumeLink: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    coverMessage: {
      type: String,
      trim: true,
      default: '',
      maxlength: 5000
    }
  },
  {
    timestamps: true,
    collection: 'career_applications'
  }
);

careerApplicationSchema.index({ createdAt: -1 });
careerApplicationSchema.index({ email: 1 });

export const CareerApplication = mongoose.model('CareerApplication', careerApplicationSchema);
