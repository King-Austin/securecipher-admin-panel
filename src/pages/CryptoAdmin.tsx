import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/crypto-admin/LoginForm';
import DashboardLayout from '@/components/crypto-admin/DashboardLayout';

const CryptoAdmin: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <DashboardLayout />;
};

export default CryptoAdmin;