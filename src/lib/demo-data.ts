import type { OnboardingFormData } from "./types";

// Demo data for when no profile exists
export const demoProfile: OnboardingFormData = {
    name: 'Demo User',
    email: 'demo@example.com',
    degree: 'btech',
    branch: 'cse',
    college: 'Demo Institute',
    graduationYear: 2025,
    cgpa: 8.2,
    dsaLevel: 'intermediate',
    dsaProblems: 180,
    osLevel: 'intermediate',
    cnLevel: 'basic',
    dbmsLevel: 'intermediate',
    oopsLevel: 'advanced',
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Full stack MERN application',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
        complexity: 'intermediate',
        hasDeployment: true,
        hasGithub: true
      },
      {
        name: 'Chat Application',
        description: 'Real-time chat with Socket.io',
        technologies: ['React', 'Socket.io', 'Node.js'],
        complexity: 'intermediate',
        hasDeployment: false,
        hasGithub: true
      }
    ],
    experiences: [
      {
        type: 'internship',
        company: 'Tech Startup',
        role: 'SDE Intern',
        duration: 3,
        technologies: ['React', 'TypeScript', 'AWS']
      }
    ],
    targetRoles: ['Software Development Engineer', 'Full Stack Developer'],
    targetCompanies: ['Google', 'Microsoft', 'Amazon'],
    timelineMonths: 4,
    weeklyHours: 20
  };
  
