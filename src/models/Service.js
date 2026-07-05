import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    items: [
      {
        type: String,
        trim: true
      }
    ],
    icon: String,
    sortOrder: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true }
);

export const Service = mongoose.model('Service', serviceSchema);

