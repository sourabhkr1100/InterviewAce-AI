import { NextResponse } from "next/server";
import { roastAnswer } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer } = body;

    if (!question || !answer) {
      return NextResponse.json({ success: false, error: "Question and answer required" }, { status: 400 });
    }

    const roast = await roastAnswer(question, answer);

    return NextResponse.json({ success: true, roast });
  } catch (error: any) {
    console.error("Error generating roast:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
