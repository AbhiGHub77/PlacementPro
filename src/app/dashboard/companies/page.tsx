'use client';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, RefreshCw } from 'lucide-react';

import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { OnboardingFormData, SkillScores, CompanyMatch } from '@/lib/types';
import { demoProfile } from '@/lib/demo-data';
import { calculateAllScores, matchAllCompanies } from '@/lib/scoring';
import { companies } from '@/lib/companies';
import { CompanyCard } from '@/components/dashboard/company-card';

export default function CompaniesPage() {
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

  const skills = profile?.skills;

  const allMatches = useMemo(() => {
    if (!skills) return [];
    return matchAllCompanies(companies, skills);
  }, [skills]);

  const recommendedMatches = useMemo(() => allMatches.filter(m => m.status === 'recommended'), [allMatches]);
  const prepareMatches = useMemo(() => allMatches.filter(m => m.status === 'prepare'), [allMatches]);
  const avoidMatches = useMemo(() => allMatches.filter(m => m.status === 'avoid'), [allMatches]);

  if ((userLoading || (user && profileLoading)) && !profile) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        <Building2 className="h-6 w-6" />
        <div>
          <h1 className="text-2xl font-bold">Company Matches</h1>
          <p className="text-muted-foreground">
            A detailed breakdown of your fit with all companies.
          </p>
        </div>
      </header>

      <Card>
        <CardContent className="p-4 sm:p-6">
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="all">All ({allMatches.length})</TabsTrigger>
              <TabsTrigger value="recommended">Apply Now ({recommendedMatches.length})</TabsTrigger>
              <TabsTrigger value="prepare">Prepare ({prepareMatches.length})</TabsTrigger>
              <TabsTrigger value="avoid">Avoid ({avoidMatches.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <CompanyGrid matches={allMatches} />
            </TabsContent>
            <TabsContent value="recommended">
              <CompanyGrid matches={recommendedMatches} />
            </TabsContent>
            <TabsContent value="prepare">
              <CompanyGrid matches={prepareMatches} />
            </TabsContent>
            <TabsContent value="avoid">
              <CompanyGrid matches={avoidMatches} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function CompanyGrid({ matches }: { matches: CompanyMatch[] }) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No companies in this category.</p>
      </div>
    );
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {matches.map((match) => (
        <CompanyCard key={match.company.id} match={match} />
      ))}
    </div>
  );
}
