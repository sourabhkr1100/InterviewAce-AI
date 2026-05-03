"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle2, ChevronRight, MessageSquare, Mic, Sparkles, TrendingUp, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-500/10 blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">InterviewAce</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="text-sm font-medium px-4 py-2 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all flex items-center gap-2">
              Start Practicing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-16 px-6">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto text-center space-y-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-sm font-medium text-muted-foreground"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI-Powered Interview Coach 2.0 is here</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1]"
          >
            Land your dream job with <span className="text-gradient">AI Mock Interviews</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Practice real-world interview questions, get instant AI feedback, and improve your confidence in a stress-free environment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium text-lg hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2">
              Start Free Trial <ChevronRight className="w-5 h-5" />
            </Link>
            <Link href="#demo" className="w-full sm:w-auto px-8 py-4 rounded-full border border-border bg-background/50 hover:bg-muted font-medium text-lg transition-all flex items-center justify-center">
              View Demo
            </Link>
          </motion.div>

          {/* Hero Image / UI Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 relative mx-auto max-w-5xl"
          >
            <div className="glass-panel rounded-2xl p-2 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10 z-10 pointer-events-none" />
              <div className="rounded-xl overflow-hidden border border-border/50 bg-card">
                {/* Mockup Top Bar */}
                <div className="h-12 border-b border-border/50 bg-muted/30 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                {/* Mockup Content */}
                <div className="flex p-6 gap-6 min-h-[400px]">
                  {/* Sidebar */}
                  <div className="w-64 hidden lg:flex flex-col gap-4">
                    <div className="h-8 w-3/4 bg-muted rounded-md mb-4" />
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-10 w-full bg-muted/50 rounded-lg" />
                    ))}
                  </div>
                  {/* Main Content Area */}
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="h-8 w-48 bg-muted rounded-md" />
                      <div className="h-8 w-24 bg-primary/20 rounded-full" />
                    </div>
                    {/* Chat bubbles */}
                    <div className="flex flex-col gap-4 mt-8">
                      <div className="self-start flex gap-3 max-w-[80%]">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                          <Bot className="w-5 h-5 text-primary" />
                        </div>
                        <div className="p-4 rounded-2xl rounded-tl-none bg-muted/50 text-left">
                          <div className="h-4 w-64 bg-foreground/20 rounded mb-2" />
                          <div className="h-4 w-48 bg-foreground/20 rounded" />
                        </div>
                      </div>
                      <div className="self-end flex gap-3 max-w-[80%] flex-row-reverse">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="p-4 rounded-2xl rounded-tr-none bg-primary text-white text-left shadow-lg shadow-primary/20">
                          <div className="h-4 w-56 bg-white/40 rounded mb-2" />
                          <div className="h-4 w-72 bg-white/40 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div id="features" className="max-w-7xl mx-auto mt-32 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need to succeed</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our platform provides comprehensive tools to ensure you are fully prepared for your next interview.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<MessageSquare className="w-6 h-6 text-primary" />}
              title="Role-Specific Scenarios"
              description="Practice with questions tailored to your exact role and industry, from Software Engineering to Product Management."
            />
            <FeatureCard 
              icon={<Mic className="w-6 h-6 text-primary" />}
              title="Voice & Text Support"
              description="Answer verbally with our advanced speech-to-text AI or type your answers if you prefer."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              title="Actionable Feedback"
              description="Get instant scores on clarity, technical depth, and confidence, with suggested improvements."
            />
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-24">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl">InterviewAce</span>
          </div>
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} InterviewAce AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="glass-panel p-8 rounded-2xl flex flex-col gap-4 hover:-translate-y-1 transition-transform duration-300">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
