import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { getServerSession } from 'next-auth';

import { Button } from './ui/button';
import React from 'react';

import MenuBar from './menu-bar';
import SignOutBtn from './signout-btn';
import Link from 'next/link';

const TopBar = async () => {
  const session = await getServerSession();
  return (
    <header className="bg-blue-50 flex justify-between py-2  shadow-md items-center">
      <div>Ben Geeks Next Js Template</div>
      <div className="flex justify-between items-center">
        <MenuBar />
        <div className="flex justify-between items-center border-l border-l-slate-200 mx-2">
          {session ? (
            <>
              <SignOutBtn />
              <Avatar>
                <AvatarImage src={session?.user?.image || ''} alt="@shadcn" />
                <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </>
          ) : (
            <Link href="/api/auth/signin">
              <Button variant="outline" className="mx-2">
                Log in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
