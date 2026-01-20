'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useFirebaseApp } from '@/firebase';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const app = useFirebaseApp();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    if (!app) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Firebase is not initialized. Please try again later.',
      });
      setIsLoading(false);
      return;
    }
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      toast({
        title: 'Success',
        description: 'You have been signed in successfully.',
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign-in Failed',
        description: error.message || 'An unknown error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="glass" className="w-full max-w-sm shadow-elevated">
      <CardHeader className="text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Compass className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">PlacementPro</span>
        </div>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Sign in to access your dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="hero"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in with Google'}
        </Button>
      </CardContent>
    </Card>
  );
}
