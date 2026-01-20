'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { StatsGrid } from '@/components/dashboard/stats-grid';
import { SkillRadar } from '@/components/dashboard/skill-radar';
import { CompanyCard } from '@/components/dashboard/company-card';
import { RoadmapCard } from '@/components/dashboard/roadmap-card';
import { WhatNotToDo } from '@/components/dashboard/what-not-to-do';
import { Button } from '@/components/ui/button';
import {
  SkillScores,
  CompanyMatch,
  Roadmap,
  OnboardingFormData,
} from '@/lib/types';
import { companies } from '@/lib/companies';
import { matchAllCompanies, calculateAllScores } from '@/lib/scoring';
import { generateRoadmap } from '@/lib/roadmap';
import { RefreshCw } from 'lucide-react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { demoProfile } from '@/lib/demo-data';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const [localProfile, setLocalProfile] = useState<OnboardingFormData | null>(null);

  const userProfileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: firestoreProfile, isLoading: profileLoading } =
    useDoc<OnboardingFormData & { skills: SkillScores }>(userProfileRef);

  useEffect(() => {
    // On client, for demo mode, try to load profile from localStorage.
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
    // Priority 1: Live data from Firestore for logged-in users.
    if (firestoreProfile) return firestoreProfile;

    // Priority 2 (Demo Mode): Data from localStorage if available.
    // Priority 3 (Demo Mode): Fallback to hardcoded demo data.
    if (!user && !userLoading) {
      const sourceProfile = localProfile || demoProfile;
      const skills = calculateAllScores(sourceProfile);
      return { ...sourceProfile, skills, name: sourceProfile.name || 'Guest User' };
    }

    return null;
  }, [firestoreProfile, user, userLoading, localProfile]);

  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    // Only redirect to onboarding if a user is logged in but has no profile.
    if (!userLoading && !profileLoading && user && !firestoreProfile) {
      router.push('/onboarding');
    }
  }, [user, userLoading, firestoreProfile, profileLoading, router]);

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

  const matches = useMemo(() => {
    if (!skills) return [];
    return matchAllCompanies(companies, skills);
  }, [skills]);

  const negativeAdvices = useMemo(() => {
    if (!matches.length) return [];
    const advices: { type: 'company' | 'skill' | 'approach'; title: string; reason: string }[] = [];
    const avoidCompanies = matches
      .filter((m) => m.status === 'avoid')
      .slice(0, 2);
    avoidCompanies.forEach((m) => {
      advices.push({
        type: 'company' as const,
        title: `Don't apply to ${m.company.name} yet`,
        reason: `${
          m.gaps[0]?.skill || 'Multiple skills'
        } needs significant improvement. Focus on fundamentals first.`,
      });
    });
    if (roadmap?.excludedTopics) {
      roadmap.excludedTopics.slice(0, 2).forEach((topic) => {
        advices.push({
          type: 'skill' as const,
          title: `Skip ${topic}`,
          reason:
            'Low ROI for your timeline. Focus on core interview topics instead.',
        });
      });
    }
    if (skills && skills.dsa < 3 && skills.fundamentals.average < 3) {
      advices.push({
        type: 'approach' as const,
        title: "Don't jump to system design",
        reason:
          'Master DSA and CS fundamentals first. System design comes later.',
      });
    }
    return advices;
  }, [matches, roadmap, skills]);

  if ((userLoading || (user && profileLoading)) && !profile) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (!profile || !skills) {
     return (
        <div className="flex flex-col gap-4 items-center justify-center h-[calc(100vh-12rem)]">
            <p className="text-muted-foreground">Could not load profile data.</p>
            <Button onClick={() => router.push('/login')}>Go to Sign In</Button>
        </div>
     );
  }

  const estimatedPrepWeeks = Math.max(...matches.map((m) => m.prepTime), 4);

  return (
    <div className="space-y-8">
       <header>
          <div>
            <h1 className="text-xl font-semibold">{`Welcome back, ${profile.name?.split(' ')[0] || 'there'}!`}</h1>
            <p className="text-sm text-muted-foreground">Here's your placement readiness overview</p>
          </div>
      </header>

      <StatsGrid
        skills={skills}
        matches={matches}
        timelineWeeks={estimatedPrepWeeks}
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <SkillRadar skills={skills} />
        <WhatNotToDo advices={negativeAdvices} />
        {roadmap && roadmap.weeks.length > 0 && (
          <RoadmapCard week={roadmap.weeks[0]} onTaskToggle={handleTaskToggle} />
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Company Matches</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.slice(0, 6).map((match) => (
            <CompanyCard key={match.company.id} match={match} />
          ))}
        </div>
        {matches.length > 6 && (
          <div className="text-center mt-4">
            <Button variant="outline" onClick={() => router.push('/dashboard/companies')}>
              View All {matches.length} Companies
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
