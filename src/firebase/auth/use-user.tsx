'use client';

import { useContext } from 'react';
import { FirebaseContext, UserHookResult } from '@/firebase/provider';

export const useUser = (): UserHookResult => {
  const context = useContext(FirebaseContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a FirebaseProvider.');
  }

  return {
    user: context.user,
    loading: context.isUserLoading,
    error: context.userError,
  };
};
