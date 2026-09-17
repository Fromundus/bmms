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

export const navigations = [
  {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      group: "Navigation",
      permission: "dashboard.view",
  },
  {
      title: "Resident Directory",
      url: "patients",
      icon: Users,
      group: "Navigation",
      permission: "residents.view",
  },
  {
      title: "Reports and Summaries",
      url: "reports-and-solutions",
      icon: ClipboardCheck,
      group: "Navigation",
      permission: "reports.view",
  },
  {
      title: "Accounts",
      url: "accounts",
      icon: Users,
      group: "Navigation",
      permission: "users.view",
  },
  {
      title: "Logs",
      url: "logs",
      icon: ClipboardCheck,
      group: "Navigation",
      permission: "logs.view",
  },
  {
      title: "Nutritional Guide",
      url: "nutritional-guide",
      icon: BookOpen,
      group: "Navigation",
      permission: "guide.view",
  },
  {
      title: "Notifications",
      url: "notifications",
      icon: Bell,
      group: "Navigation",
      permission: "notifications.view",
  },
  {
      title: "Schedule",
      url: "schedule",
      icon: MessageCircle,
      group: "Navigation",
      permission: "schedule.view",
  },
];

export const bnsNavigations = [
  {
    title: "Dashboard",
    url: "/bns",
    icon: LayoutDashboard,
    group: "Navigation"
  },
  {
    title: "Resident Directory",
    url: "patients",
    icon: Users,
    group: "Navigation"
  },
  // {
  //   title: "Reports and Summaries",
  //   url: "reports-and-solutions",
  //   icon: ClipboardCheck,
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

export const bhwNavigations = [
  {
    title: "Dashboard",
    url: "/bhw",
    icon: LayoutDashboard,
    group: "Navigation"
  },
  {
    title: "Resident Directory",
    url: "patients",
    icon: Users,
    group: "Navigation"
  },
  // {
  //   title: "Reports and Summaries",
  //   url: "reports-and-solutions",
  //   icon: ClipboardCheck,
  //   group: "Navigation"
  // },
  {
    title: "Nutrition Scholars",
    url: "nutrition-scholars",
    icon: Heart,
    group: "Navigation"
  },
  // {
  //   title: "Reports and Summaries",
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
    title: "Resident Directory",
    url: "/admin",
    icon: Users,
    group: "Navigation"
  },
  {
    title: "Reports and Summaries",
    url: "reports-and-solutions",
    icon: ClipboardCheck,
    group: "Navigation"
  },
  {
    title: "Accounts",
    url: "accounts",
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