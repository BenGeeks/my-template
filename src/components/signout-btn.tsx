'use client';
import { signOut } from 'next-auth/react';
import { Button } from './ui/button';
import React from 'react';

const SignOutBtn = () => {
  return (
    <Button onClick={() => signOut()} className="mx-2" variant="outline">
      Sign out
    </Button>
  );
};

export default SignOutBtn;
