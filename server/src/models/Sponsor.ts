import mongoose, { Schema, Document } from 'mongoose';
import { ISponsor } from '../types';

export interface SponsorDocument extends ISponsor, Document {}

const sponsorSchema = new Schema<SponsorDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    logoUrl: {
      type: String,
      required: [true, 'Logo URL is required'],
      trim: true,
    },
    websiteUrl: {
      type: String,
      required: [true, 'Website URL is required'],
      trim: true,
      match: [/^https?:\/\/.+/, 'Please enter a valid website URL'],
    },
    blurb: {
      type: String,
      required: [true, 'Blurb is required'],
      trim: true,
      maxlength: [300, 'Blurb cannot exceed 300 characters'],
    },
    active: {
      type: Boolean,
      default: false,
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
sponsorSchema.index({ active: 1 });
sponsorSchema.index({ name: 1 });

// Pre-save middleware to ensure only one active sponsor
sponsorSchema.pre('save', async function (next) {
  if (this.isModified('active') && this.active) {
    // Deactivate all other sponsors
    await this.constructor.updateMany(
      { _id: { $ne: this._id } },
      { active: false }
    );
  }
  next();
});

// Static method to activate a sponsor
sponsorSchema.statics.activateSponsor = async function (sponsorId: string) {
  // Deactivate all sponsors first
  await this.updateMany({}, { active: false });
  
  // Activate the specified sponsor
  const sponsor = await this.findByIdAndUpdate(
    sponsorId,
    { active: true },
    { new: true }
  );
  
  if (!sponsor) {
    throw new Error('Sponsor not found');
  }
  
  return sponsor;
};

// Static method to get active sponsor
sponsorSchema.statics.getActiveSponsor = function () {
  return this.findOne({ active: true });
};

export const Sponsor = mongoose.model<SponsorDocument>('Sponsor', sponsorSchema);
