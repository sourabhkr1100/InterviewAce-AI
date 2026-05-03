import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { InterviewSession } from "@/lib/models/InterviewSession";
import { Question, Answer, Feedback } from "@/lib/models/QA";
import { evaluateAnswer, generateQuestion } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { sessionId, answerText, currentQuestionNum, timeTakenMs } = body;

    const session = await InterviewSession.findById(sessionId);
    if (!session) {
      return NextResponse.json({ success: false, error: "Session not found" }, { status: 404 });
    }

    // Get current question
    const currentQuestion = await Question.findOne({ sessionId, order: currentQuestionNum });
    if (!currentQuestion) {
      return NextResponse.json({ success: false, error: "Question not found" }, { status: 404 });
    }

    // Save answer
    const answer = await Answer.create({
      sessionId,
      questionId: currentQuestion._id,
      userId: session.userId,
      text: answerText,
      timeTakenMs: timeTakenMs || 0
    });

    // Evaluate answer with AI
    const evaluation = await evaluateAnswer(currentQuestion.text, answerText, session.targetRole);

    // Save feedback
    await Feedback.create({
      sessionId,
      questionId: currentQuestion._id,
      answerId: answer._id,
      score: evaluation.score,
      communicationScore: evaluation.communicationScore,
      technicalDepthScore: evaluation.technicalDepthScore,
      clarityScore: evaluation.clarityScore,
      confidenceScore: evaluation.confidenceScore,
      missingPoints: evaluation.missingPoints,
      idealAnswer: evaluation.idealAnswer,
      aiFeedback: evaluation.aiFeedback,
      improvementSuggestion: evaluation.improvementTips
    });

    let nextQuestionText = null;
    let isComplete = false;

    if (currentQuestionNum < 5) { // 5 questions per session
      // Get previous questions to avoid repetition
      const prevQuestions = await Question.find({ sessionId }).sort({ order: 1 });
      const prevQuestionTexts = prevQuestions.map(q => q.text);

      nextQuestionText = await generateQuestion(
        session.targetRole, 
        session.experienceLevel, 
        prevQuestionTexts,
        session.company
      );

      await Question.create({
        sessionId,
        text: nextQuestionText,
        order: currentQuestionNum + 1
      });
    } else {
      isComplete = true;
      session.status = "completed";
      
      // Calculate overall score
      const allFeedback = await Feedback.find({ sessionId });
      const totalScore = allFeedback.reduce((sum, f) => sum + f.score, 0);
      session.overallScore = Math.round(totalScore / allFeedback.length);
      session.completedAt = new Date();
      await session.save();
    }

    return NextResponse.json({ 
      success: true, 
      feedback: {
        score: evaluation.score,
        comment: evaluation.aiFeedback,
        improvement: evaluation.improvementTips
      },
      nextQuestion: nextQuestionText,
      isComplete
    });

  } catch (error: any) {
    console.error("Error submitting answer:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
