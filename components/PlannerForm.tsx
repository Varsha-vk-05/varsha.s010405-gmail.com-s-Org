
import React, { useState } from 'react';
import { generateStudyPlan } from '../services/geminiService';
import { StudyPlan } from '../types';

interface PlannerFormProps {
  onPlanGenerated: (plan: StudyPlan) => void;
}

const PlannerForm: React.FC<PlannerFormProps> = ({ onPlanGenerated }) => {
  const [subjects, setSubjects] = useState('');
  const [examDate, setExamDate] = useState('');
  const [hours, setHours] = useState(4);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjects || !examDate) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const plan = await generateStudyPlan(subjects, examDate, hours);
      onPlanGenerated(plan);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in no-print transition-colors">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-indigo-100 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors">
        <div className="bg-indigo-600 px-8 py-10 text-white">
          <h2 className="text-3xl font-black mb-2">Plan Your Success</h2>
          <p className="text-indigo-100 font-medium">Let Lumina architect your personalized study journey.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl text-sm font-bold border border-red-100 dark:border-red-900/30 flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">Subjects / Topics to Cover</label>
            <textarea
              placeholder="e.g. Organic Chemistry, Quantum Physics, Calculus II"
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-indigo-500 outline-none min-h-[140px] transition-all font-bold placeholder:text-slate-400 dark:placeholder:text-slate-500"
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">Exam Date</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-indigo-500 outline-none transition-all font-bold placeholder:text-slate-400"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">Daily Study Hours ({hours}h)</label>
              <div className="px-2">
                <input
                  type="range"
                  min="1"
                  max="12"
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-6"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mt-4">
                  <span>Relaxed</span>
                  <span>Intense</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-5 rounded-2xl text-sm font-black uppercase tracking-widest text-white transition-all transform flex items-center justify-center gap-3 shadow-xl ${
              loading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 active:translate-y-0 shadow-indigo-100 dark:shadow-none'
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Architecting Map...
              </>
            ) : (
              'Create My Roadmap'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlannerForm;
