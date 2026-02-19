
import React, { useState } from 'react';
import { generateEducationalContent } from '../services/geminiService';

interface SmartNotesProps {
  onClose: () => void;
  tone?: string;
}

const SmartNotes: React.FC<SmartNotesProps> = ({ onClose, tone = 'academic' }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setError('');
    try {
      const result = await generateEducationalContent(topic, 'notes', tone);
      setNotes(result);
    } catch (err) {
      setError('Failed to generate notes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNotes('');
    setTopic('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in no-print transition-colors">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl p-8 border border-slate-100 dark:border-slate-800 relative overflow-hidden transition-colors">
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
          <span className="text-3xl">📝</span> Smart Notes Generator
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Enter topic or paste syllabus text..."
            className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none font-bold placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 disabled:bg-slate-300 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 dark:shadow-none"
          >
            {loading ? 'Processing...' : 'Generate'}
          </button>
        </div>

        {error && <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-2xl mb-8 font-bold border border-red-100 dark:border-red-900/30">{error}</div>}

        {notes && (
          <div className="space-y-8 animate-fade-in">
            <div className="p-8 md:p-10 bg-slate-50 dark:bg-slate-950/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 relative group transition-colors">
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-3">
                  <button 
                    onClick={() => window.print()}
                    className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 shadow-sm"
                  >
                      Print
                  </button>
              </div>
              <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 font-medium leading-relaxed whitespace-pre-wrap">
                {notes}
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <button
                onClick={handleReset}
                className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-50 dark:hover:bg-indigo-900/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" />
                </svg>
                New Topic
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartNotes;
