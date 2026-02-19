
import React, { useState } from 'react';
import { generateEducationalContent, generateEducationalImage } from '../services/geminiService';

interface VisualDeepDiveProps {
  onClose: () => void;
  tone?: string;
}

const VisualDeepDive: React.FC<VisualDeepDiveProps> = ({ onClose, tone = 'academic' }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleLaunch = async () => {
    if (!topic) return;
    setLoading(true);
    setExplanation('');
    setImageUrl(null);
    
    try {
      const [text, image] = await Promise.all([
        generateEducationalContent(topic, 'explanation', tone),
        generateEducationalImage(topic)
      ]);
      setExplanation(text);
      setImageUrl(image);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setExplanation('');
    setImageUrl(null);
    setTopic('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in no-print transition-colors">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 relative transition-colors">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2"
          title="Return to Resources"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">Visual Deep Dive Engine</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">Dual-processing Mastery: Textual analysis paired with AI-generated visuals.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="e.g. The Krebs Cycle, Quantum Physics"
            className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-indigo-600 outline-none text-lg font-bold placeholder:text-slate-400 transition-all"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            onClick={handleLaunch}
            disabled={loading}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 disabled:bg-slate-300 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
          >
            {loading ? 'Analyzing...' : 'Start Dive'}
          </button>
        </div>

        {loading && (
            <div className="space-y-6">
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-3/4 animate-pulse"></div>
                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-full animate-pulse"></div>
                <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] w-full animate-pulse"></div>
            </div>
        )}

        {explanation && (
          <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12 mt-8 animate-fade-in">
              <div className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-black">1</span>
                      Conceptual Analysis
                  </h3>
                  <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-slate-50 dark:bg-slate-950/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 whitespace-pre-wrap transition-colors">
                      {explanation}
                  </div>
              </div>
              
              <div className="space-y-6">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                      <span className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-sm font-black">2</span>
                      Visual Schematic
                  </h3>
                  <div className="bg-slate-100 dark:bg-slate-950 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 h-[500px] flex items-center justify-center shadow-inner transition-colors">
                      {imageUrl ? (
                          <img src={imageUrl} alt={topic} className="w-full h-full object-contain" />
                      ) : (
                          <div className="text-center p-8">
                              <div className="text-5xl mb-4">🖼️</div>
                              <p className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-xs">Visual generation failed</p>
                          </div>
                      )}
                  </div>
              </div>
            </div>
            
            <div className="flex justify-center border-t border-slate-100 dark:border-slate-800 pt-12">
              <button
                onClick={handleReset}
                className="bg-indigo-600 text-white px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none flex items-center gap-3"
              >
                New Concept Dive
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualDeepDive;
