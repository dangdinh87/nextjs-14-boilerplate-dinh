'use client';

import { ModeToggle } from '@/components/app/toggle-dark-mode';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { envConfig } from '@/configs';
import userStore, { User } from '@/stores/user';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function Header() {
  const { logout, getMe, user } = userStore();
  const router = useRouter();

  const handleLogin = () => {
    const redirectUrl = window.location.href;
    window.open(`http://localhost:3001/?redirectUrl=http://localhost:3000/`);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const code = useSearchParams()?.get('code') || '';

  useEffect(() => {
    if (code) {
      localStorage.setItem('code', code);
      localStorage.setItem('forceLogin', JSON.stringify(true));
      window.close();
    }
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     getMe();
  //   } else {
  //     router.push('/login');
  //   }
  // }, []);

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'forceLogin' && event.newValue === 'true') {
        localStorage.removeItem('forceLogin');
        const code = localStorage.getItem('code');

        alert(code);
        console.log(code);
      }
    });
  }, []);

  return (
    <header className="flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6 ">
      <div className="flex-1">
        <Link href="/" className="flex items-center font-semibold">
          <span className="">{envConfig.NEXT_PUBLIC_APP_NAME}</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
      {!user ? (
        <Button onClick={handleLogin}>Đăng nhập</Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                {/* <AvatarImage src={user.avatarURL} className="rounded-full" /> */}
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleLogout}>
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
