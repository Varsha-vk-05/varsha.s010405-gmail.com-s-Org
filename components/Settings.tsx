
import React, { useState } from 'react';
import { UserSettings } from '../types';

interface SettingsProps {
  settings: UserSettings;
  onUpdateSettings: (s: UserSettings) => void;
  onClearPlans: () => void;
}

type SettingCategory = 'data' | 'targets' | 'ai' | 'notifications';

const Settings: React.FC<SettingsProps> = ({ settings, onUpdateSettings, onClearPlans }) => {
  const [activeCategory, setActiveCategory] = useState<SettingCategory>('notifications');
  const [showConfirm, setShowConfirm] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isSending, setIsSending] = useState(false);

  const update = (changes: Partial<UserSettings>) => {
    onUpdateSettings({ ...settings, ...changes });
  };

  const handleEmailTest = async () => {
    if (!settings.emailAddress.includes('@')) {
      setFeedback({ type: 'error', message: 'Enter a valid email address first.' });
      return;
    }
    
    setIsSending(true);
    await new Promise(r => setTimeout(r, 1800));
    setIsSending(false);
    
    setFeedback({ 
      type: 'success', 
      message: `System Handshake Successful. Protocol initiated for ${settings.emailAddress}` 
    });
    
    setTimeout(() => setFeedback(null), 3000);
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'notifications':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between gap-4 p-8 bg-slate-100 dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 transition-colors">
              <div className="flex-1">
                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-sm">Email Reminders</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">Auto-dispatch daily schedules and motivational spikes to your inbox.</p>
              </div>
              <button 
                onClick={() => update({ emailReminders: !settings.emailReminders })}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all focus:outline-none ${
                  settings.emailReminders ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-sm ${
                  settings.emailReminders ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {settings.emailReminders && (
              <div className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fade-in transition-colors">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Destination Mailbox</label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="email"
                      placeholder="e.g. academic.elite@study.com"
                      value={settings.emailAddress}
                      onChange={(e) => update({ emailAddress: e.target.value })}
                      className="flex-1 px-5 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all font-black placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                    <button 
                      onClick={handleEmailTest}
                      disabled={isSending}
                      className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 dark:shadow-none min-w-[140px]"
                    >
                      {isSending ? 'Linking...' : 'Confirm Mail'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'targets':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm mb-10">Productivity Benchmarks</h4>
              <div className="space-y-12">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <label className="text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Target Daily Hours</label>
                    <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl text-lg font-black tabular-nums">
                      {settings.dailyTargetHours}h
                    </span>
                  </div>
                  <input 
                    type="range" min="1" max="16" step="0.5"
                    value={settings.dailyTargetHours}
                    onChange={(e) => update({ dailyTargetHours: parseFloat(e.target.value) })}
                    className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-xl appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <label className="text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">Tasks Quota</label>
                    <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-xl text-lg font-black tabular-nums">
                      {settings.dailyTargetTasks} units
                    </span>
                  </div>
                  <input 
                    type="range" min="1" max="10"
                    value={settings.dailyTargetTasks}
                    onChange={(e) => update({ dailyTargetTasks: parseInt(e.target.value) })}
                    className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-xl appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'ai':
        return (
          <div className="space-y-6 animate-fade-in">
             <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
              <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm mb-4">AI Cognition Engine</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-10 font-medium">Fine-tune the complexity and delivery style of your study aids.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'academic', label: 'Academic', icon: '🏛️', desc: 'Formal Analysis' },
                  { id: 'creative', label: 'Creative', icon: '🎨', desc: 'Metaphor Heavy' },
                  { id: 'simplified', label: 'Feynman', icon: '🧩', desc: 'First Principles' }
                ].map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => update({ aiTone: tone.id as any })}
                    className={`p-6 rounded-[2rem] border-2 text-left transition-all ${
                      settings.aiTone === tone.id 
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-600 dark:border-indigo-400' 
                        : 'bg-white dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="text-3xl mb-3">{tone.icon}</div>
                    <div className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-sm">{tone.label}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-black mt-2 tracking-widest leading-none">{tone.desc}</div>
                  </button>
                ))}
              </div>
             </div>
          </div>
        );
      case 'data':
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="p-10 bg-red-50 dark:bg-red-900/10 rounded-[2.5rem] border border-red-100 dark:border-red-900/30 transition-colors">
              <h4 className="text-red-800 dark:text-red-400 font-black uppercase tracking-widest mb-4">Factory Reset</h4>
              <p className="text-red-600 dark:text-red-500/80 text-sm mb-10 leading-relaxed font-bold">WARNING: This operation executes an immediate deletion of all study maps and metadata from local storage.</p>
              
              {!showConfirm ? (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-200 dark:shadow-none"
                >
                  Confirm Reset
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                  <button
                    onClick={() => { onClearPlans(); setShowConfirm(false); }}
                    className="bg-red-800 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all flex-1"
                  >
                    Yes, Delete All
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex-1"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Settings</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 font-bold uppercase tracking-[0.2em] text-[10px]">Environment & Protocol</p>
        </div>
        
        <div className="flex bg-slate-200 dark:bg-slate-900 p-2 rounded-2xl border border-slate-300 dark:border-slate-800 transition-colors">
          <button 
            onClick={() => update({ theme: 'light' })}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              settings.theme === 'light' ? 'bg-white shadow-lg text-indigo-600' : 'text-slate-400 dark:text-slate-500 hover:text-slate-700'
            }`}
          >
            Light
          </button>
          <button 
            onClick={() => update({ theme: 'dark' })}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
              settings.theme === 'dark' ? 'bg-slate-800 shadow-lg text-white' : 'text-slate-400 dark:text-slate-500 hover:text-slate-300'
            }`}
          >
            Dark
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1 flex md:flex-col gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          {[
            { id: 'notifications', label: 'Integrations', icon: '📬' },
            { id: 'targets', label: 'Goals', icon: '🎯' },
            { id: 'ai', label: 'AI Studio', icon: '✨' },
            { id: 'data', label: 'System', icon: '🛠️' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id as any)}
              className={`flex-shrink-0 md:flex-none flex items-center gap-4 px-8 py-5 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${
                activeCategory === item.id 
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-100 dark:shadow-none translate-x-1' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 border border-slate-100 dark:border-slate-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="md:col-span-3">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
