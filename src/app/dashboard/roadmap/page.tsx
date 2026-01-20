'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  OnboardingFormData,
  SkillScores,
  Roadmap,
  RoadmapTask,
} from '@/lib/types';
import { companies } from '@/lib/companies';
import { matchAllCompanies, calculateAllScores } from '@/lib/scoring';
import { generateRoadmap } from '@/lib/roadmap';
import { RefreshCw, Map, Clock, BookOpen } from 'lucide-react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { demoProfile } from '@/lib/demo-data';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function RoadmapPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const [localProfile, setLocalProfile] = useState<OnboardingFormData | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: firestoreProfile, isLoading: profileLoading } =
    useDoc<OnboardingFormData & { skills: SkillScores }>(userProfileRef);

  useEffect(() => {
    if (typeof window !== 'undefined' && !user && !userLoading) {
      const savedData = localStorage.getItem('onboardingData');
      if (savedData) {
        try {
          setLocalProfile(JSON.parse(savedData));
        } catch (e) {
          console.error('Failed to parse profile from localStorage', e);
          localStorage.removeItem('onboardingData');
        }
      }
    }
  }, [user, userLoading]);

  const profile = useMemo(() => {
    if (firestoreProfile) return firestoreProfile;
    if (!user && !userLoading) {
      const sourceProfile = localProfile || demoProfile;
      const skills = calculateAllScores(sourceProfile);
      return { ...sourceProfile, skills, name: sourceProfile.name || 'Guest User' };
    }
    return null;
  }, [firestoreProfile, user, userLoading, localProfile]);

  const skills = profile?.skills;

  useEffect(() => {
    if (skills && profile) {
      const companyMatches = matchAllCompanies(companies, skills);
      const allGaps = companyMatches
        .filter((m) => m.status !== 'recommended')
        .flatMap((m) => m.gaps);
      const uniqueGaps = allGaps.filter(
        (gap, idx, arr) => arr.findIndex((g) => g.skill === gap.skill) === idx
      );
      const timelineWeeks = (profile?.timelineMonths || 4) * 4;
      const weeklyHours = profile?.weeklyHours || 20;
      const generatedRoadmap = generateRoadmap(
        skills,
        uniqueGaps,
        timelineWeeks,
        weeklyHours
      );
      setRoadmap(generatedRoadmap);
    }
  }, [skills, profile]);

  const handleTaskToggle = (taskId: string) => {
    if (!roadmap) return;
    setRoadmap((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        weeks: prev.weeks.map((week) => ({
          ...week,
          tasks: week.tasks.map((task) =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
          ),
        })),
      };
    });
  };

  if ((userLoading || (user && profileLoading)) && !roadmap) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="space-y-6">
        <header className="flex items-center gap-4">
          <Map className="h-6 w-6" />
          <div>
            <h1 className="text-2xl font-bold">Your Roadmap</h1>
            <p className="text-muted-foreground">
              Your full week-by-week preparation plan.
            </p>
          </div>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>No Roadmap Found</CardTitle>
            <CardDescription>Could not generate a roadmap. Please ensure your profile is complete.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Go to your profile to make sure all information is filled out correctly.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        <Map className="h-6 w-6" />
        <div>
          <h1 className="text-2xl font-bold">Your Personalized Roadmap</h1>
          <p className="text-muted-foreground">
            A {roadmap.totalWeeks}-week plan to get you placement-ready.
          </p>
        </div>
      </header>
      
      <Accordion type="single" collapsible defaultValue="item-0" className="w-full space-y-4">
        {roadmap.weeks.map((week, index) => {
          const completedTasks = week.tasks.filter(t => t.isCompleted).length;
          const progress = (completedTasks / week.tasks.length) * 100;
          
          return (
            <AccordionItem value={`item-${index}`} key={week.weekNumber} className="border-b-0">
              <Card variant="gradient">
                <AccordionTrigger className="p-6 hover:no-underline">
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge variant="outline">Week {week.weekNumber}</Badge>
                        <h3 className="text-lg font-semibold mt-2">{week.theme}</h3>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{completedTasks}/{week.tasks.length} tasks</p>
                        <p className="text-xs text-muted-foreground">{week.estimatedHours} hours</p>
                      </div>
                    </div>
                    <Progress value={progress} size="sm" indicatorColor="primary" className="mt-3" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-3">
                    {week.tasks.map(task => (
                      <TaskItem key={task.id} task={task} onToggle={() => handleTaskToggle(task.id)} />
                    ))}
                  </div>
                </AccordionContent>
              </Card>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  );
}


const priorityConfig = {
  high: { variant: 'destructive' as const, label: 'High Priority' },
  medium: { variant: 'warning' as const, label: 'Medium' },
  low: { variant: 'secondary' as const, label: 'Low' }
};

interface TaskItemProps {
  task: RoadmapTask;
  onToggle: () => void;
}

function TaskItem({ task, onToggle }: TaskItemProps) {
  const priority = priorityConfig[task.priority];

  return (
    <div 
      className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
        task.isCompleted 
          ? 'bg-muted/50 border-border/50 opacity-60' 
          : 'bg-card border-border hover:border-primary/50'
      }`}
    >
      <Checkbox 
        checked={task.isCompleted}
        onCheckedChange={onToggle}
        className="mt-0.5"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-medium ${task.isCompleted ? 'line-through' : ''}`}>
            {task.title}
          </span>
          <Badge variant={priority.variant} className="text-[10px]">
            {priority.label}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{task.description}</p>
        
        {task.resources.length > 0 && !task.isCompleted && (
          <div className="flex flex-wrap gap-1 mt-2">
            {task.resources.slice(0, 3).map((resource, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-[10px] font-normal cursor-pointer hover:bg-secondary"
              >
                <BookOpen className="h-2.5 w-2.5 mr-1" />
                {resource}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        {task.estimatedHours}h
      </div>
    </div>
  );
}
