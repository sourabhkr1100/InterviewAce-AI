"use client";

import { motion } from "framer-motion";
import { Award, Flame, LineChart as LineChartIcon, Trophy } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 72 },
  { name: 'Week 3', score: 68 },
  { name: 'Week 4', score: 85 },
  { name: 'Week 5', score: 82 },
  { name: 'Week 6', score: 90 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Analytics & Progress</h1>
        <p className="text-muted-foreground mt-1">Track your performance and see how you're improving over time.</p>
      </div>

      {/* Gamification Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-500">3 Day Streak!</div>
            <div className="text-sm font-medium text-orange-500/80">Keep it up! Practice tomorrow to maintain.</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border-yellow-500/20">
          <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-500">Top 10%</div>
            <div className="text-sm font-medium text-yellow-500/80">You are in the top 10% of users this week.</div>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex items-center gap-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
            <Award className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-500">5 Badges</div>
            <div className="text-sm font-medium text-purple-500/80">Earned for consistent practice.</div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <LineChartIcon className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Score Trends</h2>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                />
                <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col">
          <h2 className="text-xl font-bold mb-6">Skill Breakdown</h2>
          <div className="flex-1 space-y-6">
            {[
              { name: 'Technical', value: 85, color: 'bg-blue-500' },
              { name: 'Communication', value: 92, color: 'bg-green-500' },
              { name: 'Problem Solving', value: 78, color: 'bg-orange-500' },
              { name: 'System Design', value: 65, color: 'bg-red-500' },
            ].map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2 text-sm font-medium">
                  <span>{skill.name}</span>
                  <span>{skill.value}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.value}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full ${skill.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
