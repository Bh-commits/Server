import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    source: {
      type: String,
      default: 'footer'
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export const Subscriber = mongoose.model('Subscriber', subscriberSchema);

