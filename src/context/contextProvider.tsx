'use client';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './themeProvider';

export function ContextProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
