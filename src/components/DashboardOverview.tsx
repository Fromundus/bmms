import { 
  CreditCard, 
  Gavel,
  TrendingUp,
  TrendingDown,
  Zap,
  DollarSign,
  Newspaper,
  Fuel,
  Clock,
  CarFront,
  ClipboardCheck,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminPageMain from "./custom/AdminPageMain";
import { Users, Activity, AlertTriangle, FileText, Heart, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api/axios";
import { useAuth } from "@/store/auth";

  // const stats = {
  //   totalResidents: 1248,
  //   at_risk: 45,
  //   moderate: 12,
  //   severe: 8,
  //   healthy: 1183,
  // };

  const quickActionsBhw = [
    { title: "View Reports", icon: FileText, href: "reports", description: "Latest statistics" },
    { title: "Nutritional Guidance", icon: Activity, href: "nutritional-guide", description: "Health tips" },
    { title: "System Settings", icon: Settings, href: "settings", description: "Configure system" },
  ];

  const quickActions = [
    { title: "Register Health Worker", icon: Heart, href: "health-workers", description: "Add new BHW" },
    { title: "View Reports", icon: FileText, href: "reports", description: "Latest statistics" },
    { title: "Nutritional Guidance", icon: Activity, href: "nutritional-guide", description: "Health tips" },
    { title: "System Settings", icon: Settings, href: "settings", description: "Configure system" },
  ];

type Stats = {
  total_patients: number;
  severe: {
    count: number;
    percent: string;
  };
  moderate: {
    count: number;
    percent: string;
  };
  at_risk: {
    count: number;
    percent: string;
  };
  healthy: {
    count: number;
    percent: string;
  };
}

export function DashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({
      total_patients: 0,
      severe: {
        count: 0,
        percent: "",
      },
      moderate: {
        count: 0,
        percent: "",
      },
      at_risk: {
        count: 0,
        percent: "",
      },
      healthy: {
        count: 0,
        percent: "",
      },
  });

  const fetchStats = async () => {
    try {
      const res = await api.get(`/getStats`);
      setStats(res.data);
      console.log(res);
    } catch (err){
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminPageMain title="Dashboard Overview" description="Monitor patients">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bmms-card border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.total_patients}</div>
            <p className="text-xs text-muted-foreground">Healthy</p>
          </CardContent>
        </Card>

        <Card className="bmms-card border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats?.at_risk?.count}</div>
            <p className="text-xs text-muted-foreground">Requires monitoring</p>
          </CardContent>
        </Card>

        <Card className="bmms-card border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moderate Cases</CardTitle>
            <Activity className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats?.moderate?.count}</div>
            <p className="text-xs text-muted-foreground">Needs intervention</p>
          </CardContent>
        </Card>

        <Card className="bmms-card border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Severe Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.severe?.count}</div>
            <p className="text-xs text-muted-foreground">Urgent attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Malnutrition Overview */}
      <Card className="bmms-card">
        {/* <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Malnutrition Overview
          </CardTitle>
        </CardHeader> */}
        <CardContent className="pt-6">
          {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats?.healthy}</div>
              <div className="text-sm text-green-700">Healthy</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{stats?.at_risk}</div>
              <div className="text-sm text-yellow-700">At Risk</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{stats?.moderate}</div>
              <div className="text-sm text-orange-700">Moderate</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats?.severe}</div>
              <div className="text-sm text-red-700">Severe</div>
            </div>
          </div> */}
          <div className="flex gap-4">
            <Button asChild>
              <Link to="patients">View All Patients</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="patients/add">Add New Patient</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bmms-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          {user.role === "admin" && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                asChild
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Link to={action.href}>
                  <action.icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs opacity-70">{action.description}</div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>}

          {user.role === "bhw" && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActionsBhw.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                asChild
                className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Link to={action.href}>
                  <action.icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs opacity-70">{action.description}</div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>}
        </CardContent>
      </Card>
    </AdminPageMain>
  );
}