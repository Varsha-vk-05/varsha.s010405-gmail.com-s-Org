
import React from 'react';
import { ResourceTool, AppTab } from '../types';

interface ResourcesProps {
  onLaunchTool: (tab: AppTab) => void;
}

const Resources: React.FC<ResourcesProps> = ({ onLaunchTool }) => {
  const tools: ResourceTool[] = [
    { 
      id: AppTab.TOOL_NOTE_GEN, 
      title: "Smart Notes", 
      description: "Convert chaotic topics into clean, structured, and hierarchical study notes.", 
      icon: "📝", 
      category: 'engine',
      isInteractive: true 
    },
    { 
      id: AppTab.TOOL_QUIZ_GEN, 
      title: "Practice Quizzer", 
      description: "Generate MCQs and short answers tailored to your specific subject and difficulty.", 
      icon: "❓", 
      category: 'engine',
      isInteractive: true 
    },
    { 
      id: AppTab.TOOL_VISUAL_DEEP_DIVE, 
      title: "Visual Deep Dive", 
      description: "In-depth concept explanations paired with real-time AI-generated diagrams.", 
      icon: "📊", 
      category: 'engine',
      isInteractive: true 
    },
    { 
      id: AppTab.TOOL_MIND_MAPPER, 
      title: "Mind Mapper", 
      description: "Visualize connections between complex topics with structured hierarchical maps.", 
      icon: "🕸️", 
      category: 'engine',
      isInteractive: true 
    },
    { 
      id: AppTab.TOOL_ANSWER_EVAL, 
      title: "Answer Evaluator", 
      description: "Submit your written answers and receive score-based AI feedback and tips.", 
      icon: "✅", 
      category: 'advanced',
      isInteractive: true 
    },
    { 
      id: AppTab.TOOL_MOCK_INTERVIEW, 
      title: "AI Mock Interview", 
      description: "Prepare for vivas and placements with our real-time voice prep engine.", 
      icon: "🎙️", 
      category: 'advanced',
      isInteractive: true 
    },
  ];

  const strategies = [
    { title: "Active Recall", desc: "The most effective way to retain information. Test yourself before you study.", icon: "⚡" },
    { title: "Interleaving", desc: "Mix different topics in one session to improve long-term retention.", icon: "🔄" },
    { title: "Spaced Repetition", desc: "Review topics at increasing intervals to fight the 'Forgetting Curve'.", icon: "🗓️" },
    { title: "Feynman Technique", desc: "Explain concepts in simple terms to identify gaps in your knowledge.", icon: "👨‍🏫" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-20 transition-colors">
      {/* AI Mastery Engines */}
      <section>
        <div className="mb-10">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">AI Mastery Engines</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Interactive precision tools to amplify your study efficiency</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <div 
              key={tool.id}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-2xl dark:hover:shadow-none transition-all group flex flex-col h-full overflow-hidden"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="text-5xl transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">{tool.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-800">
                  Online
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{tool.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-10 flex-grow font-medium">
                {tool.description}
              </p>
              <button 
                onClick={() => onLaunchTool(tool.id)}
                className="w-full bg-slate-900 dark:bg-slate-800 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 group-hover:shadow-xl group-hover:shadow-indigo-100 dark:group-hover:shadow-none"
              >
                Launch Engine
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Strategies */}
      <section>
        <div className="mb-10">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Proven Strategies</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Scientific methods for deep retention</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {strategies.map((strat, idx) => (
            <div key={idx} className="bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-8 rounded-[2.5rem] hover:bg-white dark:hover:bg-slate-900 transition-all group border-b-4 hover:border-b-indigo-500">
              <div className="text-3xl mb-5 grayscale group-hover:grayscale-0 transition-all transform group-hover:scale-110">{strat.icon}</div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3">{strat.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-bold uppercase tracking-wide">{strat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wellness & Reflection */}
      <section className="bg-indigo-600 dark:bg-indigo-900/40 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl transition-colors">
        <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
          <div className="flex-1">
            <div className="inline-block bg-white/20 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">Peak Performance</div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Mind & Recovery</h2>
            <p className="text-indigo-100 text-lg leading-relaxed mb-10 font-medium max-w-xl">
              Academic excellence requires a resilient mind. Monitor your cognitive load, practice deep reflection, and maintain a sustainable flow with our wellness integration.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/20">Check-in</button>
              <button className="bg-white/10 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all">Daily Reflect</button>
            </div>
          </div>
          <div className="flex-shrink-0 w-full md:w-80 h-80 bg-white/10 rounded-[3rem] relative overflow-hidden backdrop-blur-sm border border-white/10">
             <img src="https://picsum.photos/seed/meditation/600/600" className="w-full h-full object-cover opacity-60 mix-blend-overlay" alt="Relax" />
             <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full blur-[150px] opacity-20 -mr-48 -mt-48"></div>
      </section>
    </div>
  );
};

export default Resources;