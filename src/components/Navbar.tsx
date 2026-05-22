import React from 'react';
import { Gamepad2, Sparkles, BookOpen, Clock, Heart, Laptop } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalGames: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, totalGames }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#11151F]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo & Platform info */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/10">
              <Gamepad2 className="h-6 w-6" id="nav-logo" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-indigo-500"></span>
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                مُعرب الألعاب
              </h1>
              <p className="text-xs text-slate-400 font-mono">Steam & Platforms Arabization</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('browse')}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                activeTab === 'browse'
                  ? 'bg-indigo-650/20 text-indigo-400 border-b-2 border-indigo-500'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              id="tab-browse"
            >
              <Gamepad2 className="h-4 w-4" />
              <span>تصفح الألعاب <span className="mr-1 rounded-full bg-indigo-500/10 px-1.5 py-0.5 text-xs text-indigo-400 font-mono">{totalGames}</span></span>
            </button>

            <button
              onClick={() => setActiveTab('ai-helper')}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                activeTab === 'ai-helper'
                  ? 'bg-indigo-650/20 text-indigo-400 border-b-2 border-indigo-500'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              id="tab-ai-helper"
            >
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>المعرّب الذكي (AI)</span>
            </button>

            <button
              onClick={() => setActiveTab('guides')}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                activeTab === 'guides'
                  ? 'bg-indigo-650/20 text-indigo-400 border-b-2 border-indigo-500'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
              id="tab-guides"
            >
              <BookOpen className="h-4 w-4" />
              <span>دليل المطورين</span>
            </button>


          </nav>

          {/* User & Platform badge */}
          <div className="hidden items-center gap-3 md:flex font-mono text-xs">
            <div className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-slate-400 border border-slate-800">
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              <span>تزامن مباشر</span>
            </div>
            <div className="text-slate-400">
              المعربون: <span className="text-white font-bold text-sm">العرب +900</span>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
