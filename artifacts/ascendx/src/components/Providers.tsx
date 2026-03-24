'use client';

import { AuthProvider } from '@/context/AuthContext';
import { LenisProvider } from '@/components/LenisProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LenisProvider>{children}</LenisProvider>
    </AuthProvider>
  );
}
