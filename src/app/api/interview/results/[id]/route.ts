import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { InterviewSession } from "@/lib/models/InterviewSession";
import { Feedback, Question } from "@/lib/models/QA";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    const session = await InterviewSession.findById(id);
    if (!session) {
      return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 });
    }

    const feedbacks = await Feedback.find({ sessionId: id }).sort({ createdAt: 1 });
    const questions = await Question.find({ sessionId: id }).sort({ order: 1 });

    // Combine them
    const feedbackDetails = feedbacks.map((f, i) => {
      const q = questions.find(q => q._id.toString() === f.questionId.toString()) || questions[i];
      return {
        id: i + 1,
        question: q?.text || "Unknown Question",
        score: f.score,
        communicationScore: f.communicationScore,
        technicalDepthScore: f.technicalDepthScore,
        clarityScore: f.clarityScore,
        confidenceScore: f.confidenceScore,
        missingPoints: f.missingPoints,
        idealAnswer: f.idealAnswer,
        aiFeedback: f.aiFeedback,
        improvement: f.improvementSuggestion
      };
    });

    // Calculate averages
    let avgComm = 0, avgTech = 0, avgClar = 0, avgConf = 0;
    if (feedbacks.length > 0) {
      avgComm = Math.round(feedbacks.reduce((s, f) => s + f.communicationScore, 0) / feedbacks.length * 10);
      avgTech = Math.round(feedbacks.reduce((s, f) => s + f.technicalDepthScore, 0) / feedbacks.length * 10);
      avgClar = Math.round(feedbacks.reduce((s, f) => s + f.clarityScore, 0) / feedbacks.length * 10);
      avgConf = Math.round(feedbacks.reduce((s, f) => s + (f.confidenceScore || 0), 0) / feedbacks.length * 10);
    }

    return NextResponse.json({ 
      success: true, 
      session: {
        role: session.targetRole,
        date: session.completedAt || session.startedAt,
        overallScore: session.overallScore || 0,
      },
      averages: {
        communication: avgComm,
        technical: avgTech,
        clarity: avgClar,
        confidence: avgConf
      },
      feedback: feedbackDetails
    });

  } catch (error: any) {
    console.error("Error fetching results:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
