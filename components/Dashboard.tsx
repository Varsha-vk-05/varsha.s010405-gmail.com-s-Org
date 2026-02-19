
import React from 'react';
import { StudyPlan, UserSettings } from '../types';

interface DashboardProps {
  plans: StudyPlan[];
  settings: UserSettings;
  onViewPlan: (plan: StudyPlan) => void;
  onCreateNew: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ plans, settings, onViewPlan, onCreateNew }) => {
  // Logic to calculate progress for "Today"
  const todayStr = new Date().toISOString().split('T')[0];
  
  let todaysTasks = 0;
  let completedTodaysTasks = 0;
  
  plans.forEach(plan => {
    plan.days.forEach(day => {
      // Find tasks for today
      if (day.date.startsWith(todayStr)) {
        todaysTasks += day.tasks.length;
        completedTodaysTasks += day.tasks.filter(t => t.completed).length;
      }
    });
  });

  const taskProgressPercent = todaysTasks > 0 
    ? Math.round((completedTodaysTasks / settings.dailyTargetTasks) * 100) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Learning Hub</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 font-bold uppercase tracking-[0.2em] text-[10px]">Your Academic Command Center</p>
        </div>
        <button
          onClick={onCreateNew}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
        >
          Architect New Map
        </button>
      </div>

      {plans.length > 0 && (
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Daily Target Progress Card */}
            <div className="md:col-span-2 bg-indigo-600 dark:bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Today's Performance</h3>
                    <p className="text-indigo-100/70 text-sm font-bold mt-1">Goal: {settings.dailyTargetTasks} Tasks • {settings.dailyTargetHours}h Study</p>
                  </div>
                  <div className="bg-white/20 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
                    Active Session
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 items-end">
                  <div>
                    <div className="text-5xl font-black mb-2">{completedTodaysTasks} <span className="text-xl opacity-50">/ {settings.dailyTargetTasks}</span></div>
                    <div className="text-[10px] font-black uppercase tracking-widest opacity-70">Daily Tasks Completed</div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-black mb-1">{taskProgressPercent}%</div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden max-w-[120px]">
                      <div className="h-full bg-white transition-all duration-700" style={{ width: `${Math.min(taskProgressPercent, 100)}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
            </div>

            {/* Quick Stat Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Total Maps</div>
                <div className="text-4xl font-black text-slate-900 dark:text-white leading-none">{plans.length}</div>
              </div>
              <div className="pt-6 border-t border-slate-50 dark:border-slate-800">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Upcoming Exam</div>
                <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {new Date(plans[0].examDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8 px-2">Project Repository</h3>
        {plans.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:border-indigo-300 dark:hover:border-indigo-900">
            <div className="text-7xl mb-6 grayscale dark:grayscale-0">📖</div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">No Active Maps Found</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-sm mx-auto font-medium">Lumina is ready to architect your next successful study sprint. Define your parameters to begin.</p>
            <button
              onClick={onCreateNew}
              className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 dark:shadow-none"
            >
              Start Your First Map
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                onClick={() => onViewPlan(plan)}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 cursor-pointer hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-2xl dark:hover:shadow-none transition-all relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <div className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-800">
                    {plan.days.length} Day Map
                  </span>
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 line-clamp-2 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {plan.subjects.join(', ')}
                </h3>
                
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center text-sm font-bold text-slate-500 dark:text-slate-400">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    {new Date(plan.examDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center text-sm font-bold text-slate-500 dark:text-slate-400">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    {plan.dailyHours}h Daily Focus
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Built {new Date(plan.createdAt).toLocaleDateString()}</span>
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Explore →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
