"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, FileText, Settings, Upload, Loader2, Building } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function InterviewSetup() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState("intermediate");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  
  const handleStart = async () => {
    setIsStarting(true);
    try {
      let resumeId = null;
      
      // Upload resume if provided
      if (file) {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("targetRole", role);
        // userId would come from context/auth
        
        const uploadRes = await fetch("/api/resume/upload", {
          method: "POST",
          body: formData,
        });
        
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          resumeId = uploadData.resumeId;
        }
        setIsUploading(false);
      }

      // Start session
      const startRes = await fetch("/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetRole: role,
          experienceLevel: experience,
          company: company || undefined,
          resumeId,
          // userId would be passed if logged in
        }),
      });

      const startData = await startRes.json();
      if (startData.success) {
        // We'll store the first question in sessionStorage to pass it easily, 
        // or just fetch it in the room
        sessionStorage.setItem("firstQuestion", startData.firstQuestion);
        router.push(`/dashboard/interview/room/${startData.sessionId}`);
      } else {
        alert("Failed to start interview: " + startData.error);
        setIsStarting(false);
      }
    } catch (error) {
      console.error(error);
      setIsStarting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Configure Your Interview</h1>
        <p className="text-muted-foreground">Customize your practice session to get the most relevant AI questions.</p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>1</div>
        <div className={`h-1 w-16 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>2</div>
      </div>

      <div className="glass-panel p-8 rounded-2xl">
        {step === 1 ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="space-y-4">
              <label className="text-lg font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" /> Target Role
              </label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Developer, Product Manager"
                className="w-full bg-background border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg"
              />
            </div>

            <div className="space-y-4">
              <label className="text-lg font-semibold flex items-center gap-2">
                <Building className="w-5 h-5 text-primary" /> Target Company (Optional)
              </label>
              <input 
                type="text" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google, Amazon, TCS"
                className="w-full bg-background border border-border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg"
              />
            </div>

            <div className="space-y-4">
              <label className="text-lg font-semibold flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" /> Experience Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setExperience(level)}
                    className={`p-4 rounded-xl border text-center capitalize font-medium transition-all ${
                      experience === level 
                        ? 'border-primary bg-primary/10 text-primary' 
                        : 'border-border bg-background hover:bg-muted'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              disabled={!role}
              className="w-full py-4 rounded-xl bg-foreground text-background font-bold text-lg hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8 flex items-center justify-center gap-2"
            >
              Next Step <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="space-y-4">
              <label className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Context (Optional)
              </label>
              <p className="text-sm text-muted-foreground">Upload your resume so the AI can tailor questions specifically to your background.</p>
              
              <label className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="font-semibold">{file ? file.name : "Click to upload or drag and drop"}</p>
                  <p className="text-sm text-muted-foreground mt-1">PDF or DOCX (Max 5MB)</p>
                </div>
                <input 
                  type="file" 
                  accept=".pdf,.docx" 
                  className="hidden" 
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                onClick={() => setStep(1)}
                disabled={isStarting}
                className="w-1/3 py-4 rounded-xl border border-border font-medium hover:bg-muted transition-all disabled:opacity-50"
              >
                Back
              </button>
              <button 
                onClick={handleStart}
                disabled={isStarting}
                className="w-2/3 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-primary/25 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isStarting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isUploading ? "Analyzing Resume..." : "Starting Engine..."}
                  </>
                ) : (
                  "Start Interview Now"
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
