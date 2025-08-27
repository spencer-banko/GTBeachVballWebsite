import mongoose, { Schema, Document } from 'mongoose';
import { IExecutive } from '../types';

export interface ExecutiveDocument extends IExecutive, Document {}

const executiveSchema = new Schema<ExecutiveDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
      maxlength: [100, 'Role cannot exceed 100 characters'],
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
      trim: true,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    photoUrl: {
      type: String,
      required: [true, 'Photo URL is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    linkedinUrl: {
      type: String,
      trim: true,
      match: [/^https?:\/\/(www\.)?linkedin\.com\/.*/, 'Please enter a valid LinkedIn URL'],
    },
    visible: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
      min: [0, 'Order must be a positive number'],
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
executiveSchema.index({ visible: 1, order: 1 });
executiveSchema.index({ name: 1 });

// Pre-save middleware to ensure only one executive per role when visible
executiveSchema.pre('save', async function (next) {
  if (this.isModified('role') && this.visible) {
    const existingExecutive = await this.constructor.findOne({
      role: this.role,
      visible: true,
      _id: { $ne: this._id },
    });
    
    if (existingExecutive) {
      throw new Error(`An executive with the role "${this.role}" already exists`);
    }
  }
  next();
});

export const Executive = mongoose.model<ExecutiveDocument>('Executive', executiveSchema);
