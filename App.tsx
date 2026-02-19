
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import PlannerForm from './components/PlannerForm';
import StudyPlanView from './components/StudyPlanView';
import Resources from './components/Resources';
import Settings from './components/Settings';
import SmartNotes from './components/SmartNotes';
import QuizGenerator from './components/QuizGenerator';
import VisualDeepDive from './components/VisualDeepDive';
import { AppTab, StudyPlan, UserSettings } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [plans, setPlans] = useState<StudyPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<StudyPlan | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    theme: 'light',
    emailReminders: false,
    emailAddress: '',
    pushNotifications: true,
    dailyTargetHours: 4,
    dailyTargetTasks: 3,
    aiTone: 'academic'
  });

  // Theme Sync
  useEffect(() => {
    if (userSettings.theme === 'dark') {
      document.documentElement.classList.add('class', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [userSettings.theme]);

  // Initial Load
  useEffect(() => {
    const savedPlans = localStorage.getItem('lumina_plans');
    const savedSettings = localStorage.getItem('lumina_settings');
    
    if (savedPlans) setPlans(JSON.parse(savedPlans));
    if (savedSettings) setUserSettings(JSON.parse(savedSettings));
  }, []);

  const handleUpdateSettings = (newSettings: UserSettings) => {
    setUserSettings(newSettings);
    localStorage.setItem('lumina_settings', JSON.stringify(newSettings));
  };

  const savePlans = (newPlans: StudyPlan[]) => {
    setPlans(newPlans);
    localStorage.setItem('lumina_plans', JSON.stringify(newPlans));
  };

  const handlePlanGenerated = (newPlan: StudyPlan) => {
    const updatedPlans = [newPlan, ...plans];
    savePlans(updatedPlans);
    setCurrentPlan(newPlan);
    setActiveTab(AppTab.VIEW_PLAN);
  };

  const closeTool = () => setActiveTab(AppTab.RESOURCES);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.HOME:
        return <Home onStart={() => setActiveTab(AppTab.CREATE_PLAN)} />;
      case AppTab.DASHBOARD:
        return (
          <Dashboard 
            plans={plans} 
            settings={userSettings}
            onViewPlan={(p) => { setCurrentPlan(p); setActiveTab(AppTab.VIEW_PLAN); }} 
            onCreateNew={() => setActiveTab(AppTab.CREATE_PLAN)} 
          />
        );
      case AppTab.CREATE_PLAN:
        return <PlannerForm onPlanGenerated={handlePlanGenerated} />;
      case AppTab.VIEW_PLAN:
        return currentPlan ? (
          <StudyPlanView 
            plan={currentPlan} 
            onBack={() => setActiveTab(AppTab.DASHBOARD)} 
            onUpdatePlan={(p) => {
              const updated = plans.map(x => x.id === p.id ? p : x);
              savePlans(updated);
              setCurrentPlan(p);
            }}
          />
        ) : <Dashboard plans={plans} settings={userSettings} onViewPlan={() => {}} onCreateNew={() => setActiveTab(AppTab.CREATE_PLAN)} />;
      case AppTab.RESOURCES:
        return <Resources onLaunchTool={(tab) => setActiveTab(tab)} />;
      case AppTab.SETTINGS:
        return <Settings settings={userSettings} onUpdateSettings={handleUpdateSettings} onClearPlans={() => savePlans([])} />;
      case AppTab.TOOL_NOTE_GEN:
        return <SmartNotes onClose={closeTool} tone={userSettings.aiTone} />;
      case AppTab.TOOL_QUIZ_GEN:
        return <QuizGenerator onClose={closeTool} tone={userSettings.aiTone} />;
      case AppTab.TOOL_VISUAL_DEEP_DIVE:
        return <VisualDeepDive onClose={closeTool} tone={userSettings.aiTone} />;
      default:
        return <Home onStart={() => setActiveTab(AppTab.CREATE_PLAN)} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 dark:bg-slate-950 bg-slate-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
      
      {activeTab === AppTab.HOME && (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-12 no-print">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">© 2025 Lumina AI Study Planner. Precision engineered for academic mastery.</p>
            </div>
        </footer>
      )}
    </div>
  );
};

export default App;
