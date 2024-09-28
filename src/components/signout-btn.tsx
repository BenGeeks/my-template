'use client';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import React from 'react';

const SignOutBtn = () => {
  const { data: session, status } = useSession();

  console.log('SESSION DATA: ', session);

  return (
    <Button onClick={() => signOut()} className="mx-2" variant="outline">
      Sign out
    </Button>
  );
};

export default SignOutBtn;
