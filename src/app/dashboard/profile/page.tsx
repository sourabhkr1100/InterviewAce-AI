"use client";

import { User, Mail, Briefcase, FileText, Upload } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [role, setRole] = useState("Frontend Developer");

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and preferences.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
            <button className="w-full py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors">
              Change Avatar
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-muted-foreground" /> Full Name
                </label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1">
                  <Mail className="w-4 h-4 text-muted-foreground" /> Email Address
                </label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2 mb-1">
                  <Briefcase className="w-4 h-4 text-muted-foreground" /> Default Target Role
                </label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            </div>

            <div className="pt-4">
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Default Resume
            </h2>
            <p className="text-sm text-muted-foreground">Upload your resume once, and we'll use it to personalize all your interview sessions automatically.</p>
            
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">Click to upload your resume</p>
                <p className="text-xs text-muted-foreground mt-1">PDF or DOCX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
