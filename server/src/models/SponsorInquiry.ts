import mongoose, { Schema, Document } from 'mongoose';
import { ISponsorInquiry } from '../types';

export interface SponsorInquiryDocument extends ISponsorInquiry, Document {}

const sponsorInquirySchema = new Schema<SponsorInquiryDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters'],
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Indexes
sponsorInquirySchema.index({ email: 1 });
sponsorInquirySchema.index({ createdAt: -1 });
sponsorInquirySchema.index({ company: 1 });

// Pre-save middleware to prevent spam
sponsorInquirySchema.pre('save', async function (next) {
  if (this.isNew) {
    const recentInquiries = await this.constructor.countDocuments({
      email: this.email,
      createdAt: {
        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
      },
    });
    
    if (recentInquiries >= 3) {
      throw new Error('Too many inquiries from this email address. Please try again later.');
    }
  }
  next();
});

export const SponsorInquiry = mongoose.model<SponsorInquiryDocument>(
  'SponsorInquiry',
  sponsorInquirySchema
);
