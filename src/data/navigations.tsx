import NavItem from "@/types/NavItem";
import { Archive, Award, Bell, BookOpen, Briefcase, Calendar, CarFront, Coins, CreditCard, Database, DollarSign, Download, FileSignature, Folder, FolderOpen, Fuel, Heart, HelpCircle, Inbox, Logs, Megaphone, MessageCircle, Upload, UploadCloud, Zap } from "lucide-react";

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

export const bnsNavigations = [
  {
    title: "Dashboard",
    url: "/bns",
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
    title: "Nutritional Guide",
    url: "nutritional-guide",
    icon: BookOpen,
    group: "Navigation"
  },
  {
    title: "Notifications",
    url: "notifications",
    icon: Bell,
    group: "Navigation",
  },
  {
    title: "Schedule",
    url: "schedule",
    icon: MessageCircle,
    group: "Navigation"
  }
]

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
  {
    title: "Nutrition Scholars",
    url: "nutrition-scholars",
    icon: Heart,
    group: "Navigation"
  },
  // {
  //   title: "Reports",
  //   url: "reports",
  //   icon: FileText,
  //   group: "Navigation"
  // },
  {
    title: "Nutritional Guide",
    url: "nutritional-guide",
    icon: BookOpen,
    group: "Navigation"
  },
  {
    title: "Notifications",
    url: "notifications",
    icon: Bell,
    group: "Navigation",
  },
  {
    title: "Schedule",
    url: "schedule",
    icon: MessageCircle,
    group: "Navigation"
  }
]

export const adminNavigations = [
  {
    title: "Accounts",
    url: "/admin",
    icon: Users,
    group: "Navigation"
  },
  {
    title: "Logs",
    url: "logs",
    icon: ClipboardCheck,
    group: "Navigation"
  },
  {
    title: "Notifications",
    url: "notifications",
    icon: Bell,
    group: "Navigation",
  }
];