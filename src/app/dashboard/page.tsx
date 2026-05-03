"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, CheckCircle, Clock, Plus, Star, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const stats = [
    { label: "Interviews Completed", value: "12", icon: CheckCircle, color: "text-green-500" },
    { label: "Average Score", value: "85%", icon: Target, color: "text-primary" },
    { label: "Hours Practiced", value: "4.5", icon: Clock, color: "text-blue-500" },
    { label: "Current Streak", value: "3 Days", icon: TrendingUp, color: "text-orange-500" },
  ];

  const recentInterviews = [
    { id: 1, role: "Frontend Developer", date: "2 days ago", score: 88, difficulty: "Intermediate" },
    { id: 2, role: "HR Round", date: "4 days ago", score: 92, difficulty: "Beginner" },
    { id: 3, role: "System Design", date: "1 week ago", score: 76, difficulty: "Advanced" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground mt-1">Ready to ace your next interview?</p>
        </div>
        <Link href="/dashboard/interview/setup" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all">
          <Plus className="w-5 h-5" /> New Interview
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-5 rounded-2xl flex flex-col gap-3"
            >
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="md:col-span-2 glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Interviews</h2>
            <Link href="/dashboard/analytics" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentInterviews.map((interview) => (
              <div key={interview.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors border border-border/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{interview.role}</h3>
                    <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                      <span>{interview.date}</span>
                      <span>•</span>
                      <span>{interview.difficulty}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gradient">{interview.score}%</div>
                  <div className="text-xs text-muted-foreground">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6">
          <h2 className="text-xl font-bold">Recommended</h2>
          
          <div className="flex-1 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border border-primary/20 rounded-xl p-5 flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Star className="w-24 h-24" />
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center z-10">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold z-10">Level Up Your React Skills</h3>
            <p className="text-sm text-muted-foreground z-10">Your last React interview showed a weakness in Hooks. Try a focused session.</p>
            <button className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors z-10">
              Start Focused Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
