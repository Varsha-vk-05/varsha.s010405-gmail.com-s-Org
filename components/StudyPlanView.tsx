
import React, { useState } from 'react';
import { StudyPlan, StudyDay, StudyTask } from '../types';

interface StudyPlanViewProps {
  plan: StudyPlan;
  onBack: () => void;
  onUpdatePlan: (plan: StudyPlan) => void;
}

const StudyPlanView: React.FC<StudyPlanViewProps> = ({ plan, onBack, onUpdatePlan }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isExporting, setIsExporting] = useState(false);

  const toggleTask = (dayNum: number, taskId: string) => {
    const updatedDays = plan.days.map(day => {
      if (day.dayNumber === dayNum) {
        return {
          ...day,
          tasks: day.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return day;
    });
    onUpdatePlan({ ...plan, days: updatedDays });
  };

  const handlePrint = () => {
    window.print();
    setIsExporting(false);
  };

  const handleDownload = () => {
    let content = `LUMINA STUDY PLAN\n`;
    content += `Subjects: ${plan.subjects.join(', ')}\n`;
    content += `Exam Date: ${plan.examDate}\n`;
    content += `Generated on: ${new Date(plan.createdAt).toLocaleDateString()}\n`;
    content += `------------------------------------------\n\n`;

    plan.days.forEach(day => {
      content += `DAY ${day.dayNumber} (${day.date})\n`;
      content += `Focus: ${day.focusArea}\n`;
      day.tasks.forEach(task => {
        content += `- [${task.completed ? 'X' : ' '}] ${task.title} (${task.duration})\n`;
        if (task.description) content += `  Note: ${task.description}\n`;
      });
      content += `\n`;
    });

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lumina_Study_Plan_${plan.id.slice(0, 8)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsExporting(false);
  };

  const currentDay = plan.days.find(d => d.dayNumber === selectedDay) || plan.days[0];
  const progress = Math.round(
    (plan.days.reduce((acc, d) => acc + d.tasks.filter(t => t.completed).length, 0) /
    (plan.days.reduce((acc, d) => acc + d.tasks.length, 0) || 1)) * 100
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in transition-colors">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 no-print">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400"
            title="Go Back"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {plan.subjects.join(' & ')}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">Exam on {new Date(plan.examDate).toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {!isExporting ? (
            <button
              onClick={() => setIsExporting(true)}
              className="w-full md:w-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
          ) : (
            <div className="flex items-center gap-2 animate-fade-in w-full md:w-auto">
              <button
                onClick={handlePrint}
                className="flex-1 md:flex-none bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-md"
              >
                Print
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 md:flex-none bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-2.5 rounded-xl font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition-colors"
              >
                Text
              </button>
              <button 
                onClick={() => setIsExporting(false)}
                className="p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid sm:grid-cols-3 gap-6 mb-8 no-print">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
          <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-wider mb-2">Total Progress</div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{progress}%</span>
            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-bold mb-1">Success Rate</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full mt-4 overflow-hidden">
            <div className="bg-indigo-600 dark:bg-indigo-500 h-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-wider mb-2">Daily Commitment</div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{plan.dailyHours}h</span>
            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-bold mb-1">Focus Block</span>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-wider mb-2">Timeline Remaining</div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">{plan.days.length}</span>
            <span className="text-sm text-indigo-600 dark:text-indigo-400 font-bold mb-1">Days Sequence</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Day Selector Sidebar */}
        <div className="lg:w-72 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 no-print scrollbar-hide">
          {plan.days.map((day) => (
            <button
              key={day.dayNumber}
              onClick={() => setSelectedDay(day.dayNumber)}
              className={`flex-shrink-0 lg:flex-none px-6 py-4 rounded-2xl text-left transition-all ${
                selectedDay === day.dayNumber
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 dark:shadow-none'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800'
              }`}
            >
              <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedDay === day.dayNumber ? 'opacity-70' : 'text-slate-400'}`}>Day {day.dayNumber}</div>
              <div className="font-bold text-sm truncate">{day.focusArea}</div>
            </button>
          ))}
        </div>

        {/* Selected Day Content */}
        <div className="flex-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-10 border border-slate-100 dark:border-slate-800 shadow-sm print-container transition-colors">
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Day {currentDay.dayNumber}: {currentDay.focusArea}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{new Date(currentDay.date).toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
              </div>
              <div className="no-print hidden sm:block">
                <span className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-green-100 dark:border-green-800">
                  {currentDay.tasks.filter(t => t.completed).length} / {currentDay.tasks.length} Completed
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {currentDay.tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`flex gap-5 p-6 rounded-3xl border transition-all study-card ${
                    task.completed 
                      ? 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 opacity-60' 
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm'
                  }`}
                >
                  <button 
                    onClick={() => toggleTask(currentDay.dayNumber, task.id)}
                    className={`mt-1 flex-shrink-0 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all no-print ${
                      task.completed ? 'bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-100 dark:shadow-none' : 'border-slate-200 dark:border-slate-600 hover:border-indigo-400'
                    }`}
                  >
                    {task.completed && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className={`text-lg font-bold leading-tight ${task.completed ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-900 dark:text-white'}`}>
                        {task.title}
                      </h4>
                      <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1.5 rounded-lg h-fit no-print whitespace-nowrap uppercase tracking-widest">
                        {task.duration}
                      </span>
                    </div>
                    {task.description && (
                      <p className={`text-sm mt-3 leading-relaxed font-medium ${task.completed ? 'text-slate-400 dark:text-slate-500' : 'text-slate-500 dark:text-slate-400'}`}>
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-indigo-900 dark:bg-indigo-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl no-print border border-indigo-800 transition-colors">
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💡</span>
                <h3 className="text-xl font-black uppercase tracking-widest">AI Performance Tip</h3>
              </div>
              <p className="text-indigo-100 text-lg leading-relaxed font-medium">
                Try the <strong>Active Recall</strong> technique for today's session. After reading a section, close your book and try to explain the core concepts out loud as if you were teaching a beginner. 
              </p>
            </div>
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanView;