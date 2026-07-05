import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['contact', 'consultation'],
      default: 'contact',
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
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
    company: {
      type: String,
      trim: true
    },
    businessType: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    source: {
      type: String,
      default: 'website'
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'won', 'lost'],
      default: 'new',
      index: true
    },
    notes: String
  },
  { timestamps: true }
);

leadSchema.index({ email: 1, createdAt: -1 });

export const Lead = mongoose.model('Lead', leadSchema);

