import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuestion extends Document {
  sessionId: mongoose.Types.ObjectId;
  text: string;
  order: number;
  expectedKeywords?: string[];
  createdAt: Date;
}

const QuestionSchema: Schema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, ref: 'InterviewSession', required: true },
  text: { type: String, required: true },
  order: { type: Number, required: true },
  expectedKeywords: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const Question: Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);

export interface IAnswer extends Document {
  sessionId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  text: string;
  audioUrl?: string; // If using voice input
  timeTakenMs: number;
  createdAt: Date;
}

const AnswerSchema: Schema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, ref: 'InterviewSession', required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  audioUrl: { type: String },
  timeTakenMs: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Answer: Model<IAnswer> = mongoose.models.Answer || mongoose.model<IAnswer>('Answer', AnswerSchema);

export interface IFeedback extends Document {
  sessionId: mongoose.Types.ObjectId;
  questionId: mongoose.Types.ObjectId;
  answerId: mongoose.Types.ObjectId;
  score: number;
  communicationScore: number;
  technicalDepthScore: number;
  clarityScore: number;
  confidenceScore: number;
  missingPoints: string[];
  idealAnswer: string;
  aiFeedback: string;
  improvementSuggestion: string;
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  sessionId: { type: Schema.Types.ObjectId, ref: 'InterviewSession', required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  answerId: { type: Schema.Types.ObjectId, ref: 'Answer', required: true },
  score: { type: Number, required: true },
  communicationScore: { type: Number, required: true },
  technicalDepthScore: { type: Number, required: true },
  clarityScore: { type: Number, required: true },
  confidenceScore: { type: Number, default: 0 },
  missingPoints: [{ type: String }],
  idealAnswer: { type: String },
  aiFeedback: { type: String, required: true },
  improvementSuggestion: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Feedback: Model<IFeedback> = mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
