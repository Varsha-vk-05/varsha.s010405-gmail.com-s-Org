
import React, { useState } from 'react';
import { generateEducationalContent } from '../services/geminiService';

const ConceptComparator: React.FC = () => {
  const [conceptA, setConceptA] = useState('');
  const [conceptB, setConceptB] = useState('');
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState('');

  const handleCompare = async () => {
    if (!conceptA || !conceptB) return;
    setLoading(true);
    try {
      const prompt = `Compare ${conceptA} and ${conceptB} in detail. Create a Markdown table comparing their key characteristics, use cases, and differences. Ensure high contrast text for visibility.`;
      const result = await generateEducationalContent(prompt, 'explanation');
      setComparison(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in no-print transition-colors">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl p-8 border border-slate-100 dark:border-slate-800 transition-colors">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3">
          <span className="text-3xl">⚖️</span> Concept Comparator
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <input
            type="text"
            placeholder="Concept A (e.g. Mitosis)"
            className="px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-indigo-500 outline-none font-bold placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
            value={conceptA}
            onChange={(e) => setConceptA(e.target.value)}
          />
          <input
            type="text"
            placeholder="Concept B (e.g. Meiosis)"
            className="px-6 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-indigo-500 outline-none font-bold placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
            value={conceptB}
            onChange={(e) => setConceptB(e.target.value)}
          />
        </div>

        <button
          onClick={handleCompare}
          disabled={loading || !conceptA || !conceptB}
          className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 disabled:bg-slate-300 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
        >
          {loading ? 'Synthesizing Differences...' : 'Run Side-by-Side Analysis'}
        </button>

        {comparison && (
          <div className="mt-10 overflow-x-auto bg-slate-50 dark:bg-slate-950/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-colors">
            <div className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 font-medium leading-relaxed whitespace-pre-wrap">
              {comparison}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptComparator;
