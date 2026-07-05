import mongoose from 'mongoose';

const assetSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    alt: String
  },
  { _id: false }
);

const portfolioSchema = new mongoose.Schema(
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
    technologies: [String],
    image: assetSchema,
    url: String,
    featured: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true }
);

export const Portfolio = mongoose.model('Portfolio', portfolioSchema);

