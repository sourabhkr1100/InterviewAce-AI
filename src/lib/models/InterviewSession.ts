import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInterviewSession extends Document {
  userId: mongoose.Types.ObjectId;
  targetRole: string;
  experienceLevel: string;
  company?: string;
  resumeId?: mongoose.Types.ObjectId;
  status: 'in-progress' | 'completed';
  overallScore?: number;
  startedAt: Date;
  completedAt?: Date;
}

const InterviewSessionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  targetRole: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  company: { type: String },
  resumeId: { type: Schema.Types.ObjectId, ref: 'Resume' },
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  overallScore: { type: Number },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

export const InterviewSession: Model<IInterviewSession> = mongoose.models.InterviewSession || mongoose.model<IInterviewSession>('InterviewSession', InterviewSessionSchema);
