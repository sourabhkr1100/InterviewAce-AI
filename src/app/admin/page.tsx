"use client";

import { Activity, Users, Database, Server } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "1,234", icon: Users },
    { label: "Interviews Today", value: "89", icon: Activity },
    { label: "Questions in Bank", value: "5,432", icon: Database },
    { label: "System Uptime", value: "99.9%", icon: Server },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview and statistics.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-panel p-6 rounded-2xl flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Recent Users</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    U{i}
                  </div>
                  <div>
                    <div className="font-medium">User {i}</div>
                    <div className="text-xs text-muted-foreground">user{i}@example.com</div>
                  </div>
                </div>
                <div className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                  Active
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">System Alerts</h2>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              <span className="font-bold">High Load:</span> API response times are slightly degraded.
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 text-sm">
              <span className="font-bold">Info:</span> Database backup completed successfully.
            </div>
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm">
              <span className="font-bold">Update:</span> New question bank loaded successfully.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
