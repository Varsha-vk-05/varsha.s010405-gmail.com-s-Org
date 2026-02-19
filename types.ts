
export interface StudyTask {
  id: string;
  title: string;
  duration: string;
  description?: string;
  completed: boolean;
}

export interface StudyDay {
  dayNumber: number;
  date: string;
  tasks: StudyTask[];
  focusArea: string;
}

export interface StudyPlan {
  id: string;
  subjects: string[];
  examDate: string;
  dailyHours: number;
  days: StudyDay[];
  createdAt: string;
}

export enum AppTab {
  HOME = 'home',
  DASHBOARD = 'dashboard',
  CREATE_PLAN = 'create_plan',
  RESOURCES = 'resources',
  SETTINGS = 'settings',
  VIEW_PLAN = 'view_plan',
  TOOL_NOTE_GEN = 'tool_note_gen',
  TOOL_QUIZ_GEN = 'tool_quiz_gen',
  TOOL_VISUAL_DEEP_DIVE = 'tool_visual_deep_dive',
  TOOL_MIND_MAPPER = 'tool_mind_mapper',
  TOOL_ANSWER_EVAL = 'tool_answer_eval',
  TOOL_MOCK_INTERVIEW = 'tool_mock_interview'
}

export interface ResourceTool {
  id: AppTab;
  title: string;
  description: string;
  icon: string;
  category: 'engine' | 'strategy' | 'wellness' | 'advanced';
  isInteractive: boolean;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  emailReminders: boolean;
  emailAddress: string;
  pushNotifications: boolean;
  dailyTargetHours: number;
  dailyTargetTasks: number;
  aiTone: 'academic' | 'creative' | 'simplified';
}
