
import React, { useState } from 'react';
import { generateEducationalContent } from '../services/geminiService';

interface QuizGeneratorProps {
  onClose: () => void;
  tone?: string;
}

const QuizGenerator: React.FC<QuizGeneratorProps> = ({ onClose, tone = 'academic' }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState('');

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const result = await generateEducationalContent(topic, 'quiz', tone);
      setQuiz(result);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuiz('');
    setTopic('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in no-print transition-colors">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl p-8 border border-slate-100 dark:border-slate-800 relative transition-colors">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-2"
          title="Return to Resources"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <span className="text-3xl">❓</span> Practice Quiz Generator
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="What subject should we test?"
            className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-bold placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 disabled:bg-slate-300 transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
          >
            {loading ? 'Creating...' : 'Create Quiz'}
          </button>
        </div>

        {quiz && (
          <div className="space-y-8 animate-fade-in">
            <div className="p-8 md:p-10 bg-indigo-50 dark:bg-indigo-950/30 rounded-[2.5rem] border border-indigo-100 dark:border-indigo-900/30 transition-colors">
              <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 font-medium whitespace-pre-wrap leading-loose">
                {quiz}
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <button
                onClick={handleReset}
                className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-200 transition-all flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                </svg>
                New Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;
