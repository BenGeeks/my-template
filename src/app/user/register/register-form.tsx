'use client'; // Marks this component as client-side

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createNewUser } from '@/db/user'; // Import the server-side function

// Define form validation schema using zod
const formSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters.'),
    verifyPassword: z.string(),
  })
  .refine((data) => data.password === data.verifyPassword, {
    message: "Passwords don't match",
    path: ['verifyPassword'], // Field to set error on
  });

const RegisterForm = () => {
  // React Hook Form with Zod validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      verifyPassword: '',
    },
  });

  const [error, setError] = useState<string | null>(null);

  // Function to handle the form submission
  const handleSubmit = async (data: { name: string; email: string; password: string }) => {
    try {
      await createNewUser(data); // Call the server-side function
      setError(null); // Clear errors on success
      window.location.href = '/dashboard'; // Redirect to dashboard after successful registration
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    }
  };

  // Function to handle social login (Google, GitHub)
  const handleSocialLogin = (provider: string) => {
    signIn(provider);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
        <FormField
          control={form.control}
          name="verifyPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verify Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit" className="w-full" variant="outline">
          Register
        </Button>
      </form>

      <hr className="my-4" />

      <div className="flex justify-between">
        <Button onClick={() => handleSocialLogin('google')} variant="outline">
          Register with Google
        </Button>
        <Button onClick={() => handleSocialLogin('github')} variant="outline">
          Register with GitHub
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
