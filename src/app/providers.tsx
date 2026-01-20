'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseClientProvider>{children}</FirebaseClientProvider>
    </QueryClientProvider>
  );
}
