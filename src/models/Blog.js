import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const blogSchema = new mongoose.Schema(
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
      trim: true,
      index: true
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    excerpt: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    coverImage: {
      url: String,
      publicId: String,
      alt: String
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
      index: true
    },
    metaTitle: String,
    metaDescription: String,
    publishedAt: Date
  },
  { timestamps: true }
);

blogSchema.pre('validate', function createSlug(next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title);
  }
  if (!this.publishedAt && this.status === 'published') {
    this.publishedAt = new Date();
  }
  next();
});

export const Blog = mongoose.model('Blog', blogSchema);

