import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

import RegisterForm from './register-form';

export default async function RegisterPage() {
  // Check if the user is already logged in
  const session = await getServerSession();

  if (session) {
    // If the user is logged in, redirect to the home page
    redirect('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/login" className="text-sm text-blue-500 hover:underline">
            Already have an account? Login
          </Link>
          <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
