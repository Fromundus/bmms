import NavItem from "@/types/NavItem";
import { Archive, Award, Bell, BookOpen, Briefcase, Calendar, CarFront, Coins, CreditCard, Database, DollarSign, Download, FileSignature, Folder, FolderOpen, Fuel, Heart, HelpCircle, Inbox, Logs, Megaphone, Upload, UploadCloud, Zap } from "lucide-react";

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
    url: "/bhw",
    icon: LayoutDashboard,
    group: "Navigation"
  },
  {
    title: "Patient Directory",
    url: "patients",
    icon: Users,
    group: "Navigation"
  },
  // {
  //   title: "Health Workers",
  //   url: "health-workers",
  //   icon: Heart,
  //   group: "Navigation"
  // },
  {
    title: "Reports",
    url: "reports",
    icon: FileText,
    group: "Navigation"
  },
  {
    title: "Nutritional Guide",
    url: "nutritional-guide",
    icon: BookOpen,
    group: "Navigation"
  },
  {
    title: "System Settings",
    url: "settings",
    icon: Settings,
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
    title: "Reports",
    url: "reports",
    icon: FileText,
    group: "Navigation"
  },
  {
    title: "Nutritional Guide",
    url: "nutritional-guide",
    icon: BookOpen,
    group: "Navigation"
  },
  {
    title: "System Settings",
    url: "settings",
    icon: Settings,
    group: "Navigation"
  },
]