import { AppProvider } from '@/app/provider';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LayoutProps } from '../../.next/types/app/layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'App View boost',
  description: 'App View boost',
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.className}>
      <head />
      <body className="">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
