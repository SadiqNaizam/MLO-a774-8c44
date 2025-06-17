import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // Used by FormLabel internally, but explicitly available
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldCheck, ShieldX } from 'lucide-react';

const passwordResetConfirmSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Show error on the confirmPassword field
});

type PasswordResetConfirmFormValues = z.infer<typeof passwordResetConfirmSchema>;

const PasswordResetConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const token = searchParams.get('token');

  console.log('PasswordResetConfirmPage loaded');

  useEffect(() => {
    if (!token) {
      setTokenError("No reset token found. Please request a new password reset link.");
      toast.error("Invalid or missing password reset token.");
    } else {
      // Here you might want to validate the token with a backend API
      console.log("Password reset token found:", token);
    }
  }, [token]);

  const form = useForm<PasswordResetConfirmFormValues>({
    resolver: zodResolver(passwordResetConfirmSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordResetConfirmFormValues) => {
    if (!token) {
      toast.error("Cannot reset password without a valid token.");
      return;
    }
    setIsLoading(true);
    console.log("Password reset confirmation data:", data, "Token:", token);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Example: Simulate success or failure
    const isSuccess = Math.random() > 0.2; // 80% success rate for demo

    if (isSuccess) {
      toast.success("Password successfully updated!", {
        description: "You can now log in with your new password.",
        icon: <ShieldCheck className="h-5 w-5 text-green-500" />,
      });
      form.reset();
      setTimeout(() => {
        navigate('/'); // Navigate to login page (path "/" from App.tsx)
      }, 2000);
    } else {
      toast.error("Failed to update password.", {
        description: "Please try again or request a new reset link if the problem persists.",
        icon: <ShieldX className="h-5 w-5 text-red-500" />,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">Set New Password</CardTitle>
            <CardDescription>
              {tokenError 
                ? "Please check your reset link or request a new one." 
                : "Enter your new password below. Make sure it's strong and memorable."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tokenError && (
              <Alert variant="destructive" className="mb-6">
                <ShieldX className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{tokenError}</AlertDescription>
              </Alert>
            )}
            {!tokenError && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="newPassword">New Password</FormLabel>
                        <FormControl>
                          <Input
                            id="newPassword"
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                        <FormControl>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading || !!tokenError}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Setting Password...
                      </>
                    ) : (
                      "Set New Password"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center text-sm">
            <p>Remembered your password?</p>
            <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
              Back to Login {/* Path "/" from App.tsx */}
            </Link>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordResetConfirmPage;