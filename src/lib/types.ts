// User Profile Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  education: Education;
  skills: SkillScores;
  projects: Project[];
  experience: Experience[];
  goals: CareerGoals;
  createdAt: Date;
  updatedAt: Date;
}

export interface Education {
  degree: string;
  branch: string;
  college: string;
  graduationYear: number;
  cgpa: number;
}

export interface SkillScores {
  dsa: number; // 0-5
  fundamentals: FundamentalsScore;
  projects: number; // 0-5
  experience: number; // 0-5
  overall: number; // 0-5
}

export interface FundamentalsScore {
  os: number;
  cn: number;
  dbms: number;
  oops: number;
  average: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  complexity: 'basic' | 'intermediate' | 'advanced';
  hasDeployment: boolean;
  hasGithub: boolean;
}

export interface Experience {
  id: string;
  type: 'internship' | 'fulltime' | 'freelance';
  company: string;
  role: string;
  duration: number; // in months
  technologies: string[];
}

export interface CareerGoals {
  targetRoles: string[];
  targetCompanies: string[];
  timelineMonths: number;
  priorityAreas: string[];
}

// Company Types
export interface Company {
  id: string;
  name: string;
  tier: 'tier1' | 'tier2' | 'tier3';
  logo?: string;
  requirements: CompanyRequirements;
  interviewPattern: InterviewPattern;
  rejectRules: RejectRule[];
}

export interface CompanyRequirements {
  minDSA: number;
  minFundamentals: number;
  minProjects: number;
  minExperience: number;
  weights: {
    dsa: number;
    fundamentals: number;
    projects: number;
    experience: number;
  };
}

export interface InterviewPattern {
  rounds: string[];
  focusAreas: string[];
  typicalDuration: string;
}

export interface RejectRule {
  field: string;
  operator: 'lt' | 'gt' | 'eq' | 'ne';
  value: number;
  message: string;
}

// Matching Types
export interface CompanyMatch {
  company: Company;
  fitScore: number;
  status: 'recommended' | 'prepare' | 'avoid';
  gaps: SkillGap[];
  prepTime: number; // weeks
}

export interface SkillGap {
  skill: string;
  current: number;
  required: number;
  gap: number;
  priority: 'high' | 'medium' | 'low';
}

// Roadmap Types
export interface Roadmap {
  id: string;
  userId: string;
  generatedAt: Date;
  totalWeeks: number;
  weeks: RoadmapWeek[];
  excludedTopics: string[];
}

export interface RoadmapWeek {
  weekNumber: number;
  theme: string;
  tasks: RoadmapTask[];
  estimatedHours: number;
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  category: 'dsa' | 'fundamentals' | 'projects' | 'softskills';
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
  resources: string[];
  isCompleted: boolean;
}

// Onboarding Form Types
export interface OnboardingFormData {
  // Step 1: Basic Info
  name: string;
  email: string;
  
  // Step 2: Education
  degree: string;
  branch: string;
  college: string;
  graduationYear: number;
  cgpa: number;
  
  // Step 3: Skills
  dsaLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  dsaProblems: number;
  osLevel: 'none' | 'basic' | 'intermediate' | 'advanced';
  cnLevel: 'none' | 'basic' | 'intermediate' | 'advanced';
  dbmsLevel: 'none' | 'basic' | 'intermediate' | 'advanced';
  oopsLevel: 'none' | 'basic' | 'intermediate' | 'advanced';
  
  // Step 4: Projects & Experience
  projects: Omit<Project, 'id'>[];
  experiences: Omit<Experience, 'id'>[];
  
  // Step 5: Goals
  targetRoles: string[];
  targetCompanies: string[];
  timelineMonths: number;
  weeklyHours: number;
}
