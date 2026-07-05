import mongoose from 'mongoose';
import { Blog } from '../models/Blog.js';
import { Career } from '../models/Career.js';
import { Portfolio } from '../models/Portfolio.js';
import { Service } from '../models/Service.js';
import { Testimonial } from '../models/Testimonial.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listServices = asyncHandler(async (req, res) => {
  const items = await Service.find({ active: true }).sort({ sortOrder: 1, createdAt: -1 }).lean();
  res.json({ items });
});

export const listPortfolio = asyncHandler(async (req, res) => {
  const items = await Portfolio.find({ active: true }).sort({ featured: -1, createdAt: -1 }).lean();
  res.json({ items });
});

export const listTestimonials = asyncHandler(async (req, res) => {
  const items = await Testimonial.find({ active: true }).sort({ createdAt: -1 }).lean();
  res.json({ items });
});

export const listCareers = asyncHandler(async (req, res) => {
  const items = await Career.find({ active: true }).sort({ createdAt: -1 }).lean();
  res.json({ items });
});

export const listBlogs = asyncHandler(async (req, res) => {
  const filter = { status: 'published' };
  if (req.query.category) filter.category = req.query.category;
  if (req.query.search) {
    filter.$or = [
      { title: new RegExp(req.query.search, 'i') },
      { excerpt: new RegExp(req.query.search, 'i') },
      { category: new RegExp(req.query.search, 'i') }
    ];
  }

  const items = await Blog.find(filter)
    .select('-content')
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(Number(req.query.limit || 50))
    .lean();

  res.json({ items });
});

export const getBlog = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const filter = mongoose.isValidObjectId(slug) ? { _id: slug } : { slug };
  const item = await Blog.findOne({ ...filter, status: 'published' }).lean();

  if (!item) {
    throw new ApiError(404, 'Blog not found');
  }

  res.json({ item });
});

