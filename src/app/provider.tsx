'use client';

import { queryConfig } from '@/lib/react-query';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import * as React from 'react';
import { Toaster } from '@/components/ui/toaster';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.DEV && <ReactQueryDevtools />}
      {/* <GoogleOAuthProvider
        clientId={process.env?.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
      > */}
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
      {/* </GoogleOAuthProvider> */}
    </QueryClientProvider>
  );
};
