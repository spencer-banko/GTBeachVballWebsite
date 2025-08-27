import mongoose, { Schema, Document } from 'mongoose';
import { IInterestSubmission } from '../types';

export interface InterestSubmissionDocument extends IInterestSubmission, Document {}

const interestSubmissionSchema = new Schema<InterestSubmissionDocument>(
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
    phone: {
      type: String,
      trim: true,
      match: [/^[\+]?[1-9][\d\s\-\(\)]{0,20}$/, 'Please enter a valid phone number'],
    },
    affiliation: {
      type: String,
      required: [true, 'Affiliation is required'],
      enum: {
        values: ['GT Student', 'Other'],
        message: 'Affiliation must be either "GT Student" or "Other"',
      },
    },
    experienceLevel: {
      type: String,
      required: [true, 'Experience level is required'],
      enum: {
        values: ['Beginner', 'Intermediate', 'Advanced'],
        message: 'Experience level must be Beginner, Intermediate, or Advanced',
      },
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
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
interestSubmissionSchema.index({ email: 1 });
interestSubmissionSchema.index({ createdAt: -1 });
interestSubmissionSchema.index({ affiliation: 1, experienceLevel: 1 });

// Pre-save middleware to prevent duplicate submissions from same email
interestSubmissionSchema.pre('save', async function (next) {
  if (this.isNew) {
    const existingSubmission = await this.constructor.findOne({
      email: this.email,
      createdAt: {
        $gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
      },
    });
    
    if (existingSubmission) {
      throw new Error('You have already submitted an interest form in the last 24 hours');
    }
  }
  next();
});

export const InterestSubmission = mongoose.model<InterestSubmissionDocument>(
  'InterestSubmission',
  interestSubmissionSchema
);
