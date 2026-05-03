import { GoogleGenAI } from "@google/genai";

// We'll initialize the client lazily to ensure env vars are loaded.
const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Using mock AI responses.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Generate an interview question based on the role and difficulty
export async function generateQuestion(
  role: string, 
  difficulty: string, 
  previousQuestions: string[],
  company?: string
): Promise<string> {
  const ai = getClient();
  
  if (!ai) {
    // Mock response if no key
    return `Can you explain a complex problem you solved recently in your role as a ${role}?`;
  }

  const companyContext = company ? ` The candidate is interviewing specifically for ${company}.` : "";
  const previousContext = previousQuestions.length > 0 
    ? `You have already asked: ${previousQuestions.map((q, i) => `${i + 1}. ${q}`).join(" ")}.` 
    : "This is the first question of the interview.";

  const prompt = `You are an expert technical interviewer. Generate ONE highly relevant, specific interview question for a ${role} position at ${difficulty} difficulty.${companyContext}
${previousContext}
The question should test practical knowledge, problem-solving, or behavioral aspects relevant to the role. Do not repeat previous questions. Do not include any intro or outro text, JUST the question itself.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "Could you tell me about your experience?";
  } catch (error) {
    console.error("AI Error generating question:", error);
    return "Could you tell me about a time you faced a significant challenge and how you handled it?";
  }
}

// Evaluate an answer and generate feedback
export async function evaluateAnswer(
  question: string,
  answer: string,
  role: string
) {
  const ai = getClient();

  if (!ai) {
    // Mock evaluation
    return {
      score: 85,
      communicationScore: 8,
      technicalDepthScore: 8,
      clarityScore: 9,
      confidenceScore: 8,
      missingPoints: ["Specific metrics", "Mentioning edge cases"],
      idealAnswer: "I would start by analyzing the root cause using monitoring tools...",
      improvementTips: "Try to structure your answer using the STAR method.",
      aiFeedback: "Good overall answer, but lacked some technical depth."
    };
  }

  const prompt = `You are an expert technical interviewer evaluating a candidate for a ${role} position.
Question asked: "${question}"
Candidate's answer: "${answer}"

Provide a comprehensive, brutally honest, but constructive evaluation of this answer. Return the result strictly as a JSON object with the following schema:
{
  "score": <number 0-100 overall score>,
  "communicationScore": <number 0-10>,
  "technicalDepthScore": <number 0-10>,
  "clarityScore": <number 0-10>,
  "confidenceScore": <number 0-10>,
  "missingPoints": [<string>, <string>],
  "idealAnswer": "<string showing how a perfect answer would look>",
  "improvementTips": "<string with specific tips>",
  "aiFeedback": "<string with overall summary feedback>"
}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    const text = response.text || "{}";
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI Error evaluating answer:", error);
    return {
      score: 70,
      communicationScore: 7,
      technicalDepthScore: 6,
      clarityScore: 7,
      confidenceScore: 7,
      missingPoints: ["Detailed explanation"],
      idealAnswer: "An ideal answer would cover specific details...",
      improvementTips: "Provide more structure in your answer.",
      aiFeedback: "Acceptable answer but needs more depth."
    };
  }
}

// Roast mode feature
export async function roastAnswer(question: string, answer: string) {
  const ai = getClient();
  if (!ai) return "If that answer was a bug, I'd mark it 'Won't Fix'. Try again with actual details!";

  const prompt = `You are a hilariously brutal, brutally honest, Simon Cowell-esque tech interviewer. 
Question: "${question}"
Answer: "${answer}"

Roast this answer. Be funny, sharp, slightly mean but highly entertaining. Max 3 sentences. No intro.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "I've heard better answers from a toaster. Do better.";
  }
}

// Resume Parsing AI
export async function analyzeResumeWithAI(resumeText: string, targetRole: string) {
  const ai = getClient();
  if (!ai) return { score: 75, missingKeywords: ["React", "Node"], improvements: "Add more quantifiable metrics." };

  const prompt = `You are an expert ATS (Applicant Tracking System) and senior recruiter.
Analyze the following resume text for a "${targetRole}" position.
Return a strict JSON object with this schema:
{
  "score": <number 0-100 ATS match score>,
  "missingKeywords": [<string>],
  "improvements": "<string suggesting improvements to bullet points or summary>"
}

Resume Text:
${resumeText.substring(0, 10000)} // Truncating to avoid token limits
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    const text = response.text || "{}";
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("AI Error analyzing resume:", error);
    return { score: 70, missingKeywords: [], improvements: "Unable to analyze fully." };
  }
}
