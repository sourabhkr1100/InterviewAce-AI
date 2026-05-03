"use client";

import { motion } from "framer-motion";
import { Bot, Mic, MicOff, Send, Square, Timer, Loader2 } from "lucide-react";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function InterviewRoom({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id: sessionId } = use(params);

  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per question
  const [answer, setAnswer] = useState("");
  const [currentQuestionNum, setCurrentQuestionNum] = useState(1);
  const [questionText, setQuestionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState<any>(null);
  
  const totalQuestions = 5;

  useEffect(() => {
    // Load initial question from session storage or fetch
    const firstQ = sessionStorage.getItem("firstQuestion");
    if (firstQ) {
      setQuestionText(firstQ);
      sessionStorage.removeItem("firstQuestion"); // clear it
    } else {
      // In a real app we'd fetch the current state of the session from the DB
      setQuestionText("Tell me about yourself.");
    }
    
    // Setup Speech Recognition
    if (typeof window !== "undefined" && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          setAnswer(prev => prev + " " + finalTranscript);
        }
      };
      
      setSpeechRecognition(recognition);
    }
  }, []);

  useEffect(() => {
    // Read out the question when it changes
    if (questionText && typeof window !== "undefined" && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(questionText);
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1;
      
      // Try to find a good voice (preferably female or professional sounding)
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      // Cancel any ongoing speech before starting a new one
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }, [questionText]);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, isSubmitting]);

  const toggleRecording = () => {
    if (isRecording) {
      speechRecognition?.stop();
      setIsRecording(false);
    } else {
      if (speechRecognition) {
        speechRecognition.start();
        setIsRecording(true);
      } else {
        alert("Speech recognition is not supported in your browser. Please type your answer.");
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (!answer.trim() && !isRecording) return;
    
    setIsSubmitting(true);
    if (isRecording) {
      speechRecognition?.stop();
      setIsRecording(false);
    }

    try {
      const timeTaken = (120 - timeLeft) * 1000;
      
      const res = await fetch("/api/interview/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          answerText: answer,
          currentQuestionNum,
          timeTakenMs: timeTaken
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        if (data.isComplete) {
          router.push(`/dashboard/results/${sessionId}`);
        } else {
          setQuestionText(data.nextQuestion);
          setCurrentQuestionNum(prev => prev + 1);
          setAnswer("");
          setTimeLeft(120);
        }
      } else {
        alert("Failed to submit answer: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {[...Array(totalQuestions)].map((_, i) => (
              <div 
                key={i} 
                className={`h-2 w-8 rounded-full ${
                  i + 1 === currentQuestionNum ? 'bg-primary' : 
                  i + 1 < currentQuestionNum ? 'bg-primary/40' : 'bg-muted'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentQuestionNum} of {totalQuestions}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-orange-500 font-mono font-medium bg-orange-500/10 px-4 py-2 rounded-lg">
          <Timer className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 relative">
        {isSubmitting && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="font-medium">AI is analyzing your answer...</p>
          </div>
        )}

        {/* AI Question */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={`q-${currentQuestionNum}`}
          className="flex gap-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="glass-panel p-6 rounded-2xl rounded-tl-none flex-1">
            <h3 className="text-xl font-medium leading-relaxed">
              {questionText || "Loading question..."}
            </h3>
          </div>
        </motion.div>

        {/* User Answer Area */}
        <div className="flex-1 flex flex-col justify-end mt-8">
          <div className="glass-panel rounded-2xl p-4 border border-border/50 shadow-sm relative focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <textarea 
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here or use the microphone to speak..."
              className="w-full h-40 bg-transparent resize-none focus:outline-none p-2 text-lg"
              disabled={isSubmitting}
            />
            
            <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-2">
              <button 
                onClick={toggleRecording}
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  isRecording 
                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse' 
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                }`}
              >
                {isRecording ? <Square className="w-4 h-4 fill-current" /> : <Mic className="w-4 h-4" />}
                <span className="font-medium">{isRecording ? 'Stop Recording' : 'Voice Answer'}</span>
              </button>

              <button 
                onClick={handleSubmit}
                disabled={!answer.trim() && !isRecording || isSubmitting}
                className="flex items-center gap-2 px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestionNum === totalQuestions ? 'Finish Interview' : 'Submit Answer'}
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
