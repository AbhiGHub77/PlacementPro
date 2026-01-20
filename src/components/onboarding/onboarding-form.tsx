'use client';
import { useState } from 'react';
import type { OnboardingFormData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  GraduationCap, 
  Code, 
  Briefcase, 
  Target,
  ChevronRight,
  ChevronLeft,
  Check,
  Plus,
  X
} from 'lucide-react';
import { roleOptions } from '@/lib/companies';

interface OnboardingFormProps {
  onComplete: (data: OnboardingFormData) => void;
}

const steps = [
  { id: 1, title: 'Basic Info', icon: User },
  { id: 2, title: 'Education', icon: GraduationCap },
  { id: 3, title: 'Skills', icon: Code },
  { id: 4, title: 'Experience', icon: Briefcase },
  { id: 5, title: 'Goals', icon: Target },
];

const defaultFormData: OnboardingFormData = {
  name: '',
  email: '',
  degree: '',
  branch: '',
  college: '',
  graduationYear: new Date().getFullYear() + 1,
  cgpa: 0,
  dsaLevel: 'beginner',
  dsaProblems: 0,
  osLevel: 'none',
  cnLevel: 'none',
  dbmsLevel: 'none',
  oopsLevel: 'none',
  projects: [],
  experiences: [],
  targetRoles: [],
  targetCompanies: [],
  timelineMonths: 6,
  weeklyHours: 20,
};

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingFormData>(defaultFormData);

  const updateField = <K extends keyof OnboardingFormData>(
    field: K, 
    value: OnboardingFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const progress = (currentStep / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
      
      <div className="w-full max-w-2xl relative z-10">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                    currentStep > step.id 
                      ? 'bg-primary border-primary text-primary-foreground'
                      : currentStep === step.id
                      ? 'border-primary text-primary'
                      : 'border-muted text-muted-foreground'
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <div 
                    className={`h-0.5 w-12 mx-2 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} indicatorColor="gradient" size="sm" />
        </div>

        {/* Form Card */}
        <Card variant="glass" className="shadow-elevated">
          <CardHeader>
            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              Step {currentStep} of {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <BasicInfoStep formData={formData} updateField={updateField} />
            )}
            {currentStep === 2 && (
              <EducationStep formData={formData} updateField={updateField} />
            )}
            {currentStep === 3 && (
              <SkillsStep formData={formData} updateField={updateField} />
            )}
            {currentStep === 4 && (
              <ExperienceStep formData={formData} updateField={updateField} />
            )}
            {currentStep === 5 && (
              <GoalsStep formData={formData} updateField={updateField} />
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button variant="hero" onClick={nextStep}>
                {currentStep === steps.length ? 'Complete' : 'Continue'}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Step Components
interface StepProps {
  formData: OnboardingFormData;
  updateField: <K extends keyof OnboardingFormData>(field: K, value: OnboardingFormData[K]) => void;
}

function BasicInfoStep({ formData, updateField }: StepProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={e => updateField('name', e.target.value)}
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => updateField('email', e.target.value)}
          placeholder="john@example.com"
        />
      </div>
    </div>
  );
}

function EducationStep({ formData, updateField }: StepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Degree</Label>
          <Select value={formData.degree} onValueChange={v => updateField('degree', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="btech">B.Tech</SelectItem>
              <SelectItem value="be">B.E.</SelectItem>
              <SelectItem value="bsc">B.Sc CS</SelectItem>
              <SelectItem value="mtech">M.Tech</SelectItem>
              <SelectItem value="mca">MCA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Branch</Label>
          <Select value={formData.branch} onValueChange={v => updateField('branch', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cse">Computer Science</SelectItem>
              <SelectItem value="it">Information Technology</SelectItem>
              <SelectItem value="ece">Electronics & Comm.</SelectItem>
              <SelectItem value="ee">Electrical</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="college">College Name</Label>
        <Input
          id="college"
          value={formData.college}
          onChange={e => updateField('college', e.target.value)}
          placeholder="IIT Bombay"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Graduation Year</Label>
          <Input
            id="year"
            type="number"
            value={formData.graduationYear}
            onChange={e => updateField('graduationYear', parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cgpa">CGPA</Label>
          <Input
            id="cgpa"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={formData.cgpa || ''}
            onChange={e => updateField('cgpa', parseFloat(e.target.value))}
            placeholder="8.5"
          />
        </div>
      </div>
    </div>
  );
}

function SkillsStep({ formData, updateField }: StepProps) {
  const levelOptions = [
    { value: 'none', label: 'None' },
    { value: 'basic', label: 'Basic' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const dsaLevelOptions = [
    { value: 'beginner', label: 'Beginner (< 50 problems)' },
    { value: 'intermediate', label: 'Intermediate (50-200 problems)' },
    { value: 'advanced', label: 'Advanced (200-500 problems)' },
    { value: 'expert', label: 'Expert (500+ problems)' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-base font-semibold">Data Structures & Algorithms</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Level</Label>
            <Select 
              value={formData.dsaLevel} 
              onValueChange={v => updateField('dsaLevel', v as OnboardingFormData['dsaLevel'])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dsaLevelOptions.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Problems Solved</Label>
            <Input
              type="number"
              min="0"
              value={formData.dsaProblems || ''}
              onChange={e => updateField('dsaProblems', parseInt(e.target.value) || 0)}
              placeholder="150"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-semibold">CS Fundamentals</Label>
        <div className="grid grid-cols-2 gap-4">
          {[
            { key: 'osLevel', label: 'Operating Systems' },
            { key: 'cnLevel', label: 'Computer Networks' },
            { key: 'dbmsLevel', label: 'Database Systems' },
            { key: 'oopsLevel', label: 'OOPs Concepts' },
          ].map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <Label className="text-sm text-muted-foreground">{label}</Label>
              <Select 
                value={formData[key as keyof OnboardingFormData] as string} 
                onValueChange={v => updateField(key as keyof OnboardingFormData, v as any)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {levelOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceStep({ formData, updateField }: StepProps) {
  const [newProject, setNewProject] = useState<{
    name: string;
    description: string;
    technologies: string[];
    complexity: 'basic' | 'intermediate' | 'advanced';
    hasDeployment: boolean;
    hasGithub: boolean;
  }>({
    name: '',
    description: '',
    technologies: [],
    complexity: 'intermediate',
    hasDeployment: false,
    hasGithub: true
  });
  const [techInput, setTechInput] = useState('');

  const addProject = () => {
    if (newProject.name) {
      updateField('projects', [...formData.projects, newProject]);
      setNewProject({
        name: '',
        description: '',
        technologies: [],
        complexity: 'intermediate',
        hasDeployment: false,
        hasGithub: true
      });
    }
  };

  const removeProject = (idx: number) => {
    updateField('projects', formData.projects.filter((_, i) => i !== idx));
  };

  const addTech = () => {
    if (techInput && !newProject.technologies.includes(techInput)) {
      setNewProject(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput]
      }));
      setTechInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">Projects ({formData.projects.length})</Label>
        
        {/* Existing Projects */}
        <div className="space-y-2 mb-4">
          {formData.projects.map((project, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-between p-3 rounded-lg bg-secondary"
            >
              <div>
                <p className="font-medium">{project.name}</p>
                <div className="flex gap-1 mt-1">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <Badge key={i} variant="outline" className="text-[10px]">{tech}</Badge>
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeProject(idx)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Add New Project */}
        <div className="space-y-3 p-4 rounded-lg border border-dashed border-border">
          <Input
            placeholder="Project name"
            value={newProject.name}
            onChange={e => setNewProject(prev => ({ ...prev, name: e.target.value }))}
          />
          <Input
            placeholder="Short description"
            value={newProject.description}
            onChange={e => setNewProject(prev => ({ ...prev, description: e.target.value }))}
          />
          <div className="flex gap-2">
            <Input
              placeholder="Add technology (React, Node.js...)"
              value={techInput}
              onChange={e => setTechInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTech())}
            />
            <Button variant="outline" onClick={addTech}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {newProject.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {newProject.technologies.map((tech, i) => (
                <Badge key={i} variant="secondary">{tech}</Badge>
              ))}
            </div>
          )}
          <Select 
            value={newProject.complexity} 
            onValueChange={v => setNewProject(prev => ({ 
              ...prev, 
              complexity: v as 'basic' | 'intermediate' | 'advanced' 
            }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Complexity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary" className="w-full" onClick={addProject}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>
    </div>
  );
}

function GoalsStep({ formData, updateField }: StepProps) {
  const [customCompany, setCustomCompany] = useState('');
  
  const toggleRole = (role: string) => {
    if (formData.targetRoles.includes(role)) {
      updateField('targetRoles', formData.targetRoles.filter(r => r !== role));
    } else {
      updateField('targetRoles', [...formData.targetRoles, role]);
    }
  };

  const addCompany = () => {
    if (customCompany && !formData.targetCompanies.includes(customCompany)) {
      updateField('targetCompanies', [...formData.targetCompanies, customCompany]);
      setCustomCompany('');
    }
  };

  const removeCompany = (company: string) => {
    updateField('targetCompanies', formData.targetCompanies.filter(c => c !== company));
  };

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-3 block">Target Roles</Label>
        <div className="flex flex-wrap gap-2">
          {roleOptions.map(role => (
            <Badge
              key={role}
              variant={formData.targetRoles.includes(role) ? 'default' : 'outline'}
              className="cursor-pointer transition-all hover:scale-105"
              onClick={() => toggleRole(role)}
            >
              {formData.targetRoles.includes(role) && <Check className="h-3 w-3 mr-1" />}
              {role}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Target Companies</Label>
        <div className="flex gap-2 mb-3">
          <Input
            placeholder="Add company name"
            value={customCompany}
            onChange={e => setCustomCompany(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCompany())}
          />
          <Button variant="outline" onClick={addCompany}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.targetCompanies.map(company => (
            <Badge key={company} variant="secondary" className="gap-1">
              {company}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => removeCompany(company)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Timeline (months)</Label>
          <Select 
            value={formData.timelineMonths.toString()} 
            onValueChange={v => updateField('timelineMonths', parseInt(v))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 6, 9, 12].map(m => (
                <SelectItem key={m} value={m.toString()}>{m} month{m > 1 ? 's' : ''}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Weekly Hours Available</Label>
          <Select 
            value={formData.weeklyHours.toString()} 
            onValueChange={v => updateField('weeklyHours', parseInt(v))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20, 30, 40].map(h => (
                <SelectItem key={h} value={h.toString()}>{h} hours</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
