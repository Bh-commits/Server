import { env } from '../config/env.js';
import { sendMail } from '../config/mailer.js';
import { Lead } from '../models/Lead.js';
import { Subscriber } from '../models/Subscriber.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { leadAdminTemplate, leadCustomerTemplate } from '../utils/mailTemplates.js';

function normalizeLead(req, type) {
  const { name, phone, email, company, businessType, message } = req.body;

  if (!name || !phone || !email || !businessType || !message) {
    throw new ApiError(400, 'Name, phone, email, business type, and message are required');
  }

  return {
    type,
    name,
    phone,
    email,
    company,
    businessType,
    message,
    source: req.body.source || 'website'
  };
}

async function notifyLead(lead) {
  const adminTemplate = leadAdminTemplate(lead);
  const customerTemplate = leadCustomerTemplate(lead);

  const results = await Promise.allSettled([
    sendMail({ to: env.adminEmail, ...adminTemplate }),
    sendMail({ to: lead.email, ...customerTemplate })
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Email delivery failed (index ${index}):`, result.reason);
    }
  });
}

export const createContactLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create(normalizeLead(req, 'contact'));
  // void notifyLead(lead); // Email feature disabled per request
  res.status(201).json({ message: 'Contact request submitted', item: lead });
});

export const createConsultationLead = asyncHandler(async (req, res) => {
  const lead = await Lead.create(normalizeLead(req, 'consultation'));
  // void notifyLead(lead); // Email feature disabled per request
  res.status(201).json({ message: 'Consultation request submitted', item: lead });
});

export const subscribeNewsletter = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, 'Email is required');
  }

  const subscriber = await Subscriber.findOneAndUpdate(
    { email: email.toLowerCase() },
    { email: email.toLowerCase(), active: true, source: req.body.source || 'footer' },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  // Email notification feature disabled per request
  /*
  try {
    await sendMail({
      to: env.adminEmail,
      subject: `New Lead Captured via ${req.body.source || 'footer'}`,
      html: `<h2>New Lead Captured</h2>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Source:</strong> ${req.body.source || 'footer'}</p>`,
      text: `New lead captured. Email: ${email}. Source: ${req.body.source || 'footer'}`
    });
  } catch (err) {
    console.error('Failed to send newsletter notification email:', err);
  }
  */

  res.status(201).json({ message: 'Subscribed successfully', item: subscriber });
});
