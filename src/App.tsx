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
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";
import AdminLayout from "./layouts/AdminLayout";
import ProfilePage from "./pages/ProfilePage";
import AccountsPage from "./pages/Superadmin/AccountsPage";
import AccountPage from "./pages/Superadmin/AccountPage";
import Register from "./pages/Register";
import BHWLayout from "./layouts/BHWLayout";
import PatientsPage from "./pages/Admin/PatientsPage";
import SettingsPage from "./pages/Admin/SettingsPage";
import PatientsAddPage from "./pages/Admin/PatientsAddPage";
import PatientPage from "./pages/Admin/PatientPage";
import PatientsEditPage from "./pages/Admin/PatientsEditPage";
import NutritionalGuidancePage from "./pages/Admin/NutritionalGuidancePage";
import ReportsPage from "./pages/Admin/ReportsPage";

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
              <Route path='/register' element={<Register />} />

              {/* <Route path="login" element={<Login />} /> */}
            </Route>

            <Route element={<PrivateRoute requiredRole="bhw" />}>
              <Route path="/bhw" element={<BHWLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="patients" element={<PatientsPage />} />
                <Route path="patients/:id" element={<PatientPage />} />
                <Route path="patients/add" element={<PatientsAddPage />} />
                <Route path="patients/edit/:id" element={<PatientsEditPage />} />
                {/* <Route path="health-workers" element={<AccountsPage />} /> */}
                <Route path="nutritional-guide" element={<NutritionalGuidancePage />} />
                <Route path="accounts/:id" element={<AccountPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Route>

            <Route element={<PrivateRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="patients" element={<PatientsPage />} />
                <Route path="patients/:id" element={<PatientPage />} />
                <Route path="patients/add" element={<PatientsAddPage />} />
                <Route path="patients/edit/:id" element={<PatientsEditPage />} />
                <Route path="health-workers" element={<AccountsPage />} />
                <Route path="nutritional-guide" element={<NutritionalGuidancePage />} />
                <Route path="accounts/:id" element={<AccountPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
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
