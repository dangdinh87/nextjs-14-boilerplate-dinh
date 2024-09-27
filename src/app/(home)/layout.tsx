'use client';
import { Header } from '@/components/app/header';
import useStore from '@/stores/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-[1140px] mx-auto flex flex-1 mt-10 gap-2">
          <p className="text-2xl font-bold text-center">Danh sách các Page</p>
          {children}
        </div>
      </main>
    </div>
  );
}
