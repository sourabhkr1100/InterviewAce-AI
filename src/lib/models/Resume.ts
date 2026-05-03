import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IResume extends Document {
  userId: mongoose.Types.ObjectId;
  fileName: string;
  fileUrl: string; // S3 URL or local path
  extractedSkills?: string[];
  extractedExperience?: string;
  extractedRolePreference?: string;
  uploadedAt: Date;
}

const ResumeSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  extractedSkills: [{ type: String }],
  extractedExperience: { type: String },
  extractedRolePreference: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

export const Resume: Model<IResume> = mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);
