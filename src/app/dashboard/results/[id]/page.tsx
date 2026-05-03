"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, ChevronDown, MessageSquare, Target, Zap, Loader2, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, use } from "react";

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [expandedQ, setExpandedQ] = useState<number | null>(1);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/interview/results/${id}`);
        const result = await res.json();
        if (result.success) {
          setData(result);
        } else {
          console.error(result.error);
        }
      } catch (err) {
        console.error("Failed to fetch results", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-semibold">Analyzing your performance...</h2>
        <p className="text-muted-foreground mt-2">Our AI is generating your comprehensive feedback report.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold">Results Not Found</h2>
        <Link href="/dashboard" className="text-primary hover:underline mt-4">Return to Dashboard</Link>
      </div>
    );
  }

  const scores = [
    { label: "Overall Score", value: data.session.overallScore, color: "text-green-500", icon: Target },
    { label: "Communication", value: data.averages.communication, color: "text-blue-500", icon: MessageSquare },
    { label: "Technical Depth", value: data.averages.technical, color: "text-orange-500", icon: Zap },
    { label: "Clarity", value: data.averages.clarity, color: "text-purple-500", icon: CheckCircle },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Interview Results</h1>
          <p className="text-muted-foreground">{data.session.role} • Completed {new Date(data.session.date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {scores.map((score, i) => {
          const Icon = score.icon;
          return (
            <motion.div 
              key={score.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border-t-4"
              style={{ borderTopColor: 'var(--primary)' }}
            >
              <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center ${score.color} mb-2`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold">{score.value}%</div>
              <div className="text-sm font-medium text-muted-foreground">{score.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Feedback */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold">Detailed Analysis</h2>
        
        <div className="space-y-4">
          {data.feedback.map((item: any) => (
            <div key={item.id} className="glass-panel rounded-2xl overflow-hidden border border-border/50">
              <button 
                onClick={() => setExpandedQ(expandedQ === item.id ? null : item.id)}
                className="w-full p-6 flex items-start justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${item.score >= 80 ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'}`}>
                    {item.score}
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Question {item.id}</div>
                    <h3 className="font-semibold text-lg">{item.question}</h3>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${expandedQ === item.id ? 'rotate-180' : ''}`} />
              </button>
              
              {expandedQ === item.id && (
                <div className="p-6 pt-0 border-t border-border/50 bg-muted/20">
                  <div className="space-y-6 mt-6">
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                        <h4 className="text-sm font-bold text-green-500 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" /> AI Feedback
                        </h4>
                        <p className="text-sm leading-relaxed">{item.aiFeedback}</p>
                      </div>
                      
                      <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl">
                        <h4 className="text-sm font-bold text-orange-500 mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" /> Area for improvement
                        </h4>
                        <p className="text-sm leading-relaxed">{item.improvement}</p>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl">
                      <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Ideal Answer Structure
                      </h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.idealAnswer}</p>
                    </div>

                    {item.missingPoints && item.missingPoints.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Key Points Missed</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {item.missingPoints.map((mp: string, idx: number) => (
                            <li key={idx} className="text-sm text-muted-foreground">{mp}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Roast Mode Integration */}
                    <div className="pt-4 border-t border-border/50">
                      <button 
                        onClick={async (e) => {
                          e.preventDefault();
                          const btn = e.currentTarget;
                          const originalText = btn.innerHTML;
                          btn.innerHTML = '<span class="animate-pulse">🔥 Roasting...</span>';
                          btn.disabled = true;
                          try {
                            const res = await fetch("/api/interview/roast", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ question: item.question, answer: item.aiFeedback }) // using aiFeedback as a proxy if we don't have user answer text in this view
                            });
                            const data = await res.json();
                            if (data.success) {
                              const roastDiv = document.createElement("div");
                              roastDiv.className = "mt-4 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 text-red-500 font-medium italic";
                              roastDiv.innerHTML = `🔥 "${data.roast}"`;
                              btn.parentElement?.appendChild(roastDiv);
                              btn.style.display = "none";
                            }
                          } catch (err) {
                            btn.innerHTML = originalText;
                            btn.disabled = false;
                          }
                        }}
                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 font-medium hover:bg-red-500/20 transition-all flex items-center gap-2 text-sm"
                      >
                        🔥 Roast My Answer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
