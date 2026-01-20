import type { OnboardingFormData, SkillScores, FundamentalsScore, Company, CompanyMatch, SkillGap } from '@/lib/types';

// Convert skill level to numeric score (0-5)
const levelToScore: Record<string, number> = {
  none: 0,
  beginner: 1,
  basic: 1.5,
  intermediate: 2.5,
  advanced: 4,
  expert: 5
};

// Calculate DSA score based on level and problems solved
export function calculateDSAScore(level: string, problemsSolved: number): number {
  const baseScore = levelToScore[level] || 0;
  
  // Bonus for problems solved
  let problemBonus = 0;
  if (problemsSolved >= 500) problemBonus = 1;
  else if (problemsSolved >= 300) problemBonus = 0.75;
  else if (problemsSolved >= 150) problemBonus = 0.5;
  else if (problemsSolved >= 50) problemBonus = 0.25;
  
  return Math.min(5, baseScore + problemBonus);
}

// Calculate fundamentals score
export function calculateFundamentalsScore(
  os: string,
  cn: string,
  dbms: string,
  oops: string
): FundamentalsScore {
  const scores = {
    os: levelToScore[os] || 0,
    cn: levelToScore[cn] || 0,
    dbms: levelToScore[dbms] || 0,
    oops: levelToScore[oops] || 0,
    average: 0
  };
  
  scores.average = (scores.os + scores.cn + scores.dbms + scores.oops) / 4;
  return scores;
}

// Calculate projects score
export function calculateProjectsScore(projects: OnboardingFormData['projects']): number {
  if (projects.length === 0) return 0;
  
  let totalScore = 0;
  
  for (const project of projects) {
    let projectScore = 0;
    
    // Complexity score
    if (project.complexity === 'basic') projectScore += 1;
    else if (project.complexity === 'intermediate') projectScore += 2;
    else if (project.complexity === 'advanced') projectScore += 3;
    
    // Tech stack bonus
    if (project.technologies.length >= 4) projectScore += 0.5;
    
    // Deployment bonus
    if (project.hasDeployment) projectScore += 0.5;
    if (project.hasGithub) projectScore += 0.25;
    
    totalScore += projectScore;
  }
  
  // Normalize to 0-5 scale
  const avgScore = totalScore / projects.length;
  return Math.min(5, avgScore);
}

// Calculate experience score
export function calculateExperienceScore(experiences: OnboardingFormData['experiences']): number {
  if (experiences.length === 0) return 0;
  
  let totalMonths = 0;
  let qualityMultiplier = 1;
  
  for (const exp of experiences) {
    totalMonths += exp.duration;
    
    // Quality bonus based on type
    if (exp.type === 'fulltime') qualityMultiplier = Math.max(qualityMultiplier, 1.5);
    else if (exp.type === 'internship') qualityMultiplier = Math.max(qualityMultiplier, 1.2);
  }
  
  // Base score from months (max at 24 months = 5)
  let score = Math.min(5, (totalMonths / 24) * 5 * qualityMultiplier);
  return Math.round(score * 10) / 10;
}

// Calculate overall score
export function calculateOverallScore(skills: Omit<SkillScores, 'overall'>): number {
  const weights = {
    dsa: 0.35,
    fundamentals: 0.25,
    projects: 0.25,
    experience: 0.15
  };
  
  const score = 
    skills.dsa * weights.dsa +
    skills.fundamentals.average * weights.fundamentals +
    skills.projects * weights.projects +
    skills.experience * weights.experience;
    
  return Math.round(score * 10) / 10;
}

// Full skill calculation from form data
export function calculateAllScores(formData: OnboardingFormData): SkillScores {
  const dsa = calculateDSAScore(formData.dsaLevel, formData.dsaProblems);
  const fundamentals = calculateFundamentalsScore(
    formData.osLevel,
    formData.cnLevel,
    formData.dbmsLevel,
    formData.oopsLevel
  );
  const projects = calculateProjectsScore(formData.projects);
  const experience = calculateExperienceScore(formData.experiences);
  
  const partialScores = { dsa, fundamentals, projects, experience };
  const overall = calculateOverallScore(partialScores);
  
  return { ...partialScores, overall };
}

// Check reject rules for a company
function checkRejectRules(company: Company, skills: SkillScores): string | null {
  for (const rule of company.rejectRules) {
    let fieldValue: number;
    
    if (rule.field === 'fundamentals') {
      fieldValue = skills.fundamentals.average;
    } else {
      fieldValue = skills[rule.field as keyof Omit<SkillScores, 'overall' | 'fundamentals'>] as number;
    }
    
    switch (rule.operator) {
      case 'lt':
        if (fieldValue < rule.value) return rule.message;
        break;
      case 'gt':
        if (fieldValue > rule.value) return rule.message;
        break;
      case 'eq':
        if (fieldValue === rule.value) return rule.message;
        break;
      case 'ne':
        if (fieldValue !== rule.value) return rule.message;
        break;
    }
  }
  return null;
}

// Calculate fit score for a company
function calculateFitScore(company: Company, skills: SkillScores): number {
  const { weights } = company.requirements;
  
  // Calculate weighted score
  const score = 
    (skills.dsa / 5) * weights.dsa +
    (skills.fundamentals.average / 5) * weights.fundamentals +
    (skills.projects / 5) * weights.projects +
    (skills.experience / 5) * weights.experience;
    
  return Math.round(score * 100);
}

// Calculate skill gaps
function calculateGaps(company: Company, skills: SkillScores): SkillGap[] {
  const gaps: SkillGap[] = [];
  const req = company.requirements;
  
  const checkGap = (skill: string, current: number, required: number, weight: number) => {
    if (current < required) {
      const gapSize = required - current;
      gaps.push({
        skill,
        current: Math.round(current * 10) / 10,
        required,
        gap: Math.round(gapSize * 10) / 10,
        priority: weight >= 0.3 ? 'high' : weight >= 0.2 ? 'medium' : 'low'
      });
    }
  };
  
  checkGap('DSA', skills.dsa, req.minDSA, req.weights.dsa);
  checkGap('CS Fundamentals', skills.fundamentals.average, req.minFundamentals, req.weights.fundamentals);
  checkGap('Projects', skills.projects, req.minProjects, req.weights.projects);
  checkGap('Experience', skills.experience, req.minExperience, req.weights.experience);
  
  return gaps.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

// Estimate preparation time in weeks
function estimatePrepTime(gaps: SkillGap[]): number {
  let totalWeeks = 0;
  
  for (const gap of gaps) {
    // Rough estimate: 2 weeks per 0.5 gap for DSA, 1 week for others
    if (gap.skill === 'DSA') {
      totalWeeks += Math.ceil(gap.gap * 4);
    } else if (gap.skill === 'CS Fundamentals') {
      totalWeeks += Math.ceil(gap.gap * 2);
    } else if (gap.skill === 'Projects') {
      totalWeeks += Math.ceil(gap.gap * 3); // Projects take time
    } else {
      totalWeeks += Math.ceil(gap.gap); // Experience is harder to accelerate
    }
  }
  
  return totalWeeks;
}

// Main matching function
export function matchUserToCompany(company: Company, skills: SkillScores): CompanyMatch {
  const rejectReason = checkRejectRules(company, skills);
  const gaps = calculateGaps(company, skills);
  const fitScore = calculateFitScore(company, skills);
  const prepTime = estimatePrepTime(gaps);
  
  let status: CompanyMatch['status'];
  
  if (rejectReason || fitScore < 50) {
    status = 'avoid';
  } else if (fitScore >= 75 && gaps.length <= 1) {
    status = 'recommended';
  } else {
    status = 'prepare';
  }
  
  return {
    company,
    fitScore,
    status,
    gaps,
    prepTime
  };
}

// Match user against all companies
export function matchAllCompanies(companies: Company[], skills: SkillScores): CompanyMatch[] {
  return companies
    .map(company => matchUserToCompany(company, skills))
    .sort((a, b) => b.fitScore - a.fitScore);
}
