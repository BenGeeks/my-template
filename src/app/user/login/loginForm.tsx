'use client'; // Marks this component as client-side

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Define form validation schema using zod
const formSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

const LoginForm = () => {
  // React Hook Form with Zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // State to track errors
  const [error, setError] = useState<string | null>(null);

  // Function to handle credentials login
  const handleSubmit = async (data: { email: string; password: string }) => {
    const res = await signIn('credentials', {
      redirect: false, // Prevent automatic redirect so we can handle errors
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setError(res.error); // Set the error if signIn fails
    } else {
      setError(null); // Clear errors on success
      window.location.href = '/dashboard'; // Redirect to dashboard after successful login
    }
  };

  // Function to handle social login (Google, GitHub)
  const handleSocialLogin = (provider: string) => {
    signIn(provider);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* Email Input Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="yourname@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Password Input Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" className="w-full" variant="outline">
          Login with Credentials
        </Button>
      </form>

      <hr className="my-4" />

      {/* Social Login Buttons */}
      <div className="flex justify-around">
        <Button onClick={() => handleSocialLogin('google')} variant="outline">
          Login with Google
        </Button>
        <Button onClick={() => handleSocialLogin('github')} variant="outline">
          Login with GitHub
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
