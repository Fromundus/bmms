import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import Login from "./pages/Login";
import GuestLayout from "./layouts/GuestLayout";
import { useAuth } from "./store/auth";
import React from "react";
import PrivateRoute from "./components/PrivateRoute";
import SuperadminLayout from "./layouts/SuperadminLayout";
import { DashboardOverview } from "./components/DashboardOverview";
import UserLayout from "./layouts/UserLayout";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import FuelStockPage from "./pages/Admin/FuelStockPage";
import RequestsPage from "./pages/Admin/RequestsPage";
import DriversPage from "./pages/Admin/DriversPage";
import ReportsPage from "./pages/Admin/ReportsPage";
import ActivityLogsPage from "./pages/Admin/ActivityLogsPage";
import SettingsPage from "./pages/Admin/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import AccountsPage from "./pages/Superadmin/AccountsPage";
import AccountPage from "./pages/Superadmin/AccountPage";

const queryClient = new QueryClient();

const App = () => {
  const { token, fetchUser, connection, updateConnection } = useAuth();

  React.useEffect(() => {
    updateConnection(true);

    if (token) {
      fetchUser();
    }
  }, [token]);

  if(!connection){
    return (
      <div>Please connect to the internet.</div>
    )
  }
  
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ficelco-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GuestLayout />}>
              <Route index element={<Login />} />

              {/* <Route path="login" element={<Login />} /> */}
            </Route>

            <Route element={<PrivateRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="fuel-stock" element={<FuelStockPage />} />
                <Route path="requests" element={<RequestsPage />} />
                <Route path="drivers" element={<DriversPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="activity-logs" element={<ActivityLogsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Route>

            <Route element={<PrivateRoute requiredRole="superadmin" />}>
              <Route path="/superadmin" element={<SuperadminLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="fuel-stock" element={<FuelStockPage />} />
                <Route path="requests" element={<RequestsPage />} />
                <Route path="drivers" element={<DriversPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="accounts" element={<AccountsPage />} />
                <Route path="accounts/:id" element={<AccountPage />} />
                <Route path="activity-logs" element={<ActivityLogsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Route>

            {/* email verification */}

            {/* password reset */}

            {/* <Route path="/dashboard" element={<Dashboard /> } /> */}

            <Route path="/test" element={<Test />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
)};

export default App;
