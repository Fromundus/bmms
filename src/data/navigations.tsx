import NavItem from "@/types/NavItem";
import { Archive, Award, Bell, Briefcase, Calendar, CarFront, Coins, CreditCard, Database, DollarSign, Download, FileSignature, Folder, FolderOpen, Fuel, Heart, HelpCircle, Inbox, Logs, Megaphone, Upload, UploadCloud, Zap } from "lucide-react";

import {
  LayoutDashboard,
  Users,
  Home,
  FileText,
  ClipboardCheck,
  UserCheck,
  Building,
  BarChart3,
  Settings,
} from "lucide-react";

export const bhwNavigations = [
  {
    title: "Dashboard",
    url: "/superadmin",
    icon: LayoutDashboard,
    group: "Navigation"
  },
  {
    title: "Fuel Stock",
    url: "fuel-stock",
    icon: Fuel,
    group: "Navigation"
  },
  {
    title: "Requests",
    url: "requests",
    icon: ClipboardCheck,
    group: "Navigation"
  },
  {
    title: "Drivers",
    url: "drivers",
    icon: CarFront,
    group: "Navigation"
  },
  {
    title: "Reports",
    url: "reports",
    icon: Folder,
    group: "Navigation"
  },
  {
    title: "Accounts",
    url: "accounts",
    icon: Users,
    group: "Navigation"
  },
  {
    title: "Activity Logs",
    url: "activity-logs",
    icon: FileText,
    group: "Navigation"
  },
]

export const adminNavigations = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
    group: "Navigation"
  },
  {
    title: "Patient Directory",
    url: "patients",
    icon: Users,
    group: "Navigation"
  },
  {
    title: "Health Workers",
    url: "health-workers",
    icon: Heart,
    group: "Navigation"
  },
  {
    title: "System Settings",
    url: "settings",
    icon: Settings,
    group: "Navigation"
  },
]