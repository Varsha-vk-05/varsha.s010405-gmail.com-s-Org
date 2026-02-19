
import React from 'react';
import { AppTab } from '../types';

interface HomeProps {
  onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6">
            Master Your Studies with <span className="text-indigo-600 dark:text-indigo-400">Lumina AI</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
            Lumina is your personal AI-powered study architect. Transform your curriculum into a personalized success roadmap in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onStart}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-xl shadow-indigo-200 dark:shadow-none text-center"
            >
              Plan Your Success
            </button>
            <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i}/40/40`} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900" alt="Student" />
                ))}
              </div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Joined by 10,000+ students</span>
            </div>
          </div>
        </div>
        
        <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-3xl p-4 transform rotate-3 absolute inset-0 -z-10"></div>
          <img 
            src="https://picsum.photos/seed/study/800/600" 
            className="rounded-3xl shadow-2xl w-full object-cover h-[400px] md:h-[500px] brightness-90 dark:brightness-75" 
            alt="Study Session" 
          />
        </div>
      </div>

      <div className="mt-32 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: "Personalized Plans", desc: "AI tailored to your subjects, speed, and deadlines.", icon: "🎯" },
          { title: "Smart Resources", desc: "Generate notes, quizzes and diagrams on demand.", icon: "🧠" },
          { title: "Science-Backed", desc: "Built using Active Recall & Spaced Repetition.", icon: "🧪" },
          { title: "Focus Optimized", desc: "Integrated tools to beat burnout and maintain flow.", icon: "⚡" },
        ].map((feature, idx) => (
          <div key={idx} className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all shadow-sm hover:shadow-md group">
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{feature.icon}</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;