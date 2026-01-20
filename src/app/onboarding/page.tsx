'use client';
import { OnboardingForm } from '@/components/onboarding/onboarding-form';
import { calculateAllScores } from '@/lib/scoring';
import type { OnboardingFormData } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();

  const handleComplete = async (data: OnboardingFormData) => {
    // If a user is logged in, save to Firestore as before.
    if (user && firestore) {
      try {
        const skills = calculateAllScores(data);
        const profile = {
          ...data,
          skills,
          id: user.uid,
          createdAt: new Date().toISOString(),
        };

        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, profile, { merge: true });

        toast({
          title: 'Profile Saved',
          description: 'Your profile has been created successfully.',
        });
        router.push('/dashboard');
      } catch (error) {
        console.error('Error saving profile:', error);
        toast({
          variant: 'destructive',
          title: 'Save Failed',
          description: 'Could not save your profile. Please try again.',
        });
      }
    } else {
      // If no user, we are in demo mode. Save to localStorage.
      try {
        localStorage.setItem('onboardingData', JSON.stringify(data));
        toast({
          title: 'Demo Profile Updated',
          description: 'Your dashboard will now reflect the new data.',
        });
        router.push('/dashboard');
      } catch (error) {
        console.error('Error saving to localStorage:', error);
        toast({
          variant: 'destructive',
          title: 'Save Failed',
          description: 'Could not save your demo profile.',
        });
      }
    }
  };

  if (userLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <OnboardingForm onComplete={handleComplete} />;
}
