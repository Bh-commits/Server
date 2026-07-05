import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    type: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    requirements: [String],
    active: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  { timestamps: true }
);

careerSchema.pre('validate', function createSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
  next();
});

export const Career = mongoose.model('Career', careerSchema);

