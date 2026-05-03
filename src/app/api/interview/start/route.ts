import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { InterviewSession } from "@/lib/models/InterviewSession";
import { Question } from "@/lib/models/QA";
import { User } from "@/lib/models/User";
import { generateQuestion } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { targetRole, experienceLevel, userId, company } = body;

    let user = null;
    if (userId) {
      user = await User.findById(userId);
    } else {
      user = await User.findOne({ email: "demo@example.com" });
      if (!user) {
        user = await User.create({
          name: "Demo User",
          email: "demo@example.com",
          role: "user"
        });
      }
    }

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found or could not be created" }, { status: 400 });
    }

    const session = await InterviewSession.create({
      userId: user._id,
      targetRole,
      experienceLevel,
      company,
      status: "in-progress"
    });

    const aiQuestion = await generateQuestion(targetRole, experienceLevel, [], company);

    await Question.create({
      sessionId: session._id,
      text: aiQuestion,
      order: 1
    });

    return NextResponse.json({ 
      success: true, 
      sessionId: session._id,
      firstQuestion: aiQuestion
    });

  } catch (error: any) {
    console.error("Error starting interview:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
