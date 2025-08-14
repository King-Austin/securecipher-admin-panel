import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CryptoAdmin from "./pages/CryptoAdmin";
import Dashboard from "./components/crypto-admin/Dashboard";
import KeyManagement from "./components/crypto-admin/KeyManagement";
import TransactionsPage from "./components/crypto-admin/TransactionsPage";
import AnalyticsPage from "./components/crypto-admin/AnalyticsPage";
import SecurityPage from "./components/crypto-admin/SecurityPage";
import SettingsPage from "./components/crypto-admin/SettingsPage";
import LogsPage from "./components/crypto-admin/LogsPage";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/crypto-admin" element={<CryptoAdmin />}>
              <Route index element={<Dashboard />} />
              <Route path="keys" element={<KeyManagement />} />
              <Route path="transactions" element={<TransactionsPage />} />
              <Route path="logs" element={<LogsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="security" element={<SecurityPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
