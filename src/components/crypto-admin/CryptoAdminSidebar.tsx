import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Shield, 
  Activity, 
  FileText, 
  BarChart3,
  Settings,
  Key
} from 'lucide-react';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/crypto-admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Key Management',
    url: '/crypto-admin/keys',
    icon: Key,
  },
  {
    title: 'Transactions',
    url: '/crypto-admin/transactions',
    icon: Activity,
  },
  {
    title: 'Verification Logs',
    url: '/crypto-admin/logs',
    icon: FileText,
  },
  {
    title: 'Analytics',
    url: '/crypto-admin/analytics',
    icon: BarChart3,
  },
  {
    title: 'Security',
    url: '/crypto-admin/security',
    icon: Shield,
  },
  {
    title: 'Settings',
    url: '/crypto-admin/settings',
    icon: Settings,
  },
];

export const CryptoAdminSidebar: React.FC = () => {
  const { state } = useSidebar();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/crypto-admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={collapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold text-primary">
            {!collapsed && 'SecureCipher'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const active = isActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                          active
                            ? 'bg-primary text-primary-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};