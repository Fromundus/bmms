import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  AlertTriangle,
  Bell,
  Settings, 
  User
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/store/auth";
import api from "@/api/axios";
import { format } from "date-fns";

const pageNames: Record<string, string> = {
  "/": "Dashboard Overview",
  "/households": "Household & Purok Management", 
  "/blotter": "Blotter & Complaints",
  "/permits": "Permit & Document Issuance",
  "/officials": "Officials & Staff",
  "/businesses": "Business Registry",
  "/reports": "Reports & Analytics",
  
  "/superadmin": "Dashboard Overview",
  
  "/superadmin/members": "Member Management",
  "/superadmin/accounts": "Account Management",
  "superadmin/accounts/": "Account Management",
  "/superadmin/logs": "Activity Logs",

  "/superadmin/monthly-rates": "Monthly Rates",
};

export default function Dashboard() {
  function useCurrentPageName() {
    const location = useLocation();
    const pathname = location.pathname;

    // Sort keys by length (longest first) so specific routes match before generic
    const match = Object.keys(pageNames)
      .sort((a, b) => b.length - a.length)
      .find((route) => pathname.startsWith(route));

    return match ? pageNames[match] : "Dashboard";
  }
  
  // usage
  const currentPageName = useCurrentPageName();

  // const currentPageName = pageNames[location.pathname] || "Dashboard";

  const { logout, user } = useAuth();

  const navigate = useNavigate();
  
  const userName = user?.name?.split("").slice(0, 2).join("").toUpperCase();

  const [notifications, setNotifications] = React.useState([]);

  const fetchNotif = async () => {
    try {
      const res = await api.get('/notifications');
      console.log(res);
      setNotifications(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchNotif();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await logout();
      navigate('/');
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  const renderNotifs = notifications?.map((item) => {
    const data = JSON.parse(item.data);

    return (
      <div key={item.id}>
        {item.title === "Summary" && <div className="bg-accent rounded p-2 text-sm" >
          <div className="flex flex-col gap-2 p-2">
            <span className="font-semibold">{item.title}</span>
            <p><span className="text-red-500">{data.severe} Severe</span>, <span className="text-orange-500">{data.moderate} Moderate</span>, <span className="text-yellow-500">{data.at_risk} At Risk</span>, <span className="text-green-500">{data.healthy} Healthy</span> (out of {data.total} total).</p>
            <span>{format(new Date(item.created_at), 'p')}</span>
          </div>
        </div>}

        {item.title === "Warning" && <div className="bg-destructive rounded p-2 text-sm" >
          <div className="flex flex-col gap-2 p-2">
            <span className="font-semibold">{item.title}</span>
            <p><span className="flex items-center gap-2"><AlertTriangle /> Alert:</span><span>{data.severe}</span> patients are currently in Severe condition. Immediate attention required.</p>
            <span>{format(new Date(item.created_at), 'p')}</span>
          </div>
        </div>}
      </div>
    )
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navigation */}
          <header className="h-16 border-b bg-card px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  {/* {currentPageName} */}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="p-2 rounded hover:bg-accent relative">
                    <Bell className="size-[22px]" />
                    {notifications?.length > 0 && <div className="size-2 bg-red-500 absolute rounded-full top-1 right-1"></div>}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-full flex-col space-y-2">
                  {notifications?.length > 0 ? renderNotifs : <div className="p-6 text-center">No notifications.</div>}
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" />
                      <AvatarFallback className="bg-background border border-border text-foreground">{userName}</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <div className="text-sm font-medium">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator /> */}
                  {/* <DropdownMenuItem onClick={() => navigate(`/${user.role}/profile`)}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuItem onClick={() => navigate(`/${user.role}/settings`)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}