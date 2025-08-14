import React from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { CryptoAdminSidebar } from './CryptoAdminSidebar';
import { CryptoAdminHeader } from './CryptoAdminHeader';

const DashboardLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <CryptoAdminSidebar />
        <div className="flex-1 flex flex-col">
          <CryptoAdminHeader />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;