import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Resume } from "@/lib/models/Resume";
import { User } from "@/lib/models/User";
import { analyzeResumeWithAI } from "@/lib/ai";
export async function POST(req: Request) {
  try {
    // Dynamically require pdf-parse to avoid Next.js build issues
    const pdfParse = require("pdf-parse");
    await dbConnect();
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    const targetRole = formData.get("targetRole") as string || "Software Engineer";

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let pdfText = "";
    
    try {
      const pdfData = await pdfParse(buffer);
      pdfText = pdfData.text;
    } catch (e) {
      console.warn("PDF Parsing failed. Proceeding without resume context. Error:", e);
      // We don't return an error here, just proceed with empty text so the interview can start!
      pdfText = "";
    }

    const analysis = await analyzeResumeWithAI(pdfText, targetRole);

    // Default user handling for demo purposes
    let user = null;
    if (userId) {
      user = await User.findById(userId);
    } else {
      user = await User.findOne({ email: "demo@example.com" });
    }

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const resume = await Resume.create({
      userId: user._id,
      fileName: file.name,
      fileUrl: "local_memory", // In a real app, upload to S3 and save URL
      extractedSkills: analysis.missingKeywords || [], // Using this field temporarily
      extractedExperience: analysis.improvements,
      extractedRolePreference: targetRole
    });

    return NextResponse.json({ 
      success: true, 
      resumeId: resume._id,
      analysis 
    });

  } catch (error: any) {
    console.error("Error processing resume:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
