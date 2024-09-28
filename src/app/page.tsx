'use client';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  console.log('JWT Token:', session);
  return (
    <>
      <h1 className="text-center text-green-400 font-semibold">I am groot</h1>
    </>
  );
}
