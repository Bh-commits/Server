import { Blog } from '../models/Blog.js';
import { Career } from '../models/Career.js';
import { JobApplication } from '../models/JobApplication.js';
import { Lead } from '../models/Lead.js';
import { Portfolio } from '../models/Portfolio.js';
import { Service } from '../models/Service.js';
import { Subscriber } from '../models/Subscriber.js';
import { Testimonial } from '../models/Testimonial.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const resources = {
  services: Service,
  portfolio: Portfolio,
  blogs: Blog,
  careers: Career,
  testimonials: Testimonial,
  leads: Lead,
  subscribers: Subscriber,
  applications: JobApplication
};

function getModel(resource) {
  const Model = resources[resource];
  if (!Model) {
    throw new ApiError(404, 'Resource not found');
  }
  return Model;
}

export const listResource = asyncHandler(async (req, res) => {
  const Model = getModel(req.params.resource);
  const items = await Model.find({}).sort({ createdAt: -1 }).limit(200).lean();
  res.json({ items });
});

export const createResource = asyncHandler(async (req, res) => {
  if (['leads', 'subscribers', 'applications'].includes(req.params.resource)) {
    throw new ApiError(405, 'This resource cannot be created from admin');
  }

  const Model = getModel(req.params.resource);
  const item = await Model.create(req.body);
  res.status(201).json({ item });
});

export const updateResource = asyncHandler(async (req, res) => {
  const Model = getModel(req.params.resource);
  const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  res.json({ item });
});

export const deleteResource = asyncHandler(async (req, res) => {
  const Model = getModel(req.params.resource);
  const item = await Model.findByIdAndDelete(req.params.id);

  if (!item) {
    throw new ApiError(404, 'Item not found');
  }

  res.json({ message: 'Item deleted' });
});

export const analytics = asyncHandler(async (req, res) => {
  const [leads, contactLeads, consultationLeads, blogs, careers, portfolio, services, subscribers, testimonials, applications] =
    await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ type: 'contact' }),
      Lead.countDocuments({ type: 'consultation' }),
      Blog.countDocuments(),
      Career.countDocuments(),
      Portfolio.countDocuments(),
      Service.countDocuments(),
      Subscriber.countDocuments(),
      Testimonial.countDocuments(),
      JobApplication.countDocuments()
    ]);

  res.json({
    leads,
    contactLeads,
    consultationLeads,
    blogs,
    careers,
    portfolio,
    services,
    subscribers,
    testimonials,
    applications
  });
});

