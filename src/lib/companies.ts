import type { Company } from '@/lib/types';

export const companies: Company[] = [
  {
    id: 'google',
    name: 'Google',
    tier: 'tier1',
    requirements: {
      minDSA: 4.5,
      minFundamentals: 4,
      minProjects: 3.5,
      minExperience: 2,
      weights: { dsa: 0.4, fundamentals: 0.25, projects: 0.2, experience: 0.15 }
    },
    interviewPattern: {
      rounds: ['Phone Screen', 'Technical 1', 'Technical 2', 'System Design', 'Behavioral'],
      focusAreas: ['DSA', 'Problem Solving', 'System Design', 'Googleyness'],
      typicalDuration: '4-6 weeks'
    },
    rejectRules: [
      { field: 'dsa', operator: 'lt', value: 4, message: 'DSA skills below Google threshold' },
      { field: 'fundamentals', operator: 'lt', value: 3.5, message: 'CS fundamentals need improvement' }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    tier: 'tier1',
    requirements: {
      minDSA: 4,
      minFundamentals: 4,
      minProjects: 3,
      minExperience: 1.5,
      weights: { dsa: 0.35, fundamentals: 0.3, projects: 0.2, experience: 0.15 }
    },
    interviewPattern: {
      rounds: ['HR Screen', 'Technical 1', 'Technical 2', 'Design Round', 'AA Round'],
      focusAreas: ['DSA', 'System Design', 'Problem Solving', 'Leadership'],
      typicalDuration: '3-5 weeks'
    },
    rejectRules: [
      { field: 'dsa', operator: 'lt', value: 3.5, message: 'DSA below Microsoft threshold' },
      { field: 'fundamentals', operator: 'lt', value: 3.5, message: 'Fundamentals need strengthening' }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    tier: 'tier1',
    requirements: {
      minDSA: 4,
      minFundamentals: 3.5,
      minProjects: 3.5,
      minExperience: 2,
      weights: { dsa: 0.35, fundamentals: 0.2, projects: 0.25, experience: 0.2 }
    },
    interviewPattern: {
      rounds: ['OA', 'Phone Screen', 'Virtual Onsite (4 rounds)'],
      focusAreas: ['DSA', 'Leadership Principles', 'System Design', 'Behavioral'],
      typicalDuration: '2-4 weeks'
    },
    rejectRules: [
      { field: 'dsa', operator: 'lt', value: 3.5, message: 'DSA skills need improvement' },
      { field: 'projects', operator: 'lt', value: 3, message: 'More impactful projects needed' }
    ]
  },
  {
    id: 'meta',
    name: 'Meta',
    tier: 'tier1',
    requirements: {
      minDSA: 4.5,
      minFundamentals: 3.5,
      minProjects: 3,
      minExperience: 1.5,
      weights: { dsa: 0.45, fundamentals: 0.2, projects: 0.2, experience: 0.15 }
    },
    interviewPattern: {
      rounds: ['Recruiter Call', 'Technical Screen', 'Onsite (3-4 rounds)'],
      focusAreas: ['DSA', 'Coding Speed', 'System Design'],
      typicalDuration: '3-5 weeks'
    },
    rejectRules: [
      { field: 'dsa', operator: 'lt', value: 4, message: 'Meta requires very strong DSA' }
    ]
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    tier: 'tier2',
    requirements: {
      minDSA: 3.5,
      minFundamentals: 3.5,
      minProjects: 3,
      minExperience: 1.5,
      weights: { dsa: 0.35, fundamentals: 0.25, projects: 0.25, experience: 0.15 }
    },
    interviewPattern: {
      rounds: ['Machine Coding', 'Problem Solving', 'System Design', 'Hiring Manager'],
      focusAreas: ['DSA', 'Machine Coding', 'LLD', 'System Design'],
      typicalDuration: '2-3 weeks'
    },
    rejectRules: [
      { field: 'dsa', operator: 'lt', value: 3, message: 'DSA needs improvement for Flipkart' }
    ]
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    tier: 'tier2',
    requirements: {
      minDSA: 3.5,
      minFundamentals: 4,
      minProjects: 4,
      minExperience: 2,
      weights: { dsa: 0.25, fundamentals: 0.25, projects: 0.3, experience: 0.2 }
    },
    interviewPattern: {
      rounds: ['Values Interview', 'Technical 1', 'Technical 2', 'Manager Round'],
      focusAreas: ['Values Alignment', 'System Design', 'Problem Solving'],
      typicalDuration: '3-4 weeks'
    },
    rejectRules: [
      { field: 'projects', operator: 'lt', value: 3, message: 'Need stronger project portfolio' }
    ]
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    tier: 'tier2',
    requirements: {
      minDSA: 3,
      minFundamentals: 3.5,
      minProjects: 3.5,
      minExperience: 1.5,
      weights: { dsa: 0.3, fundamentals: 0.25, projects: 0.3, experience: 0.15 }
    },
    interviewPattern: {
      rounds: ['Technical Screen', 'Problem Solving', 'System Design', 'Culture Fit'],
      focusAreas: ['DSA', 'System Design', 'Fintech Domain'],
      typicalDuration: '2-3 weeks'
    },
    rejectRules: [
      { field: 'dsa', operator: 'lt', value: 2.5, message: 'DSA fundamentals needed' }
    ]
  },
  {
    id: 'tcs',
    name: 'TCS Digital',
    tier: 'tier3',
    requirements: {
      minDSA: 2.5,
      minFundamentals: 3,
      minProjects: 2,
      minExperience: 0.5,
      weights: { dsa: 0.3, fundamentals: 0.35, projects: 0.2, experience: 0.15 }
    },
    interviewPattern: {
      rounds: ['Aptitude Test', 'Technical Interview', 'HR Round'],
      focusAreas: ['CS Fundamentals', 'Basic DSA', 'Communication'],
      typicalDuration: '1-2 weeks'
    },
    rejectRules: [
      { field: 'fundamentals', operator: 'lt', value: 2, message: 'Basic CS knowledge required' }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    tier: 'tier3',
    requirements: {
      minDSA: 2,
      minFundamentals: 2.5,
      minProjects: 2,
      minExperience: 0,
      weights: { dsa: 0.25, fundamentals: 0.35, projects: 0.25, experience: 0.15 }
    },
    interviewPattern: {
      rounds: ['Online Assessment', 'Technical Interview', 'HR Round'],
      focusAreas: ['Aptitude', 'CS Fundamentals', 'Communication'],
      typicalDuration: '1-2 weeks'
    },
    rejectRules: []
  },
  {
    id: 'wipro',
    name: 'Wipro',
    tier: 'tier3',
    requirements: {
      minDSA: 2,
      minFundamentals: 2.5,
      minProjects: 1.5,
      minExperience: 0,
      weights: { dsa: 0.25, fundamentals: 0.35, projects: 0.25, experience: 0.15 }
    },
    interviewPattern: {
      rounds: ['Written Test', 'Technical Interview', 'HR Round'],
      focusAreas: ['Aptitude', 'Basic Programming', 'Communication'],
      typicalDuration: '1 week'
    },
    rejectRules: []
  }
];

export const companyTiers = {
  tier1: { label: 'Tier 1 (FAANG+)', color: 'primary' },
  tier2: { label: 'Tier 2 (Product)', color: 'warning' },
  tier3: { label: 'Tier 3 (Service)', color: 'success' }
};

export const roleOptions = [
  'Software Development Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Engineer',
  'ML Engineer',
  'Mobile Developer',
  'QA Engineer'
];
