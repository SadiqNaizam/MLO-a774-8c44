import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import Header from '@/components/layout/Header'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component
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
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password cannot be empty." }),
  rememberMe: z.boolean().default(false).optional(),
});

type LoginFormValues = z.infer<typeof formSchema>;

const LoginPage: React.FC = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log('LoginPage loaded');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login form submitted:', data);
    setLoginError(null); // Clear previous errors

    // Simulate API call for login
    // In a real app, you would call your auth API here
    if (data.email === "user@example.com" && data.password === "password") {
      console.log("Login successful");
      // On successful login, navigate to a protected page, e.g., /generic-content
      navigate('/generic-content'); // Path from App.tsx
    } else {
      console.log("Login failed");
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Login to Your Account</CardTitle>
            <CardDescription>Enter your credentials below to access the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {loginError && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            )}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
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
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal">
                          Remember me
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-3 pt-6">
            <div className="text-sm">
              <Link to="/password-reset-request" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Forgot your password?
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link to="/registration" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;