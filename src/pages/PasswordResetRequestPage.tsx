import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Mail, CheckCircle, ShieldAlert } from 'lucide-react'; // Icons

// Define the form schema using Zod
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type FormValues = z.infer<typeof formSchema>;

// Alert state type
interface AlertState {
  type: 'success' | 'error';
  message: string;
}

const PasswordResetRequestPage: React.FC = () => {
  console.log('PasswordResetRequestPage loaded');
  const navigate = useNavigate();
  const [alertState, setAlertState] = useState<AlertState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setAlertState(null);
    console.log('Password reset requested for:', values.email);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For this example, we'll always show a success message.
    // In a real app, you'd handle API responses for existing/non-existing emails.
    // It's common practice not to reveal if an email is registered for security reasons.
    setAlertState({
      type: 'success',
      message: "If an account with that email exists, we've sent instructions to reset your password. Please check your inbox (and spam folder).",
    });
    form.reset(); // Clear the form
    setIsSubmitting(false);

    // Optionally, redirect after a delay or keep the user on the page
    // setTimeout(() => navigate('/'), 5000); // Redirect to login after 5s
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <Mail className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <CardTitle className="text-2xl font-bold">Forgot Your Password?</CardTitle>
            <CardDescription>
              No problem! Enter your email address below, and we'll send you a link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {alertState && (
              <Alert variant={alertState.type === 'error' ? 'destructive' : 'default'} className="mb-4">
                {alertState.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
                <AlertTitle>{alertState.type === 'success' ? 'Request Sent' : 'Error'}</AlertTitle>
                <AlertDescription>{alertState.message}</AlertDescription>
              </Alert>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4 pt-6">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/registration" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordResetRequestPage;