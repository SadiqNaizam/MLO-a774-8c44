import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom component
import Footer from '@/components/layout/Footer'; // Custom component
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard } from 'lucide-react';

const GenericContentPage: React.FC = () => {
  console.log('GenericContentPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section aria-labelledby="generic-content-title">
          <Card className="w-full max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <LayoutDashboard className="h-6 w-6 text-blue-600" />
                <CardTitle id="generic-content-title" className="text-2xl font-semibold">
                  Welcome to Your Application!
                </CardTitle>
              </div>
              <CardDescription>
                This is your main content area after a successful login or registration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                You have successfully accessed the application. This page serves as a placeholder
                for your main dashboard, user profile, or any other content you wish to display.
              </p>
              <p className="text-gray-700 mb-6">
                From here, you would typically interact with the application's features.
                For now, you can explore the placeholder links in the footer or choose to log out.
              </p>
              <div className="mt-6 flex justify-end">
                <Link to="/"> {/* Navigate to LoginPage as defined in App.tsx for root path */}
                  <Button variant="outline">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GenericContentPage;