'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { User, GraduationCap, Code, Briefcase, Target, RefreshCw } from "lucide-react";
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { OnboardingFormData, SkillScores, Project, Experience } from '@/lib/types';
import { demoProfile } from '@/lib/demo-data';
import { calculateAllScores } from '@/lib/scoring';

export default function ProfilePage() {
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

  if ((userLoading || (user && profileLoading)) && !profile) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="space-y-6">
        <header className="flex items-center gap-4">
          <User className="h-6 w-6" />
          <div>
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p className="text-muted-foreground">
              Manage your profile data and preferences.
            </p>
          </div>
        </header>
        <Card>
          <CardHeader>
            <CardTitle>No Profile Found</CardTitle>
            <CardDescription>We couldn't load your profile data.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Go through the onboarding process to create your profile.</p>
            <Link href="/onboarding">
              <Button>Go to Onboarding</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const {
    name,
    email,
    degree,
    branch,
    college,
    graduationYear,
    cgpa,
    dsaLevel,
    dsaProblems,
    osLevel,
    cnLevel,
    dbmsLevel,
    oopsLevel,
    projects,
    experiences,
    targetRoles,
    targetCompanies,
    timelineMonths,
    weeklyHours,
  } = profile;

  return (
    <div className="space-y-6">
       <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <User className="h-6 w-6" />
          <div>
            <h1 className="text-2xl font-bold">{name || 'Your Profile'}</h1>
            <p className="text-muted-foreground">
              {email || 'Manage your profile data and preferences.'}
            </p>
          </div>
        </div>
        <Link href="/onboarding">
          <Button variant="outline">Edit Profile / Re-take Form</Button>
        </Link>
      </header>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" /> Education
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <InfoRow label="Degree" value={`${degree} in ${branch}`} />
            <InfoRow label="College" value={college} />
            <InfoRow label="Graduation" value={`${graduationYear} (CGPA: ${cgpa}/10)`} />
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" /> Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <InfoRow label="Timeline" value={`${timelineMonths} months (${weeklyHours}h/week)`} />
            <InfoRow label="Target Roles" value={<div className="flex flex-wrap gap-1">{targetRoles.map(r => <Badge key={r} variant="secondary">{r}</Badge>)}</div>} />
            <InfoRow label="Target Companies" value={<div className="flex flex-wrap gap-1">{targetCompanies.map(c => <Badge key={c} variant="outline">{c}</Badge>)}</div>} />
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" /> Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Data Structures & Algorithms</h4>
              <InfoRow label="Self-assessed Level" value={<Badge>{dsaLevel}</Badge>} />
              <InfoRow label="Problems Solved" value={dsaProblems} />
            </div>
            <div>
              <h4 className="font-semibold mb-2">CS Fundamentals</h4>
              <InfoRow label="Operating Systems" value={<Badge variant="outline">{osLevel}</Badge>} />
              <InfoRow label="Computer Networks" value={<Badge variant="outline">{cnLevel}</Badge>} />
              <InfoRow label="Database Systems" value={<Badge variant="outline">{dbmsLevel}</Badge>} />
              <InfoRow label="OOPs Concepts" value={<Badge variant="outline">{oopsLevel}</Badge>} />
            </div>
          </CardContent>
        </Card>

        {/* Projects & Experience */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Projects & Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Projects ({projects.length})</h4>
              <div className="space-y-2">
                {projects.map((p, i) => <ProjectItem key={i} project={p} />)}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Experience ({experiences.length})</h4>
              <div className="space-y-2">
                {experiences.map((e, i) => <ExperienceItem key={i} experience={e} />)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


function InfoRow({ label, value }: { label: string, value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start">
      <p className="text-muted-foreground">{label}</p>
      <div className="text-right font-medium max-w-[60%]">{value}</div>
    </div>
  )
}

function ProjectItem({ project }: { project: Omit<Project, 'id'> }) {
  return (
    <div className="p-3 rounded-md border bg-secondary/50">
      <p className="font-semibold">{project.name}</p>
      <p className="text-xs text-muted-foreground mb-2">{project.description}</p>
      <div className="flex flex-wrap gap-1">
        {project.technologies.map(t => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
      </div>
    </div>
  )
}

function ExperienceItem({ experience }: { experience: Omit<Experience, 'id'> }) {
  return (
    <div className="p-3 rounded-md border bg-secondary/50">
      <p className="font-semibold">{experience.role} at {experience.company}</p>
      <p className="text-xs text-muted-foreground mb-2 capitalize">{experience.type} ({experience.duration} months)</p>
       <div className="flex flex-wrap gap-1">
        {experience.technologies.map(t => <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>)}
      </div>
    </div>
  )
}
